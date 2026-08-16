import { FaSearch } from "react-icons/fa";
import { ENABLED_CATEGORIES, MAX_PRICE_RANGE, SORT_OPTIONS } from "@/config/catalog";
import { formatPrice } from "@/utils/formatPrice";
import type { ServiceCategory, ServiceFilters as ServiceFiltersState } from "@/types/service";
import Select from "@/components/common/Select";

interface ServiceFiltersProps {
  filters: ServiceFiltersState;
  onChange: (filters: ServiceFiltersState) => void;
}

export default function ServiceFilters({ filters, onChange }: ServiceFiltersProps) {
  const maxPrice = filters.maxPrice ?? MAX_PRICE_RANGE;

  function toggleCategory(slug: ServiceCategory) {
    onChange({ ...filters, category: filters.category === slug ? undefined : slug });
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-5">
      <div>
        <label htmlFor="service-search" className="mb-2 block text-sm font-semibold text-text-primary dark:text-text-primary-dark">
          Buscar
        </label>
        <div className="relative">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={14} />
          <input
            id="service-search"
            type="text"
            value={filters.search ?? ""}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Nombre del servicio..."
            className="w-full rounded-xl border border-border dark:border-border-dark bg-background dark:bg-background-dark py-2.5 pl-10 pr-3 text-sm text-text-primary dark:text-text-primary-dark outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-text-primary dark:text-text-primary-dark">Categoría</p>
        <div className="flex flex-col gap-2">
          {ENABLED_CATEGORIES.map((cat) => (
            <label key={cat.slug} className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary dark:text-text-secondary-dark">
              <input
                type="checkbox"
                checked={filters.category === cat.slug}
                onChange={() => toggleCategory(cat.slug)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary/40"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="max-price" className="mb-2 flex justify-between text-sm font-semibold text-text-primary dark:text-text-primary-dark">
          <span>Precio máximo</span>
          <span className="font-normal text-text-secondary dark:text-text-secondary-dark">{formatPrice(maxPrice)}</span>
        </label>
        <input
          id="max-price"
          type="range"
          min={0}
          max={MAX_PRICE_RANGE}
          step={50000}
          value={maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-primary"
        />
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary dark:text-text-secondary-dark">
        <input
          type="checkbox"
          checked={!!filters.emergencyOnly}
          onChange={(e) => onChange({ ...filters, emergencyOnly: e.target.checked })}
          className="h-4 w-4 rounded border-border text-accent focus:ring-accent/40"
        />
        ¿Atiende urgencias?
      </label>

      <Select
        label="Ordenar por"
        value={filters.sortBy ?? "popular"}
        onChange={(e) => onChange({ ...filters, sortBy: e.target.value as ServiceFiltersState["sortBy"] })}
        options={SORT_OPTIONS.map((opt) => ({ value: opt.value, label: opt.label }))}
      />
    </div>
  );
}
