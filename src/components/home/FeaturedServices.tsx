import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import type { ServiceItem } from "@/types/service";
import { serviceRepository } from "@/services/serviceRepository";
import { staggerContainer } from "@/animations/variants";
import SectionHeading from "@/components/common/SectionHeading";
import ServiceCard from "@/components/product/ServiceCard";
import Loader from "@/components/common/Loader";

export default function FeaturedServices() {
  const [services, setServices] = useState<ServiceItem[] | null>(null);

  useEffect(() => {
    serviceRepository.getFeatured(8).then(setServices);
  }, []);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <SectionHeading
            eyebrow="Servicios destacados"
            title="Lo que más solicitan hogares y empresas"
            align="left"
          />
          <Link
            to="/servicios"
            className="hidden shrink-0 items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white dark:border-primary-light dark:text-primary-light sm:inline-flex"
          >
            Ver catálogo completo
            <FaArrowRight size={13} />
          </Link>
        </div>

        {!services ? (
          <div className="flex justify-center py-16">
            <Loader />
          </div>
        ) : (
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </motion.div>
        )}

        <Link
          to="/servicios"
          className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white dark:border-primary-light dark:text-primary-light sm:hidden"
        >
          Ver catálogo completo
          <FaArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
}
