import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { SITE, WHATSAPP_MESSAGES } from "@/config/site";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { assetUrl } from "@/utils/assetUrl";
import { fadeUp, slideInLeft } from "@/animations/variants";
import HeroServiceCarousel from "@/components/home/HeroServiceCarousel";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden pb-20 pt-32 sm:pt-40"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(4,28,92,0.92) 0%, rgba(12,60,156,0.85) 55%, rgba(4,28,92,0.95) 100%), url(${assetUrl(
          "/images/hero/hero-bg.jpg"
        )})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div variants={slideInLeft} initial="hidden" animate="visible" className="flex flex-col gap-6 text-center lg:text-left">
          <motion.span variants={fadeUp} className="eyebrow mx-auto text-sm text-accent-light lg:mx-0">
            {SITE.slogan}
          </motion.span>
          <motion.h1 variants={fadeUp} className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Una solución para cada ocasión
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto max-w-xl text-lg text-white/80 lg:mx-0">
            Instalaciones y mantenimiento eléctrico, acueducto, cámaras de seguridad y
            cableado estructurado para hogares, conjuntos residenciales y empresas en{" "}
            {SITE.coverage}.
          </motion.p>
          <motion.div variants={fadeUp} className="mx-auto flex flex-col gap-3 sm:flex-row lg:mx-0">
            <Link
              to="/servicios"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-primary-dark transition hover:bg-white/90"
            >
              Ver servicios
              <FaArrowRight size={14} />
            </Link>
            <a
              href={buildWhatsAppUrl(WHATSAPP_MESSAGES.visitaTecnica)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white transition hover:bg-[#1DA851]"
            >
              <FaWhatsapp size={18} />
              Agendar visita técnica gratis
            </a>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <HeroServiceCarousel />
        </motion.div>
      </div>
    </section>
  );
}
