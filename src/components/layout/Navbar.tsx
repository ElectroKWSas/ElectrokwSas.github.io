import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaMoon, FaSun, FaWhatsapp } from "react-icons/fa";
import { NAV_ITEMS, SITE, WHATSAPP_MESSAGES } from "@/config/site";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useDarkMode } from "@/hooks/useDarkMode";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { assetUrl } from "@/utils/assetUrl";
import { cn } from "@/utils/cn";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Navbar() {
  const scrolled = useScrollPosition(30);
  const { isDark, toggle } = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const { pathname } = useLocation();
  // El navbar transparente con texto claro solo tiene sentido flotando sobre
  // el hero oscuro de Inicio. En el resto de páginas (que arrancan con un
  // fondo claro/oscuro normal según el tema) debe comportarse como si
  // siempre estuviera "scrolled": sólido y adaptado al tema.
  const overDarkHero = pathname === "/" && !scrolled;
  const solidNavbar = !overDarkHero;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solidNavbar
            ? "bg-surface/95 dark:bg-surface-dark/95 shadow-md backdrop-blur"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center" onClick={() => setMegaOpen(null)}>
            <div className="flex items-center justify-center rounded-2xl bg-white px-2.5 py-1.5 shadow-sm">
              <img src={assetUrl("/images/logo.png")} alt={SITE.name} className="h-[1.8rem] w-auto sm:h-[2.2rem]" />
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setMegaOpen(null)}>
            {NAV_ITEMS.map((item) => (
              <div key={item.to} className="relative" onMouseEnter={() => item.children && setMegaOpen(item.label)}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                      solidNavbar
                        ? isActive
                          ? "text-primary dark:text-primary-light"
                          : "text-text-primary dark:text-text-primary-dark hover:text-primary dark:hover:text-primary-light"
                        : isActive
                        ? "text-energy"
                        : "text-white hover:text-energy"
                    )
                  }
                >
                  {item.label}
                </NavLink>

                <AnimatePresence>
                  {item.children && megaOpen === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full z-10 w-[560px] -translate-x-1/2 rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-4 shadow-2xl"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={() => setMegaOpen(null)}
                            className="group rounded-xl p-3 transition hover:bg-background-alt dark:hover:bg-background-alt-dark"
                          >
                            <p className="font-heading text-sm font-semibold text-text-primary dark:text-text-primary-dark group-hover:text-primary">
                              {child.label}
                            </p>
                            {child.description && (
                              <p className="mt-1 line-clamp-2 text-xs text-text-secondary dark:text-text-secondary-dark">
                                {child.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                      <Link
                        to={item.to}
                        onClick={() => setMegaOpen(null)}
                        className="mt-3 block rounded-xl bg-primary/5 px-3 py-2 text-center text-sm font-semibold text-primary hover:bg-primary/10"
                      >
                        Ver todos los servicios →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                solidNavbar
                  ? "text-text-primary dark:text-text-primary-dark hover:bg-black/5 dark:hover:bg-white/10"
                  : "text-white hover:bg-white/10"
              )}
            >
              {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>

            <a
              href={buildWhatsAppUrl(WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1DA851] sm:flex"
            >
              <FaWhatsapp size={16} />
              WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
                solidNavbar ? "text-text-primary dark:text-text-primary-dark" : "text-white"
              )}
            >
              <FaBars size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
