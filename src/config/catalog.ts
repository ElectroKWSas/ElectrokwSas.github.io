import categoriesData from "@/data/categories.json";
import type { ServiceCategory, ServiceCategoryEntry } from "@/types/service";

export const ALL_CATEGORIES = categoriesData as ServiceCategoryEntry[];

export const ENABLED_CATEGORIES: ServiceCategoryEntry[] = ALL_CATEGORIES.filter(
  (cat) => cat.enabled
);

export const ENABLED_CATEGORY_SLUGS: ServiceCategory[] = ENABLED_CATEGORIES.map(
  (cat) => cat.slug
);

export function isCategoryEnabled(slug: ServiceCategory): boolean {
  return ENABLED_CATEGORY_SLUGS.includes(slug);
}

export function getCategoryEntry(
  slug: ServiceCategory
): ServiceCategoryEntry | undefined {
  return ALL_CATEGORIES.find((cat) => cat.slug === slug);
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  electrico: "Eléctrico",
  mantenimiento: "Mantenimiento",
  acueducto: "Acueducto",
  gas: "Gas domiciliario",
  "camaras-y-seguridad": "Cámaras y seguridad",
  "cableado-electrico": "Cableado eléctrico",
};

export const MAX_PRICE_RANGE = 2500000;

export const SORT_OPTIONS = [
  { value: "popular", label: "Más solicitados" },
  { value: "recent", label: "Más recientes" },
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc", label: "Mayor precio" },
] as const;
