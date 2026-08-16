import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaBolt } from "react-icons/fa";
import SEO from "@/components/common/SEO";
import { fadeUp } from "@/animations/variants";

export default function NotFound() {
  return (
    <>
      <SEO title="Página no encontrada" description="La página que buscas no existe." noindex canonicalPath="/404" />
      <section className="flex min-h-[80vh] items-center justify-center px-4 py-32">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col items-center gap-5 text-center">
          <FaBolt className="text-energy" size={48} />
          <h1 className="font-heading text-6xl font-bold text-primary dark:text-primary-light">404</h1>
          <p className="max-w-md text-text-secondary dark:text-text-secondary-dark">
            No encontramos la página que buscas. Puede que el enlace esté roto o que
            la página se haya movido.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-dark"
          >
            <FaHome size={15} />
            Volver al inicio
          </Link>
        </motion.div>
      </section>
    </>
  );
}
