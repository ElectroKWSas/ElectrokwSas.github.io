import type { ServiceCategory } from "@/types/service";

export interface NavChild {
  label: string;
  to: string;
  category?: ServiceCategory;
  description?: string;
}

export interface NavItem {
  label: string;
  to: string;
  children?: NavChild[];
}
