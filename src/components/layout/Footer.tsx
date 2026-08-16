import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from "react-icons/fa";
import { ENABLED_CATEGORIES } from "@/config/catalog";
import { SITE } from "@/config/site";
import { assetUrl } from "@/utils/assetUrl";
import SocialLinks from "@/components/shared/SocialLinks";
import Newsletter from "@/components/shared/Newsletter";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center">
            <div className="flex items-center justify-center rounded-2xl bg-white px-4 py-3 shadow-sm">
              <img src={assetUrl("/images/logo.png")} alt={SITE.name} className="h-12 w-auto" />
            </div>
          </Link>
          <p className="eyebrow text-xs text-accent">{SITE.slogan}</p>
          <p className="text-sm leading-relaxed text-white/70">{SITE.description}</p>
          <SocialLinks />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-lg font-semibold">Servicios</h3>
          {ENABLED_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/servicios?categoria=${cat.slug}`}
              className="text-sm text-white/70 transition hover:text-primary-light"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-lg font-semibold">Contacto</h3>
          <a href={`mailto:${SITE.email}`} className="flex items-start gap-2 text-sm text-white/70 hover:text-primary-light">
            <FaEnvelope className="mt-0.5 shrink-0" size={14} />
            {SITE.email}
          </a>
          <a href={`tel:+${SITE.whatsappNumber}`} className="flex items-start gap-2 text-sm text-white/70 hover:text-primary-light">
            <FaPhoneAlt className="mt-0.5 shrink-0" size={14} />
            {SITE.phoneDisplay}
          </a>
          <p className="flex items-start gap-2 text-sm text-white/70">
            <FaMapMarkerAlt className="mt-0.5 shrink-0" size={14} />
            {SITE.coverage}
          </p>
          <div className="flex items-start gap-2 text-sm text-white/70">
            <FaClock className="mt-0.5 shrink-0" size={14} />
            <span>
              {SITE.schedule.map((s) => (
                <span key={s.days} className="block">
                  {s.days}: {s.hours}
                </span>
              ))}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-lg font-semibold">Mantente al día</h3>
          <Newsletter />
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/50 sm:px-6 lg:px-8">
        © {year} {SITE.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
