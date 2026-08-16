import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBolt, FaWhatsapp } from "react-icons/fa";
import type { ServiceItem } from "@/types/service";
import { CATEGORY_LABELS } from "@/config/catalog";
import { WHATSAPP_MESSAGES } from "@/config/site";
import { assetUrl } from "@/utils/assetUrl";
import { formatServicePrice } from "@/utils/formatPrice";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { fadeUp } from "@/animations/variants";
import Badge from "@/components/common/Badge";

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark shadow-sm transition-shadow hover:shadow-xl"
    >
      <Link to={`/servicios/${service.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={assetUrl(service.images[0])}
          alt={service.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          <Badge variant="primary" solid>{CATEGORY_LABELS[service.category]}</Badge>
          {service.emergency && (
            <Badge variant="accent" solid>
              <FaBolt size={10} /> Urgencias
            </Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link to={`/servicios/${service.slug}`}>
          <h3 className="font-heading text-lg font-semibold text-text-primary dark:text-text-primary-dark transition-colors group-hover:text-primary">
            {service.name}
          </h3>
        </Link>
        <p className="line-clamp-2 flex-1 text-sm text-text-secondary dark:text-text-secondary-dark">
          {service.shortDescription}
        </p>
        <p className="font-heading text-xl font-semibold text-primary dark:text-primary-light">
          {formatServicePrice(service.price, service.priceType)}
        </p>

        <div className="flex items-center gap-2">
          <Link
            to={`/servicios/${service.slug}`}
            className="flex-1 rounded-full border-2 border-primary px-4 py-2 text-center text-sm font-semibold text-primary transition hover:bg-primary hover:text-white dark:border-primary-light dark:text-primary-light"
          >
            Ver más
          </Link>
          <a
            href={buildWhatsAppUrl(WHATSAPP_MESSAGES.servicio(service.name))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Cotizar por WhatsApp"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:bg-[#1DA851]"
          >
            <FaWhatsapp size={18} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
