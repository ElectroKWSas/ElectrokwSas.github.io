import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { fadeUp } from "@/animations/variants";
import type { SectionHeadingProps } from "@/interfaces/component-props";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={cn("flex flex-col gap-3", align === "center" ? "items-center text-center" : "items-start text-left")}
    >
      {eyebrow && (
        <span className="eyebrow flex items-center gap-3 text-xs text-accent">
          <span className="h-px w-8 bg-accent/60" />
          {eyebrow}
          {align === "center" && <span className="h-px w-8 bg-accent/60" />}
        </span>
      )}
      <h2
        className={cn(
          "max-w-2xl text-3xl font-semibold sm:text-4xl",
          light ? "text-white" : "text-text-primary dark:text-text-primary-dark"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed",
            light ? "text-white/80" : "text-text-secondary dark:text-text-secondary-dark"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
