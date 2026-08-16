import type { NavItem } from "@/interfaces/navigation";
import { ENABLED_CATEGORIES } from "@/config/catalog";

export const SITE = {
  name: "ElectroKW S.A.S.",
  shortName: "ElectroKW",
  slogan: "Una solución para cada ocasión",
  description:
    "Instalaciones y mantenimiento eléctrico, acueducto, gas domiciliario, cámaras de seguridad y cableado estructurado para hogares, conjuntos residenciales y empresas en Cundinamarca.",
  url: "https://electrokw.github.io",
  email: "electrokw.empresa@gmail.com",
  phoneDisplay: "+57 312 551 7663",
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "573125517663",
  coverage: "Todo el departamento de Cundinamarca",
  schedule: [
    { days: "Lunes a sábado", hours: "8:00 a.m. – 5:00 p.m." },
  ],
  emergencyNote:
    "Atención de urgencias dentro del horario de atención (lunes a sábado, 8:00 a.m. – 5:00 p.m.).",
  address: {
    region: "Cundinamarca",
    country: "Colombia",
  },
};

export const SOCIAL_LINKS = {
  instagram: null as string | null,
  facebook: null as string | null,
  tiktok: null as string | null,
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", to: "/" },
  { label: "Nosotros", to: "/nosotros" },
  {
    label: "Servicios",
    to: "/servicios",
    children: ENABLED_CATEGORIES.map((cat) => ({
      label: cat.name,
      to: `/servicios?categoria=${cat.slug}`,
      category: cat.slug,
      description: cat.description,
    })),
  },
  { label: "Plano interactivo", to: "/plano-interactivo" },
  { label: "Contacto", to: "/contacto" },
];

export const WHATSAPP_MESSAGES = {
  general: "Hola, quiero información sobre los servicios de ElectroKW.",
  catalogo: "Hola, quiero conocer los servicios disponibles.",
  servicio: (nombre: string) => `Hola, quiero cotizar este servicio: ${nombre}.`,
  urgencia: "Hola, tengo una emergencia y necesito atención inmediata.",
  visitaTecnica: "Hola, quiero agendar una visita técnica sin costo.",
  contacto: "Hola, vi la página de ElectroKW y quiero más información.",
};
