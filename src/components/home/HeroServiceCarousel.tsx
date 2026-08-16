import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { ServiceItem } from "@/types/service";
import { serviceRepository } from "@/services/serviceRepository";
import { shuffle } from "@/utils/shuffle";
import { assetUrl } from "@/utils/assetUrl";

export default function HeroServiceCarousel() {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    serviceRepository.getAll().then((all) => setItems(shuffle(all).slice(0, 8)));
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [items]);

  const current = items[index];

  return (
    <div className="mx-auto flex flex-col items-center gap-6">
      <div className="relative h-72 w-72 shrink-0 sm:h-80 sm:w-80">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-energy/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border border-primary-light/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute inset-8 overflow-hidden rounded-full border-4 border-white/80 shadow-2xl">
          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Link to={`/servicios/${current.slug}`} className="block h-full w-full">
                  <img
                    src={assetUrl(current.images[0])}
                    alt={current.name}
                    className="h-full w-full object-cover"
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex h-11 items-center justify-center">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Link
                to={`/servicios/${current.slug}`}
                className="flex max-w-xs items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-center backdrop-blur-sm transition hover:bg-white/15"
              >
                <span className="line-clamp-1 text-sm font-semibold text-white">
                  {current.name}
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
