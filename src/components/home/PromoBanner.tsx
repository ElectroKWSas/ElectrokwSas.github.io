import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_MESSAGES } from "@/config/site";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { assetUrl } from "@/utils/assetUrl";
import { fadeUp } from "@/animations/variants";

export default function PromoBanner() {
  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(168,73,46,0.9), rgba(138,58,34,0.92)), url(${assetUrl(
            "/images/banners/promo-banner.jpg"
          )})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center gap-5 px-6 py-14 text-center sm:px-12">
          <h3 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
            Visita técnica y cotización sin costo
          </h3>
          <p className="max-w-xl text-white/85">
            Cuéntanos qué necesitas y agendamos la visita para evaluar tu caso, sin
            ningún compromiso.
          </p>
          <a
            href={buildWhatsAppUrl(WHATSAPP_MESSAGES.visitaTecnica)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-accent-dark transition hover:bg-white/90"
          >
            <FaWhatsapp size={18} />
            Agendar visita técnica
          </a>
        </div>
      </motion.div>
    </section>
  );
}
