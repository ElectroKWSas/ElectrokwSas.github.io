import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaClipboardCheck,
  FaClipboardList,
  FaBolt,
  FaFileSignature,
  FaBoxOpen,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import benefitsData from "@/data/benefits.json";
import type { Benefit } from "@/types/content";
import { fadeUp, staggerContainer } from "@/animations/variants";
import SectionHeading from "@/components/common/SectionHeading";

const ICONS: Record<string, IconType> = {
  FaUserGraduate,
  FaClipboardCheck,
  FaClipboardList,
  FaBolt,
  FaFileSignature,
  FaBoxOpen,
};

const benefits = benefitsData as Benefit[];

export default function Benefits() {
  return (
    <section className="bg-background-alt dark:bg-background-alt-dark py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Por qué elegirnos"
          title="Confianza técnica en cada visita"
          description="Trabajamos con procesos claros para que sepas exactamente qué esperar antes, durante y después del servicio."
        />

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit) => {
            const Icon = ICONS[benefit.icon] ?? FaBolt;
            return (
              <motion.div
                key={benefit.id}
                variants={fadeUp}
                className="flex flex-col gap-4 rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:text-primary-light">
                  <Icon size={22} />
                </span>
                <h3 className="font-heading text-lg font-semibold text-text-primary dark:text-text-primary-dark">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary dark:text-text-secondary-dark">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
