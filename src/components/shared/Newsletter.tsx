import { useState, type FormEvent } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { isValidEmail } from "@/utils/validators";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("sent");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor="newsletter-email" className="text-sm font-medium text-white/90">
        Novedades y tips de mantenimiento
      </label>
      <div className="flex overflow-hidden rounded-full border border-white/20 bg-white/5">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
          }}
          placeholder="tu@correo.com"
          className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none"
        />
        <button
          type="submit"
          aria-label="Suscribirme"
          className="flex items-center justify-center bg-accent px-4 text-white transition hover:bg-accent-dark"
        >
          <FaPaperPlane size={14} />
        </button>
      </div>
      {status === "sent" && <p className="text-xs text-energy">¡Gracias por suscribirte!</p>}
      {status === "error" && <p className="text-xs text-red-300">Ingresa un correo válido.</p>}
    </form>
  );
}
