import servicesData from "@/data/services.json";
import { isCategoryEnabled } from "@/config/catalog";
import type { ServiceFilters, ServiceItem } from "@/types/service";

export interface ServiceRepository {
  getAll(filters?: ServiceFilters): Promise<ServiceItem[]>;
  getBySlug(slug: string): Promise<ServiceItem | undefined>;
  getFeatured(limit?: number): Promise<ServiceItem[]>;
  getBestSellers(limit?: number): Promise<ServiceItem[]>;
  getNewArrivals(limit?: number): Promise<ServiceItem[]>;
  getRelated(service: ServiceItem, limit?: number): Promise<ServiceItem[]>;
  search(query: string, limit?: number): Promise<ServiceItem[]>;
}

// Todos los servicios definidos en el código, sin importar su categoría.
const ALL_SERVICES = servicesData as ServiceItem[];

/**
 * Implementación local basada en JSON. Filtra SIEMPRE por categorías activas
 * (config/catalog.ts) antes de devolver cualquier resultado, para que un
 * servicio de una categoría desactivada nunca aparezca en ningún lado del
 * sitio. Migrar a Firebase/Supabase implica solo reemplazar esta clase.
 */
class LocalServiceRepository implements ServiceRepository {
  private visible(): ServiceItem[] {
    return ALL_SERVICES.filter(
      (service) => service.available && isCategoryEnabled(service.category)
    );
  }

  async getAll(filters: ServiceFilters = {}): Promise<ServiceItem[]> {
    let results = this.visible();

    if (filters.category) {
      results = results.filter((s) => s.category === filters.category);
    }
    if (typeof filters.maxPrice === "number") {
      results = results.filter((s) => s.price <= filters.maxPrice!);
    }
    if (filters.emergencyOnly) {
      results = results.filter((s) => s.emergency);
    }
    if (filters.search) {
      const q = filters.search.trim().toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q)
      );
    }

    switch (filters.sortBy) {
      case "recent":
        results = [...results].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "price-asc":
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case "popular":
      default:
        results = [...results].sort(
          (a, b) => Number(b.isBestSeller) - Number(a.isBestSeller)
        );
        break;
    }

    return results;
  }

  async getBySlug(slug: string): Promise<ServiceItem | undefined> {
    return this.visible().find((s) => s.slug === slug);
  }

  async getFeatured(limit = 6): Promise<ServiceItem[]> {
    return this.visible()
      .filter((s) => s.isFeatured)
      .slice(0, limit);
  }

  async getBestSellers(limit = 6): Promise<ServiceItem[]> {
    return this.visible()
      .filter((s) => s.isBestSeller)
      .slice(0, limit);
  }

  async getNewArrivals(limit = 6): Promise<ServiceItem[]> {
    return this.visible()
      .filter((s) => s.isNew)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async getRelated(service: ServiceItem, limit = 4): Promise<ServiceItem[]> {
    const visible = this.visible().filter((s) => s.id !== service.id);
    const byIds = service.relatedIds
      ? visible.filter((s) => service.relatedIds!.includes(s.id))
      : [];
    if (byIds.length >= limit) return byIds.slice(0, limit);

    const sameCategory = visible.filter(
      (s) => s.category === service.category && !byIds.includes(s)
    );
    return [...byIds, ...sameCategory].slice(0, limit);
  }

  async search(query: string, limit = 8): Promise<ServiceItem[]> {
    const results = await this.getAll({ search: query });
    return results.slice(0, limit);
  }
}

export const serviceRepository: ServiceRepository = new LocalServiceRepository();
