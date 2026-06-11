import Link from "next/link";
import { ChevronLeft } from "lucide-react";

/** Marca tipográfica del Protocolo HT (dorado sobre oscuro). */
export function LogoMark({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "size-10 text-lg" : "size-12 text-xl";
  return (
    <div className="flex items-center gap-3">
      <span
        className={
          "flex items-center justify-center rounded-xl bg-gradient-to-br from-ht-surface-2 to-ht-bg font-black ring-1 ring-ht-gold/50 " +
          box
        }
      >
        <span className="text-gold-gradient">HT</span>
      </span>
      <div className="flex flex-col leading-none">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ht-muted">
          Protocolo
        </span>
        <span className="text-lg font-black tracking-wide text-ht-text">
          HT
        </span>
      </div>
    </div>
  );
}

/** Cabecera de las páginas internas, con botón de volver. */
export function PageHeader({
  titulo,
  back = "/",
}: {
  titulo: string;
  back?: string;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-ht-bg/90 px-4 py-3 backdrop-blur">
      <Link
        href={back}
        aria-label="Volver"
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ht-surface text-ht-gold ring-1 ring-border transition active:scale-95"
      >
        <ChevronLeft className="size-6" />
      </Link>
      <h1 className="truncate text-lg font-extrabold text-ht-text">{titulo}</h1>
    </header>
  );
}
