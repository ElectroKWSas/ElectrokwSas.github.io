import type { ContactFormData, ContactSubmissionPayload } from "@/types/contact";

const ENDPOINT = import.meta.env.VITE_GOOGLE_SHEETS_ENDPOINT;

async function getVisitorIp(): Promise<string> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = (await res.json()) as { ip: string };
    return data.ip;
  } catch {
    return "desconocida";
  }
}

export async function submitContactForm(formData: ContactFormData): Promise<void> {
  if (!ENDPOINT) {
    throw new Error(
      "El formulario aún no está conectado a Google Sheets. Configura VITE_GOOGLE_SHEETS_ENDPOINT."
    );
  }

  const now = new Date();
  const payload: ContactSubmissionPayload = {
    ...formData,
    date: now.toLocaleDateString("es-CO"),
    time: now.toLocaleTimeString("es-CO"),
    ip: await getVisitorIp(),
    source: "electrokwsas.github.io",
  };

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("No se pudo enviar el formulario. Intenta de nuevo.");
  }
}
