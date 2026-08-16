import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { NAV_ITEMS } from "@/config/site";
import { cn } from "@/utils/cn";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] bg-black/60 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="ml-auto flex h-full w-[85%] max-w-sm flex-col gap-1 overflow-y-auto bg-surface dark:bg-surface-dark p-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full text-text-primary dark:text-text-primary-dark hover:bg-black/5 dark:hover:bg-white/10"
            >
              <FaTimes size={18} />
            </button>

            <nav className="mt-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <div key={item.label} className="border-b border-border dark:border-border-dark py-2">
                    <button
                      type="button"
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      className="flex w-full items-center justify-between py-2 text-left font-heading text-lg font-medium text-text-primary dark:text-text-primary-dark"
                    >
                      {item.label}
                      <FaChevronDown
                        className={cn("transition-transform", expanded === item.label && "rotate-180")}
                        size={14}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="flex flex-col overflow-hidden pl-3"
                        >
                          <NavLink
                            to={item.to}
                            onClick={onClose}
                            className="py-2 text-sm font-semibold text-primary dark:text-primary-light"
                          >
                            Ver todos los servicios
                          </NavLink>
                          {item.children.map((child) => (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              onClick={onClose}
                              className="py-2 text-sm text-text-secondary dark:text-text-secondary-dark hover:text-primary"
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "border-b border-border dark:border-border-dark py-4 font-heading text-lg font-medium",
                        isActive ? "text-primary dark:text-primary-light" : "text-text-primary dark:text-text-primary-dark"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
