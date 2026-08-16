import { SITE } from "@/config/site";

export function buildWhatsAppUrl(message: string, number: string = SITE.whatsappNumber): string {
  const cleanNumber = number.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
