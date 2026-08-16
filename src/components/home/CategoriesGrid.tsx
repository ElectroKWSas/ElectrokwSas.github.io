import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ENABLED_CATEGORIES } from "@/config/catalog";
import { assetUrl } from "@/utils/assetUrl";
import { fadeUp, staggerContainer } from "@/animations/variants";
import SectionHeading from "@/components/common/SectionHeading";

export default function CategoriesGrid() {
  return (
    <section className="bg-background-alt dark:bg-background-alt-dark py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Líneas de servicio"
          title="Especialidades activas hoy"
          description="Cada categoría cuenta con técnicos propios y materiales certificados. Escríbenos si necesitas un servicio que no ves aquí."
        />

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {ENABLED_CATEGORIES.map((cat) => (
            <motion.div key={cat.slug} variants={fadeUp}>
              <Link
                to={`/servicios?categoria=${cat.slug}`}
                className="group relative block aspect-square overflow-hidden rounded-2xl"
              >
                <img
                  src={assetUrl(cat.image)}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-center font-heading text-sm font-semibold text-white sm:text-base">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
