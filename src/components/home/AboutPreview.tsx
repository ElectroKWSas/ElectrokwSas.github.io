import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { assetUrl } from "@/utils/assetUrl";
import { fadeUp, slideInRight } from "@/animations/variants";
import SectionHeading from "@/components/common/SectionHeading";

export default function AboutPreview() {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col gap-5"
        >
          <SectionHeading
            eyebrow="Quiénes somos"
            title="Un solo equipo para todas las instalaciones de tu hogar o negocio"
            align="left"
          />
          <p className="text-base leading-relaxed text-text-secondary dark:text-text-secondary-dark">
            ElectroKW S.A.S. nace para resolver un problema real: coordinar varios
            técnicos distintos para cada instalación es lento y poco confiable.
            Reunimos electricidad, acueducto, cámaras de seguridad y cableado
            estructurado en un solo equipo técnico, con el mismo estándar de
            calidad y cumplimiento normativo en cada visita.
          </p>
          <Link
            to="/nosotros"
            className="inline-flex w-fit items-center gap-2 font-semibold text-primary dark:text-primary-light hover:gap-3 transition-all"
          >
            Conoce más sobre nosotros
            <FaArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="relative"
        >
          <div className="mx-auto flex w-full max-w-md items-center justify-center rounded-3xl bg-white p-10 shadow-lg">
            <img src={assetUrl("/images/logo.png")} alt="ElectroKW S.A.S." className="w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
