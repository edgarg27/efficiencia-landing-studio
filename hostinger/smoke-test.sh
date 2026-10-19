#!/usr/bin/env bash
# Prueba de humo del webhook PHP (la corre la GitHub Action en cada PR).
# Usa la clave secreta de PRUEBA pública de reCAPTCHA (siempre aprueba) y un n8n simulado
# que guarda lo que recibe, para revisar el flujo completo sin tocar servicios reales.
set -euo pipefail

work=$(mktemp -d)
mkdir -p "$work/site/api" "$work/n8n"
cp hostinger/api/webhook.php "$work/site/api/"

cat > "$work/n8n/index.php" <<'PHP'
<?php
file_put_contents(__DIR__ . '/received.json', file_get_contents('php://input'));
file_put_contents(__DIR__ . '/secret.txt', $_SERVER['HTTP_X_WEBHOOK_SECRET'] ?? '');
echo '{"ok":true}';
PHP

cat > "$work/site/api/_config.php" <<'PHP'
<?php
return [
    'RECAPTCHA_SECRET_KEY' => '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe',
    'N8N_WEBHOOK_URL' => 'http://127.0.0.1:8902/',
    'N8N_WEBHOOK_SECRET' => 'secreto-de-prueba',
    'RECAPTCHA_HOSTNAMES' => '',
];
PHP

php -S 127.0.0.1:8901 -t "$work/site" >/dev/null 2>&1 &
p1=$!
php -S 127.0.0.1:8902 -t "$work/n8n" >/dev/null 2>&1 &
p2=$!
trap 'kill $p1 $p2 2>/dev/null || true' EXIT
sleep 1

url=http://127.0.0.1:8901/api/webhook.php
fail=0
check() { # nombre, código esperado, código obtenido
  if [ "$2" = "$3" ]; then echo "ok   $1 ($3)"; else echo "FAIL $1: esperaba $2, obtuvo $3"; fail=1; fi
}
post() { curl -s -o "$work/out.json" -w '%{http_code}' -X POST -H 'Content-Type: application/json' --data "$1" "$url"; }

check "GET rechazado" 405 "$(curl -s -o /dev/null -w '%{http_code}' "$url")"
check "content-type no JSON" 415 "$(curl -s -o /dev/null -w '%{http_code}' -X POST -d 'a=1' "$url")"
check "JSON inválido" 400 "$(post '{')"
check "campo extra" 400 "$(post '{"type":"individual","name":"Ana","number":"5512345678","email":"ana@example.com","message":"Hola","captchaToken":"x","extra":1}')"
check "empresa sin nombre de empresa" 400 "$(post '{"type":"company","name":"Ana","number":"5512345678","email":"ana@example.com","message":"Hola","captchaToken":"x"}')"
check "persona con empresa" 400 "$(post '{"type":"individual","name":"Ana","number":"5512345678","email":"ana@example.com","company":"X","message":"Hola","captchaToken":"x"}')"
check "teléfono corto" 400 "$(post '{"type":"individual","name":"Ana","number":"55123","email":"ana@example.com","message":"Hola","captchaToken":"x"}')"
check "plan desconocido" 400 "$(post '{"type":"individual","name":"Ana","number":"5512345678","email":"ana@example.com","message":"Hola","captchaToken":"x","plan":"oro"}')"
check "plan no texto" 400 "$(post '{"type":"individual","name":"Ana","number":"5512345678","email":"ana@example.com","message":"Hola","captchaToken":"x","plan":["agenda"]}')"

check "envío válido" 200 "$(post '{"type":"company","name":" Ana ","number":"5512345678","email":"ana@example.com","company":"Spa Luna","message":"Quiero el bot","captchaToken":"token","plan":"agenda","billing":"annual"}')"
cat "$work/out.json"; echo
echo "n8n recibió: $(cat "$work/n8n/received.json")"
grep -q '"plan":"Pro — pago anual $24,900 MXN + IVA"' "$work/n8n/received.json" || { echo "FAIL plan traducido"; fail=1; }
grep -q '"name":"Ana"' "$work/n8n/received.json" || { echo "FAIL nombre sin trim"; fail=1; }
grep -q 'captchaToken' "$work/n8n/received.json" && { echo "FAIL captchaToken reenviado"; fail=1; }
[ "$(cat "$work/n8n/secret.txt")" = "secreto-de-prueba" ] || { echo "FAIL cabecera X-Webhook-Secret"; fail=1; }

rm "$work/site/api/_config.php"
check "sin configuración" 503 "$(post '{}')"

exit $fail
