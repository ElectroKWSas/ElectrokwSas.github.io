export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  noindex?: boolean;
  type?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown>;
}
