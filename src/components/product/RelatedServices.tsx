import { motion } from "framer-motion";
import type { ServiceItem } from "@/types/service";
import { staggerContainer } from "@/animations/variants";
import ServiceCard from "@/components/product/ServiceCard";

interface RelatedServicesProps {
  services: ServiceItem[];
}

export default function RelatedServices({ services }: RelatedServicesProps) {
  if (services.length === 0) return null;

  return (
    <motion.div
      key={services.map((s) => s.id).join("-")}
      variants={staggerContainer()}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </motion.div>
  );
}
