import Image from "next/image";
import Link from "next/link";
import type { Acento, Modulo } from "@/lib/modulos-conteudo";
import { ModuleIcon } from "./icons";

type Props = {
  modulo: Modulo;
};

const ACENTO: Record<
  Acento,
  { gradient: string; ring: string; glow: string; icon: string }
> = {
  gold: {
    gradient: "from-ht-surface-2 to-ht-bg",
    ring: "ring-ht-gold/45",
    glow: "shadow-[0_14px_36px_-14px_rgba(212,175,55,0.5)]",
    icon: "text-ht-gold",
  },
  red: {
    gradient: "from-[#2a1413] to-ht-bg",
    ring: "ring-ht-red/45",
    glow: "shadow-[0_14px_36px_-14px_rgba(192,57,43,0.5)]",
    icon: "text-ht-red",
  },
  steel: {
    gradient: "from-[#16202a] to-ht-bg",
    ring: "ring-slate-400/35",
    glow: "shadow-[0_14px_36px_-14px_rgba(148,163,184,0.45)]",
    icon: "text-slate-300",
  },
};

export function ModuloCard({ modulo }: Props) {
  const isPrincipal = modulo.badge === "principal";
  const a = ACENTO[modulo.acento];
  const imagen = "imagen" in modulo ? modulo.imagen : undefined;
  const ringStrength = isPrincipal ? "ring-2" : "ring-1";

  const inner = imagen ? (
    <div
      className={
        "group relative aspect-square overflow-hidden rounded-2xl bg-ht-bg transition active:scale-[0.96] " +
        `${ringStrength} ${isPrincipal ? "ring-ht-gold/70" : a.ring} ` +
        (isPrincipal ? a.glow : "shadow-[0_8px_22px_-12px_rgba(0,0,0,0.7)]")
      }
    >
      <Image
        src={imagen}
        alt={modulo.titulo}
        fill
        sizes="(max-width: 640px) 50vw, 240px"
        className="object-cover transition-transform duration-500 group-active:scale-105"
      />
      {/* Profundidad: viñeta inferior + sheen superior */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5" />
      {isPrincipal && (
        <span className="absolute left-2 top-2 rounded-full bg-ht-gold px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-ht-bg shadow">
          Principal
        </span>
      )}
    </div>
  ) : (
    <div
      className={
        "group relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-4 transition active:scale-[0.96] " +
        `${a.gradient} ${ringStrength} ${a.ring} ` +
        (isPrincipal ? a.glow : "shadow-[0_8px_22px_-12px_rgba(0,0,0,0.7)]")
      }
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full opacity-30 blur-2xl"
        style={{ background: "var(--ht-gold)" }}
      />
      <div className="flex items-start justify-between">
        <span
          className={
            "flex size-11 items-center justify-center rounded-xl bg-black/30 ring-1 ring-white/5 " +
            a.icon
          }
        >
          <ModuleIcon name={modulo.icono} className="size-6" />
        </span>
        {isPrincipal && (
          <span className="rounded-full bg-ht-gold px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-ht-bg">
            Principal
          </span>
        )}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-ht-muted">
          {modulo.etiqueta}
        </p>
        <h3 className="mt-0.5 text-base font-extrabold leading-tight text-ht-text">
          {modulo.titulo}
        </h3>
      </div>
    </div>
  );

  if (modulo.tipo === "whatsapp") {
    return (
      <a
        href={modulo.urlWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir ${modulo.titulo} en WhatsApp`}
      >
        {inner}
      </a>
    );
  }

  if (modulo.tipo === "email") {
    const mailto =
      `mailto:${modulo.email}` +
      (modulo.asunto ? `?subject=${encodeURIComponent(modulo.asunto)}` : "");
    return (
      <a href={mailto} aria-label={`Enviar correo a ${modulo.email}`}>
        {inner}
      </a>
    );
  }

  if (modulo.tipo === "especialista") {
    return (
      <Link href="/especialista" aria-label={`Abrir ${modulo.titulo}`}>
        {inner}
      </Link>
    );
  }

  return (
    <Link href={`/modulos/${modulo.slug}`} aria-label={`Abrir ${modulo.titulo}`}>
      {inner}
    </Link>
  );
}
