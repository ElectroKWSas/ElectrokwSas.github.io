import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaWhatsapp } from "react-icons/fa";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
import Toast from "@/components/common/Toast";
import GoogleMap from "@/components/shared/GoogleMap";
import SocialLinks from "@/components/shared/SocialLinks";
import { useToast } from "@/hooks/useToast";
import { submitContactForm } from "@/services/contactService";
import { ENABLED_CATEGORIES } from "@/config/catalog";
import { SITE, WHATSAPP_MESSAGES } from "@/config/site";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { isRequired, isValidEmail, isValidPhone } from "@/utils/validators";
import { slideInLeft, slideInRight } from "@/animations/variants";
import type { ContactFormData } from "@/types/contact";

const INITIAL_FORM: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  serviceType: "otro",
  message: "",
};

const SERVICE_OPTIONS = [
  ...ENABLED_CATEGORIES.map((cat) => ({ value: cat.slug, label: cat.name })),
  { value: "otro", label: "Otro / no estoy seguro" },
];

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toasts, showToast, dismiss } = useToast();

  function update<K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!isRequired(form.firstName)) next.firstName = "Ingresa tu nombre.";
    if (!isRequired(form.lastName)) next.lastName = "Ingresa tu apellido.";
    if (!isValidEmail(form.email)) next.email = "Ingresa un correo válido.";
    if (!isValidPhone(form.phone)) next.phone = "Ingresa un celular colombiano válido.";
    if (!isRequired(form.city)) next.city = "Ingresa tu ciudad o barrio.";
    if (!isRequired(form.message)) next.message = "Cuéntanos brevemente qué necesitas.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await submitContactForm(form);
      showToast("Mensaje enviado correctamente.", "success");
      setForm(INITIAL_FORM);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "No se pudo enviar el mensaje.", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Contacto"
        description="Contáctanos para agendar una visita técnica sin costo o resolver tus dudas sobre nuestros servicios en Cundinamarca."
        canonicalPath="/contacto"
      />
      <Toast toasts={toasts} onDismiss={dismiss} />

      <section className="bg-background-alt dark:bg-background-alt-dark pb-10 pt-32 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Contacto" }]} />
          <h1 className="mt-4 font-heading text-3xl font-bold text-text-primary dark:text-text-primary-dark sm:text-4xl">
            Hablemos de tu proyecto
          </h1>
          <p className="mt-2 max-w-2xl text-text-secondary dark:text-text-secondary-dark">
            Cuéntanos qué necesitas y te contactamos para cotizar o agendar la visita técnica.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <motion.form
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-6 sm:p-8"
            noValidate
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                label="Nombre"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                error={errors.firstName}
                autoComplete="given-name"
                required
              />
              <Input
                label="Apellido"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                error={errors.lastName}
                autoComplete="family-name"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                label="Correo electrónico"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                error={errors.email}
                autoComplete="email"
                required
              />
              <Input
                label="Celular"
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                error={errors.phone}
                placeholder="3XX XXX XXXX"
                autoComplete="tel"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                label="Ciudad / Barrio"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                error={errors.city}
                required
              />
              <Select
                label="Tipo de servicio requerido"
                value={form.serviceType}
                onChange={(e) => update("serviceType", e.target.value as ContactFormData["serviceType"])}
                options={SERVICE_OPTIONS}
              />
            </div>

            <Textarea
              label="Mensaje"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              error={errors.message}
              placeholder="Cuéntanos brevemente qué necesitas..."
              required
            />

            <Button type="submit" size="lg" isLoading={isSubmitting}>
              Enviar mensaje
            </Button>
          </motion.form>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4 rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-6">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-sm text-text-secondary dark:text-text-secondary-dark hover:text-primary">
                <FaEnvelope className="text-primary dark:text-primary-light" size={16} />
                {SITE.email}
              </a>
              <a href={`tel:+${SITE.whatsappNumber}`} className="flex items-center gap-3 text-sm text-text-secondary dark:text-text-secondary-dark hover:text-primary">
                <FaPhoneAlt className="text-primary dark:text-primary-light" size={16} />
                {SITE.phoneDisplay}
              </a>
              <p className="flex items-center gap-3 text-sm text-text-secondary dark:text-text-secondary-dark">
                <FaMapMarkerAlt className="text-primary dark:text-primary-light" size={16} />
                {SITE.coverage}
              </p>
              <div className="flex items-start gap-3 text-sm text-text-secondary dark:text-text-secondary-dark">
                <FaClock className="mt-0.5 shrink-0 text-primary dark:text-primary-light" size={16} />
                <span>
                  {SITE.schedule.map((s) => (
                    <span key={s.days} className="block">
                      {s.days}: {s.hours}
                    </span>
                  ))}
                </span>
              </div>

              <a
                href={buildWhatsAppUrl(WHATSAPP_MESSAGES.contacto)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:bg-[#1DA851]"
              >
                <FaWhatsapp size={18} />
                Escribir por WhatsApp
              </a>

              <div>
                <p className="mb-2 text-sm font-semibold text-text-primary dark:text-text-primary-dark">Síguenos</p>
                <SocialLinks />
              </div>
            </div>

            <GoogleMap className="h-64 overflow-hidden rounded-2xl border border-border dark:border-border-dark" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
