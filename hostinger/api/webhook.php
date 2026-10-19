<?php
// Versión PHP de api/webhook.js para el hosting compartido de Hostinger (sin Node).
// Hace lo mismo: valida el formulario, verifica reCAPTCHA y reenvía los datos a n8n.
// Mantén el esquema y los precios sincronizados con api/webhook.js y src/lib/plans.ts.
//
// Los secretos viven en _config.php (lo genera la GitHub Action a partir de los
// secretos del repositorio y nunca se sube a git).

declare(strict_types=1);

const PLANES = [
    'responde' => ['monthly' => 'Básico — $1,490 MXN/mes + IVA', 'annual' => 'Básico — pago anual $14,900 MXN + IVA'],
    'agenda' => ['monthly' => 'Pro — $2,490 MXN/mes + IVA', 'annual' => 'Pro — pago anual $24,900 MXN + IVA'],
    'vende' => ['monthly' => 'VIP — $3,990 MXN/mes + IVA', 'annual' => 'VIP — pago anual $39,900 MXN + IVA'],
];

// Logs estructurados y sin datos personales (solo nombres de campo / códigos).
function log_event(string $event, array $data = []): void
{
    error_log(json_encode(['event' => $event] + $data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

// POST con cuerpo URL-encoded o JSON y timeout. Devuelve [código HTTP, cuerpo] o null si falla la conexión.
function http_post(string $url, string $body, array $headers, int $timeout): ?array
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => $timeout,
        CURLOPT_CONNECTTIMEOUT => $timeout,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_PROTOCOLS => CURLPROTO_HTTPS | CURLPROTO_HTTP,
    ]);
    $res = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $err = curl_errno($ch);
    curl_close($ch);
    if ($res === false) {
        log_event($err === CURLE_OPERATION_TIMEDOUT ? 'upstream_timeout' : 'upstream_error', ['curl' => $err]);
        return null;
    }
    return [$code, (string) $res];
}

// Cadena con trim y longitud (en caracteres) dentro de [min, max]; null si no cumple.
function str_field($v, int $min, int $max): ?string
{
    if (!is_string($v)) return null;
    $v = trim($v);
    $len = mb_strlen($v, 'UTF-8');
    return ($len >= $min && $len <= $max) ? $v : null;
}

/**
 * Espejo del esquema Zod de api/webhook.js (.strict() + superRefine).
 * Devuelve [datos limpios, campos inválidos].
 */
function validate($in): array
{
    if (!is_array($in) || ($in !== [] && array_is_list($in))) return [null, ['body']];
    $allowed = ['type', 'name', 'number', 'email', 'company', 'project', 'message', 'captchaToken', 'plan', 'billing'];
    $bad = array_values(array_diff(array_keys($in), $allowed));
    $out = [];
    // Campo de texto: lo guarda limpio o lo marca como inválido.
    $text = function (string $k, int $min, int $max) use ($in, &$out, &$bad): void {
        $v = str_field($in[$k] ?? null, $min, $max);
        if ($v === null) $bad[] = $k;
        else $out[$k] = $v;
    };

    $type = $in['type'] ?? null;
    if (in_array($type, ['company', 'individual'], true)) $out['type'] = $type;
    else $bad[] = 'type';

    $text('name', 1, 100);

    $num = $in['number'] ?? null;
    if (is_string($num) && preg_match('/^\d{10}$/', $num)) $out['number'] = $num;
    else $bad[] = 'number';

    $email = str_field($in['email'] ?? null, 1, 255);
    if ($email !== null && filter_var($email, FILTER_VALIDATE_EMAIL)) $out['email'] = $email;
    else $bad[] = 'email';

    if (array_key_exists('company', $in)) $text('company', 1, 100);
    if (array_key_exists('project', $in)) $text('project', 0, 150);
    $text('message', 1, 1000);

    $tok = $in['captchaToken'] ?? null;
    if (is_string($tok) && $tok !== '' && strlen($tok) <= 4096) $out['captchaToken'] = $tok;
    else $bad[] = 'captchaToken';

    if (array_key_exists('plan', $in)) {
        if (is_string($in['plan']) && isset(PLANES[$in['plan']])) $out['plan'] = $in['plan'];
        else $bad[] = 'plan';
    }
    if (array_key_exists('billing', $in)) {
        if (in_array($in['billing'], ['monthly', 'annual'], true)) $out['billing'] = $in['billing'];
        else $bad[] = 'billing';
    }

    if ($type === 'company') {
        // Empresa: correo corporativo y nombre de la empresa obligatorios.
        if (empty($out['company'])) $bad[] = 'company';
        if (array_key_exists('project', $in)) $bad[] = 'project';
    } else {
        // Personal: correo y, opcional, el título del proyecto (sin nombre de empresa).
        if (array_key_exists('company', $in)) $bad[] = 'company';
    }

    $bad = array_values(array_unique($bad));
    return [$bad ? null : $out, $bad];
}

// --- Petición ---

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

// 1. Por seguridad, solo permitimos envíos POST con JSON.
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['error' => 'Método no permitido']);
}
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
    respond(415, ['error' => 'Tipo de contenido no soportado']);
}
$raw = file_get_contents('php://input', false, null, 0, 16385);
if ($raw === false || strlen($raw) > 16384) {
    respond(413, ['error' => 'Cuerpo demasiado grande']);
}

$cfgFile = __DIR__ . '/_config.php';
$cfg = is_file($cfgFile) ? require $cfgFile : [];
$get = static function (string $k) use ($cfg): string {
    $v = $cfg[$k] ?? getenv($k);
    return is_string($v) ? trim($v) : '';
};
$secret = $get('RECAPTCHA_SECRET_KEY');
$n8nUrl = $get('N8N_WEBHOOK_URL');
$n8nSecret = $get('N8N_WEBHOOK_SECRET');
$hostsCfg = $get('RECAPTCHA_HOSTNAMES');
if ($secret === '' || $n8nUrl === '') {
    log_event('config_missing', ['recaptcha' => $secret !== '', 'n8nUrl' => $n8nUrl !== '']);
    respond(503, ['error' => 'Servicio no disponible']);
}

// 2. Validamos la forma completa del body ANTES de tocar reCAPTCHA o n8n.
[$data, $bad] = validate(json_decode($raw, true));
if ($data === null) {
    log_event('validation_failed', ['fields' => $bad]);
    respond(400, ['message' => 'Datos inválidos.']);
}

$token = $data['captchaToken'];
$plan = $data['plan'] ?? null;
$billing = $data['billing'] ?? 'monthly';
unset($data['captchaToken'], $data['plan'], $data['billing']);
if ($plan !== null) $data['plan'] = PLANES[$plan][$billing];

// 3. Verificación con Google: cuerpo URL-encoded (el secreto no va en la URL).
$google = http_post(
    'https://www.google.com/recaptcha/api/siteverify',
    http_build_query(['secret' => $secret, 'response' => $token]),
    ['Content-Type: application/x-www-form-urlencoded'],
    5
);
if ($google === null) respond(504, ['error' => 'Tiempo de espera agotado']);
$verdict = json_decode($google[1], true) ?: [];

// Opcional: RECAPTCHA_HOSTNAMES="efficiencia.cloud,www.efficiencia.cloud" exige que
// el token se haya resuelto en tu dominio.
$hosts = $hostsCfg !== '' ? array_map('trim', explode(',', $hostsCfg)) : null;
$hostOk = $hosts === null || in_array($verdict['hostname'] ?? '', $hosts, true);

// 4. El veredicto de Google
if (($verdict['success'] ?? false) !== true || !$hostOk) {
    $codes = $verdict['error-codes'] ?? [];
    $configError = in_array('invalid-input-secret', $codes, true) || in_array('missing-input-secret', $codes, true);
    log_event($configError ? 'captcha_config_error' : 'captcha_failed', ['codes' => $codes, 'hostOk' => $hostOk]);
    respond(400, ['message' => 'No pasaste la prueba de reCAPTCHA. ¿Eres un robot?']);
}

// 5. El servidor llama a n8n de forma invisible para el usuario. Si N8N_WEBHOOK_SECRET
// está definido, se envía como cabecera (configura Header Auth en el nodo Webhook).
$headers = ['Content-Type: application/json'];
if ($n8nSecret !== '') $headers[] = 'X-Webhook-Secret: ' . $n8nSecret;
$n8n = http_post($n8nUrl, json_encode($data, JSON_UNESCAPED_UNICODE), $headers, 8);
if ($n8n === null) respond(504, ['error' => 'Tiempo de espera agotado']);
if ($n8n[0] < 200 || $n8n[0] >= 300) {
    log_event('n8n_forward_failed', ['status' => $n8n[0]]);
    respond(502, ['error' => 'Error al comunicarse con n8n']);
}

respond(200, ['exito' => true]);
