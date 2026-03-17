import { useEffect, useRef, useState, useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, Send, CircleX } from "lucide-react";
// Omití importar ScrollReveal aquí porque no lo estás usando en este archivo,
// pero si lo necesitas para otras partes, puedes dejarlo.
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

const getContactSchema = (t: TFunction) => z.object({
  name: z.string().trim().min(1, t("contactForm.errors.nameRequired")).max(100),
  number: z.string()
    .regex(/^\d+$/, t("contactForm.errors.numberOnly"))
    .length(10, t("contactForm.errors.numberLength")),
  email: z.string().trim().email(t("contactForm.errors.emailInvalid")).max(255),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, t("contactForm.errors.messageRequired")).max(1000),
  captchaToken: z.string().min(1, t("contactForm.errors.captchaRequired")),
});

type ContactFormValues = z.infer<ReturnType<typeof getContactSchema>>;

interface ContactFormProps {
  onSuccess?: () => void;
}

const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 👇 1. NUEVO ESTADO: Controla si mostramos el captcha o no
  const [showCaptcha, setShowCaptcha] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const contactSchema = useMemo(() => getContactSchema(t), [t]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", number: "", email: "", company: "", message: "", captchaToken: "", },
  });

  // Cada vez que cambien los errores, los guardamos y les ponemos timeout
  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      const timer = setTimeout(() => form.clearErrors(), 3000);
      return () => clearTimeout(timer);
    }
  }, [form.formState.errors, form]);

  const handleSubmit = async (data: ContactFormValues) => {
    setLoading(true);

    try {
      const respuesta = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          token: data.captchaToken
        })
      });

      if (!respuesta.ok) {
        setHasError(true);
        return;
      }

      setSubmitted(true);
      onSuccess?.();

      form.reset();
      recaptchaRef.current?.reset();

    } catch (error) {
      setHasError(true);
    }

    setLoading(false);
  };

  // 👇 2. NUEVA FUNCIÓN: Se activa cuando el usuario toca el formulario
  const handleUserInteraction = () => {
    if (!showCaptcha) {
      setShowCaptcha(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{t("contactForm.successTitle")}</h3>
        <p className="text-muted-foreground max-w-sm">
          {t("contactForm.successMessage")}
        </p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <CircleX className="w-8 h-8 text-destructive" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{t("contactForm.errorTitle")}</h3>
        <p className="text-muted-foreground max-w-sm">
          {t("contactForm.errorMessage")}
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      {/* 👇 3. Agregamos eventos onFocus y onClick al formulario para detectar interacción */}
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        onFocus={handleUserInteraction}
        onClick={handleUserInteraction}
        className="mt-4 grid grid-cols-1 gap-2 md:gap-6 md:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contactForm.fields.name.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("contactForm.fields.name.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contactForm.fields.number.label")}</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder={t("contactForm.fields.number.placeholder")}
                  {...field}
                  onChange={(evento) => {
                    let valor = evento.target.value;
                    valor = valor.replace(/\D/g, "");
                    if (valor.length > 10) {
                      valor = valor.slice(0, 10);
                    }
                    field.onChange(valor);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contactForm.fields.email.label")}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t("contactForm.fields.email.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contactForm.fields.company.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("contactForm.fields.company.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>{t("contactForm.fields.message.label")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("contactForm.fields.message.placeholder")}
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 👇 4. RENDERIZADO CONDICIONAL: Solo montamos ReCAPTCHA si showCaptcha es true */}
        <FormField
          control={form.control}
          name="captchaToken"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center my-4 relative z-50 pointer-events-auto isolate md:col-span-2 min-h-[78px]">
              {showCaptcha ? (
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={(token) => {
                    field.onChange(token || "");
                  }}
                />
              ) : (
                // Opcional: Un pequeño placeholder mientras carga
                <div className="text-xs text-muted-foreground/50 border border-dashed border-border rounded p-4 w-[304px] text-center">
                  Haga clic en el formulario para cargar la verificación de seguridad.
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full gap-2 text-base h-12 md:col-span-2" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t("contactForm.buttons.sending")}
            </>
          ) : (
            <>
              {t("contactForm.buttons.submit")}
              <Send className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-2 md:col-span-2">
          {t("contactForm.footerText")}
        </p>
      </form>
    </Form>
  );
};

export default ContactForm;