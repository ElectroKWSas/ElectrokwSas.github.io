import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { cn } from "@/utils/cn";

interface WhatsAppButtonProps {
  message: string;
  label?: string;
  className?: string;
  floating?: boolean;
}

export default function WhatsAppButton({ message, label, className, floating }: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl(message);

  if (floating) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
      >
        <FaWhatsapp size={28} />
      </motion.a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:bg-[#1DA851]",
        className
      )}
    >
      <FaWhatsapp size={20} />
      {label || "Escríbenos por WhatsApp"}
    </a>
  );
}
