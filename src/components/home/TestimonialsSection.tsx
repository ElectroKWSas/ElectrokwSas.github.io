import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import testimonialsData from "@/data/testimonials.json";
import type { Testimonial } from "@/types/content";
import { fadeUp, staggerContainer } from "@/animations/variants";
import SectionHeading from "@/components/common/SectionHeading";

const testimonials = testimonialsData as Testimonial[];

export default function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Clientes satisfechos"
          title="Lo que dicen quienes ya confiaron en nosotros"
        />

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.id}
              variants={fadeUp}
              className="flex flex-col gap-4 rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-6"
            >
              <FaQuoteLeft className="text-accent/40" size={22} />
              <blockquote className="flex-1 text-sm leading-relaxed text-text-secondary dark:text-text-secondary-dark">
                {t.quote}
              </blockquote>
              <div className="flex gap-1 text-warning">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} size={13} />
                ))}
              </div>
              <figcaption>
                <p className="font-heading text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                  {t.name}
                </p>
                <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                  {t.role}
                  {t.location ? ` · ${t.location}` : ""}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
