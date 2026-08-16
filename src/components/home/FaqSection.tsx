import { motion } from "framer-motion";
import faqsData from "@/data/faqs.json";
import type { Faq } from "@/types/content";
import { fadeUp } from "@/animations/variants";
import SectionHeading from "@/components/common/SectionHeading";
import FAQAccordion from "@/components/common/FAQAccordion";

const faqs = faqsData as Faq[];

export default function FaqSection() {
  return (
    <section className="bg-background-alt dark:bg-background-alt-dark py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10"
        >
          <FAQAccordion faqs={faqs} />
        </motion.div>
      </div>
    </section>
  );
}
