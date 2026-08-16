import { motion } from "framer-motion";
import {
  FaBullseye,
  FaEye,
  FaHandshake,
  FaShieldAlt,
  FaCertificate,
  FaFileSignature,
} from "react-icons/fa";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SectionHeading from "@/components/common/SectionHeading";
import { SITE } from "@/config/site";
import { fadeUp, staggerContainer } from "@/animations/variants";

const VALUES = [
  {
    icon: FaShieldAlt,
    title: "Seguridad en el trabajo",
    description:
      "Cada instalación se ejecuta siguiendo protocolos de seguridad, tanto para nuestro equipo técnico como para tu hogar o negocio.",
  },
  {
    icon: FaCertificate,
    title: "Cumplimiento normativo",
    description:
      "Trabajamos bajo normativa RETIE/RETILAP y buenas prácticas de cada especialidad, sin atajos.",
  },
  {
    icon: FaHandshake,
    title: "Confianza",
    description:
      "Entramos a espacios personales y de trabajo de nuestros clientes: la transparencia en cada visita es innegociable.",
  },
  {
    icon: FaFileSignature,
    title: "Garantía por escrito",
    description:
      "Todo trabajo entregado queda respaldado por una garantía por escrito, según el servicio realizado.",
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="Nosotros"
        description="Conoce a ElectroKW S.A.S.: historia, misión, visión y valores de la empresa multiservicios técnicos de Cundinamarca."
        canonicalPath="/nosotros"
      />

      <section className="bg-background-alt dark:bg-background-alt-dark pb-14 pt-32 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Nosotros" }]} />
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-6 max-w-2xl">
            <span className="eyebrow text-sm text-accent">Nosotros</span>
            <h1 className="mt-3 font-heading text-4xl font-bold text-text-primary dark:text-text-primary-dark sm:text-5xl">
              Un equipo técnico, todas las especialidades del hogar y el negocio
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="font-heading text-2xl font-semibold text-text-primary dark:text-text-primary-dark">
              Nuestra historia
            </h2>
            <p className="mt-3 leading-relaxed text-text-secondary dark:text-text-secondary-dark">
              {SITE.name} nació de una necesidad muy concreta: los hogares, conjuntos
              residenciales y pequeñas empresas de {SITE.coverage} suelen necesitar más
              de una especialidad técnica a la vez, y coordinar distintos contratistas
              para eléctrico, acueducto, cámaras o cableado resulta lento y poco
              confiable. Reunimos esas especialidades en un solo equipo técnico,
              manteniendo el mismo estándar de calidad, cumplimiento normativo y
              trato humano en cada visita — de ahí nuestro eslogan: una solución
              para cada ocasión.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-6"
            >
              <FaBullseye className="text-primary dark:text-primary-light" size={26} />
              <h3 className="mt-3 font-heading text-xl font-semibold text-text-primary dark:text-text-primary-dark">
                Misión
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-text-secondary-dark">
                Brindar soluciones técnicas confiables y certificadas para el hogar y
                la empresa, resolviendo instalaciones eléctricas, de acueducto,
                seguridad y cableado con un mismo equipo, cumpliendo siempre la
                normativa vigente.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-6"
            >
              <FaEye className="text-primary dark:text-primary-light" size={26} />
              <h3 className="mt-3 font-heading text-xl font-semibold text-text-primary dark:text-text-primary-dark">
                Visión
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-text-secondary-dark">
                Ser la empresa multiservicios técnicos de referencia en Cundinamarca,
                reconocida por la calidad de su trabajo, la rapidez de respuesta ante
                emergencias y la confianza que genera en cada cliente.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-background-alt dark:bg-background-alt-dark py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Nuestros valores" title="Lo que no negociamos" align="left" />
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {VALUES.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="flex flex-col gap-3 rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-6"
              >
                <value.icon className="text-accent" size={24} />
                <h3 className="font-heading text-base font-semibold text-text-primary dark:text-text-primary-dark">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary dark:text-text-secondary-dark">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
        >
          <h2 className="font-heading text-2xl font-semibold text-text-primary dark:text-text-primary-dark sm:text-3xl">
            Calidad y garantía en cada trabajo
          </h2>
          <p className="mt-4 leading-relaxed text-text-secondary dark:text-text-secondary-dark">
            Usamos materiales certificados, seguimos la normativa técnica de cada
            especialidad y entregamos garantía por escrito en cada servicio. Si algo
            no queda como debería, volvemos a corregirlo sin costo adicional dentro
            del período de garantía.
          </p>
        </motion.div>
      </section>
    </>
  );
}
