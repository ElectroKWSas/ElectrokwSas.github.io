import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { SITE, WHATSAPP_MESSAGES } from "@/config/site";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { fadeUp } from "@/animations/variants";

export default function CtaSection() {
  return (
    <section className="bg-primary-dark py-16">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center sm:px-6 lg:px-8"
      >
        <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
          ¿Necesitas una solución hoy mismo?
        </h2>
        <p className="max-w-xl text-white/80">
          Escríbenos por WhatsApp o llámanos directamente. Atendemos de lunes a
          sábado, de 8:00 a.m. a 5:00 p.m., en {SITE.coverage}.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={buildWhatsAppUrl(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white transition hover:bg-[#1DA851]"
          >
            <FaWhatsapp size={18} />
            Escribir por WhatsApp
          </a>
          <a
            href={`tel:+${SITE.whatsappNumber}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-7 py-3.5 font-semibold text-white transition hover:bg-white hover:text-primary-dark"
          >
            <FaPhoneAlt size={15} />
            {SITE.phoneDisplay}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
