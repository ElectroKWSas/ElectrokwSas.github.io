export type ServiceCategory =
  | "electrico"
  | "mantenimiento"
  | "acueducto"
  | "gas"
  | "camaras-y-seguridad"
  | "cableado-electrico";

export type PriceType = "fijo" | "desde" | "cotizar";

export interface ServiceItem {
  id: string;
  slug: string;
  category: ServiceCategory;
  name: string;
  price: number;
  priceType: PriceType;
  compareAtPrice?: number;
  description: string;
  shortDescription: string;
  features: string[];
  duration?: string;
  warranty?: string;
  emergency?: boolean;
  images: string[];
  available: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  createdAt: string;
  sku: string;
  relatedIds?: string[];
}

export interface ServiceCategoryEntry {
  id: string;
  name: string;
  slug: ServiceCategory;
  image: string;
  description: string;
  enabled: boolean;
}

export interface ServiceFilters {
  category?: ServiceCategory;
  maxPrice?: number;
  emergencyOnly?: boolean;
  search?: string;
  sortBy?: "popular" | "recent" | "price-asc" | "price-desc";
}
