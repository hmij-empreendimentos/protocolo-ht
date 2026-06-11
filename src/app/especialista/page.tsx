import { MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/Brand";
import { WhatsappIcon } from "@/components/icons";

export const metadata = {
  title: "Hablar con Especialista · Protocolo HT",
};

// Chat del especialista (página del cliente).
const CHAT_EMBED_URL: string | null = "https://soporte-ht.netlify.app/";

const WHATSAPP_URL =
  "https://wa.me/5537991211613?text=Hola%2C%20quiero%20hablar%20con%20el%20especialista%20del%20Protocolo%20HT.";

export default function EspecialistaPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col">
      <PageHeader titulo="Hablar con Especialista" back="/modulos" />

      <div className="flex flex-col gap-5 px-5 pt-5 pb-8">
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-gradient-to-br from-ht-surface-2 to-ht-bg p-6 text-center ring-1 ring-ht-gold/30">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-ht-gold text-ht-bg">
            <MessageCircle className="size-8" />
          </span>
          <h2 className="text-xl font-extrabold text-ht-text">
            ¿Tienes dudas sobre el protocolo?
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-ht-muted">
            Nuestro especialista está listo para ayudarte. Resuelve tus dudas de
            forma directa y avanza con confianza.
          </p>
        </div>

        {CHAT_EMBED_URL ? (
          <div className="overflow-hidden rounded-2xl ring-1 ring-border">
            <iframe
              src={CHAT_EMBED_URL}
              title="Chat con el especialista"
              className="h-[70vh] w-full"
              frameBorder={0}
            />
          </div>
        ) : (
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-2xl bg-ht-gold py-4 text-base font-extrabold text-ht-bg transition active:scale-[0.98]"
          >
            <WhatsappIcon className="size-6" />
            Hablar ahora por WhatsApp
          </a>
        )}
      </div>
    </main>
  );
}
