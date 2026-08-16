import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaWhatsapp, FaClock, FaShieldAlt, FaBolt, FaCheck } from "react-icons/fa";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Badge from "@/components/common/Badge";
import Loader from "@/components/common/Loader";
import ServiceGallery from "@/components/product/ServiceGallery";
import RelatedServices from "@/components/product/RelatedServices";
import { serviceRepository } from "@/services/serviceRepository";
import { CATEGORY_LABELS } from "@/config/catalog";
import { SITE, WHATSAPP_MESSAGES } from "@/config/site";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { formatServicePrice } from "@/utils/formatPrice";
import { fadeUp } from "@/animations/variants";
import type { ServiceItem } from "@/types/service";

export default function ServiceDetail() {
  const { slug = "" } = useParams();
  const [service, setService] = useState<ServiceItem | null | undefined>(undefined);
  const [related, setRelated] = useState<ServiceItem[]>([]);

  useEffect(() => {
    let active = true;
    setService(undefined);
    serviceRepository.getBySlug(slug).then((found) => {
      if (!active) return;
      setService(found ?? null);
      if (found) {
        serviceRepository.getRelated(found).then((r) => active && setRelated(r));
      }
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (service === undefined) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (service === null) {
    return <Navigate to="/servicios" replace />;
  }

  return (
    <>
      <SEO
        title={service.name}
        description={service.shortDescription}
        canonicalPath={`/servicios/${service.slug}`}
        image={service.images[0] ? `${SITE.url}${service.images[0]}` : undefined}
        type="product"
      />

      <section className="pb-6 pt-32 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Servicios", to: "/servicios" },
              { label: CATEGORY_LABELS[service.category], to: `/servicios?categoria=${service.category}` },
              { label: service.name },
            ]}
          />
        </div>
      </section>

      <section key={service.id} className="pb-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"
        >
          <ServiceGallery images={service.images} name={service.name} />

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">{CATEGORY_LABELS[service.category]}</Badge>
              {service.emergency && (
                <Badge variant="accent">
                  <FaBolt size={10} /> Atiende urgencias
                </Badge>
              )}
              {service.isBestSeller && <Badge variant="energy">Más solicitado</Badge>}
            </div>

            <h1 className="font-heading text-3xl font-bold text-text-primary dark:text-text-primary-dark sm:text-4xl">
              {service.name}
            </h1>

            <p className="font-heading text-2xl font-semibold text-primary dark:text-primary-light">
              {formatServicePrice(service.price, service.priceType)}
            </p>

            <p className="leading-relaxed text-text-secondary dark:text-text-secondary-dark">
              {service.description}
            </p>

            <div className="flex flex-col gap-2 rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-5">
              {service.duration && (
                <div className="flex items-center gap-3 text-sm text-text-secondary dark:text-text-secondary-dark">
                  <FaClock className="text-primary dark:text-primary-light" size={15} />
                  <span>
                    <strong className="text-text-primary dark:text-text-primary-dark">Duración: </strong>
                    {service.duration}
                  </span>
                </div>
              )}
              {service.warranty && (
                <div className="flex items-center gap-3 text-sm text-text-secondary dark:text-text-secondary-dark">
                  <FaShieldAlt className="text-primary dark:text-primary-light" size={15} />
                  <span>
                    <strong className="text-text-primary dark:text-text-primary-dark">Garantía: </strong>
                    {service.warranty}
                  </span>
                </div>
              )}
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-text-primary dark:text-text-primary-dark">
                Qué incluye
              </h2>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary dark:text-text-secondary-dark">
                    <FaCheck className="mt-0.5 shrink-0 text-success" size={13} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={buildWhatsAppUrl(WHATSAPP_MESSAGES.servicio(service.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-lg font-semibold text-white transition hover:bg-[#1DA851]"
            >
              <FaWhatsapp size={22} />
              Cotizar por WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

      {related.length > 0 && (
        <section className="bg-background-alt dark:bg-background-alt-dark py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-semibold text-text-primary dark:text-text-primary-dark">
                Servicios relacionados
              </h2>
              <Link
                to="/servicios"
                className="hidden text-sm font-semibold text-primary dark:text-primary-light sm:inline"
              >
                Ver todos →
              </Link>
            </div>
            <RelatedServices services={related} />
          </div>
        </section>
      )}
    </>
  );
}
