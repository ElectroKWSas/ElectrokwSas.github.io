import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearchPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { assetUrl } from "@/utils/assetUrl";
import Modal from "@/components/common/Modal";

interface ServiceGalleryProps {
  images: string[];
  name: string;
}

export default function ServiceGallery({ images, name }: ServiceGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const goTo = (idx: number) => setActive((idx + images.length) % images.length);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-background-alt dark:bg-background-alt-dark">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={assetUrl(images[active])}
            alt={`${name} — foto ${active + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="h-full w-full cursor-zoom-in object-cover"
            onClick={() => setZoomOpen(true)}
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          aria-label="Ampliar imagen"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
        >
          <FaSearchPlus size={14} />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
            >
              <FaChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
            >
              <FaChevronRight size={14} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, idx) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(idx)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                active === idx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={assetUrl(img)} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <Modal isOpen={zoomOpen} onClose={() => setZoomOpen(false)} title={name}>
        <img src={assetUrl(images[active])} alt={name} className="max-h-[80vh] w-full object-contain" />
      </Modal>
    </div>
  );
}
