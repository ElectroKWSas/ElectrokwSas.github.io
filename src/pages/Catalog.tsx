import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/Loader";
import ServiceFilters from "@/components/product/ServiceFilters";
import ServiceCard from "@/components/product/ServiceCard";
import { serviceRepository } from "@/services/serviceRepository";
import { useDebounce } from "@/hooks/useDebounce";
import { staggerContainer } from "@/animations/variants";
import type { ServiceCategory, ServiceFilters as ServiceFiltersState, ServiceItem } from "@/types/service";

const PAGE_SIZE = 8;

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<ServiceFiltersState>({
    category: (searchParams.get("categoria") as ServiceCategory) || undefined,
    sortBy: "popular",
  });
  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState<ServiceItem[] | null>(null);

  const debouncedSearch = useDebounce(filters.search, 300);

  useEffect(() => {
    if (filters.category) {
      searchParams.set("categoria", filters.category);
    } else {
      searchParams.delete("categoria");
    }
    setSearchParams(searchParams, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category]);

  useEffect(() => {
    setPage(1);
  }, [filters.category, filters.maxPrice, filters.emergencyOnly, debouncedSearch, filters.sortBy]);

  useEffect(() => {
    serviceRepository
      .getAll({ ...filters, search: debouncedSearch })
      .then(setAllResults);
  }, [filters.category, filters.maxPrice, filters.emergencyOnly, debouncedSearch, filters.sortBy]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalPages = useMemo(
    () => (allResults ? Math.max(1, Math.ceil(allResults.length / PAGE_SIZE)) : 1),
    [allResults]
  );

  const pageResults = useMemo(() => {
    if (!allResults) return [];
    const start = (page - 1) * PAGE_SIZE;
    return allResults.slice(start, start + PAGE_SIZE);
  }, [allResults, page]);

  return (
    <>
      <SEO
        title="Servicios"
        description="Catálogo de servicios técnicos de ElectroKW: eléctrico, mantenimiento, acueducto, cámaras de seguridad y cableado estructurado."
        canonicalPath="/servicios"
      />

      <section className="bg-background-alt dark:bg-background-alt-dark pb-10 pt-32 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Servicios" }]} />
          <h1 className="mt-4 font-heading text-3xl font-bold text-text-primary dark:text-text-primary-dark sm:text-4xl">
            Nuestros servicios
          </h1>
          <p className="mt-2 max-w-2xl text-text-secondary dark:text-text-secondary-dark">
            Filtra por categoría, presupuesto o disponibilidad de urgencias para
            encontrar el servicio que necesitas.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <ServiceFilters filters={filters} onChange={setFilters} />
          </aside>

          <div>
            {!allResults ? (
              <div className="flex justify-center py-24">
                <Loader />
              </div>
            ) : pageResults.length === 0 ? (
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border dark:border-border-dark py-24 text-center">
                <p className="font-heading text-lg font-semibold text-text-primary dark:text-text-primary-dark">
                  No encontramos servicios con esos filtros
                </p>
                <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
                  Prueba ajustando la categoría o el precio máximo.
                </p>
              </div>
            ) : (
              <>
                <motion.div
                  key={`${page}-${filters.category ?? "all"}-${filters.sortBy}`}
                  variants={staggerContainer()}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {pageResults.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </motion.div>

                <div className="mt-10">
                  <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
