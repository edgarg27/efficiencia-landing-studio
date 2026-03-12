import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, Send, CircleX, } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import ScrollReveal from "@/components/ScrollReveal";

import ReCAPTCHA from "react-google-recaptcha";

const contactSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio").max(100),
  number: z.string()
    .regex(/^\d+$/, "Solo se permiten números") // Verifica que solo sean dígitos
    .length(10, "El número debe tener exactamente 10 dígitos"), // Fuerza que sean exactamente 10
  email: z.string().trim().email("Ingresa un correo válido").max(255),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, "El mensaje es obligatorio").max(1000),

  captchaToken: z.string().min(1, "Por favor, verifica que no eres un robot"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
}

const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", number: "", email: "", company: "", message: "", captchaToken: "", },
  });

  // Cada vez que cambien los errores, los guardamos y les ponemos timeout
  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      const timer = setTimeout(() => form.clearErrors(), 3000); // borra todos los errores
      return () => clearTimeout(timer);
    }
  }, [form.formState.errors]);

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
          token: data.captchaToken // <- Agregamos esto para el Backend
        })
      });

      if (!respuesta.ok) {
        setHasError(true);
        return;
      }

      setSubmitted(true);
      onSuccess?.();

    } catch (error) {
      setHasError(true);
    }

    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">¡Gracias!</h3>
        <p className="text-muted-foreground max-w-sm">
          Un experto en IA analizará tu caso y te contactará pronto.
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
        <h3 className="text-xl font-bold text-foreground">!Error de conexión!</h3>
        <p className="text-muted-foreground max-w-sm">
          No pudimos comunicarnos con el servidor. Por favor, intenta de nuevo más tarde.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input placeholder="Juan Pérez" {...field} />
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
              <FormLabel>Numero de telefono</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Tu numero de telefono"
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
              <FormLabel>Correo corporativo</FormLabel>
              <FormControl>
                <Input type="email" placeholder="juan@empresa.com" {...field} />
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
              <FormLabel>Nombre de la empresa</FormLabel>
              <FormControl>
                <Input placeholder="Empresa S.A." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿Qué proceso manual te gustaría automatizar?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe brevemente el proceso que quieres optimizar..."
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="captchaToken"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center my-4 relative z-50 pointer-events-auto isolate">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(token) => {
                  field.onChange(token || "");
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full gap-2 text-base h-12" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              Solicitar asesoría gratuita
              <Send className="w-4 h-4" />
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-2">
          🔒 Tus datos están seguros. Cero spam.
        </p>
      </form>
    </Form>
  );
};

export default ContactForm;
