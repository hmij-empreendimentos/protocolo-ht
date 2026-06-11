"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { readVisits, type Visits } from "@/components/NavTracker";
import { MODULOS, type Modulo } from "@/lib/modulos-conteudo";
import { ModuleIcon } from "./icons";

type Progress = {
  done: number;
  total: number;
  pct: number;
  isStarted: boolean;
  isComplete: boolean;
  hasProgress: boolean;
};

function computeProgress(modulo: Modulo, visits: Visits): Progress {
  if (
    modulo.tipo === "contenido" &&
    modulo.submodulos &&
    modulo.submodulos.length > 0
  ) {
    const visited = visits[modulo.slug] ?? [];
    const validVisited = visited.filter((sub) =>
      modulo.submodulos!.some((s) => s.slug === sub),
    );
    const done = validVisited.length;
    const total = modulo.submodulos.length;
    return {
      done,
      total,
      pct: total > 0 ? Math.round((done / total) * 100) : 0,
      isStarted: done > 0,
      isComplete: done >= total,
      hasProgress: true,
    };
  }

  if (modulo.tipo === "contenido") {
    const visited = visits[modulo.slug] ?? [];
    const done = visited.length > 0 ? 1 : 0;
    return {
      done,
      total: 1,
      pct: done * 100,
      isStarted: done > 0,
      isComplete: done === 1,
      hasProgress: true,
    };
  }

  // especialista / whatsapp / email: acceso directo, sin progreso
  return {
    done: 0,
    total: 0,
    pct: 0,
    isStarted: false,
    isComplete: false,
    hasProgress: false,
  };
}

function getHref(modulo: Modulo): string {
  switch (modulo.tipo) {
    case "contenido":
      return `/modulos/${modulo.slug}`;
    case "especialista":
      return "/especialista";
    case "whatsapp":
      return modulo.urlWhatsapp;
    case "email":
      return `mailto:${modulo.email}${modulo.asunto ? `?subject=${encodeURIComponent(modulo.asunto)}` : ""}`;
  }
}

function StatusPill({ progress }: { progress: Progress }) {
  if (!progress.hasProgress) {
    return (
      <span className="rounded-full bg-ht-surface-2 px-2.5 py-0.5 text-[11px] font-semibold text-ht-gold">
        Acceso directo
      </span>
    );
  }
  if (progress.isComplete) {
    return (
      <span className="rounded-full bg-ht-gold px-2.5 py-0.5 text-[11px] font-bold text-ht-bg">
        Completado
      </span>
    );
  }
  if (progress.isStarted) {
    return (
      <span className="rounded-full bg-ht-gold/20 px-2.5 py-0.5 text-[11px] font-semibold text-ht-gold">
        En curso · {progress.pct}%
      </span>
    );
  }
  return (
    <span className="rounded-full bg-ht-surface-2 px-2.5 py-0.5 text-[11px] font-semibold text-ht-muted">
      No iniciado
    </span>
  );
}

function ModuloRow({ modulo }: { modulo: Modulo }) {
  const [visits, setVisits] = useState<Visits>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setVisits(readVisits());
    setHydrated(true);
  }, []);

  const progress = hydrated
    ? computeProgress(modulo, visits)
    : computeProgress(modulo, {});
  const href = getHref(modulo);
  const isExternal = modulo.tipo === "whatsapp" || modulo.tipo === "email";
  const isPrincipal = modulo.badge === "principal";
  const imagen = "imagen" in modulo ? modulo.imagen : undefined;

  const content = (
    <>
      <div
        className={
          "relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ht-bg ring-1 " +
          (isPrincipal ? "ring-ht-gold/50" : "ring-border")
        }
      >
        {imagen ? (
          <Image
            src={imagen}
            alt={modulo.titulo}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <ModuleIcon
            name={modulo.icono}
            className={isPrincipal ? "size-7 text-ht-gold" : "size-7 text-ht-muted"}
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold leading-tight text-ht-text sm:text-base">
            {modulo.titulo}
          </h3>
          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-ht-muted">
            {isPrincipal ? "Producto principal" : modulo.etiqueta}
          </p>
        </div>

        {hydrated && progress.hasProgress && (
          <>
            <div className="relative h-1.5 overflow-hidden rounded-full bg-ht-surface-2">
              <div
                className={
                  "absolute inset-y-0 left-0 rounded-full transition-[width] duration-300 " +
                  (progress.isComplete ? "bg-ht-gold" : "bg-ht-gold/70")
                }
                style={{ width: `${progress.pct}%` }}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <StatusPill progress={progress} />
              <span className="text-[10px] text-ht-muted">
                {progress.done}/{progress.total}
              </span>
            </div>
          </>
        )}

        {hydrated && !progress.hasProgress && (
          <div className="flex items-center">
            <StatusPill progress={progress} />
          </div>
        )}
      </div>
      <ChevronRight className="size-5 shrink-0 self-center text-ht-gold" />
    </>
  );

  const baseClass =
    "flex items-stretch gap-3 rounded-2xl bg-card p-3 ring-1 ring-border shadow-sm transition active:scale-[0.99] " +
    (isPrincipal ? "ring-ht-gold/40" : "");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClass}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClass}>
      {content}
    </Link>
  );
}

export function ModulosList() {
  return (
    <ul className="flex flex-col gap-3">
      {MODULOS.map((modulo) => (
        <li key={modulo.slug}>
          <ModuloRow modulo={modulo} />
        </li>
      ))}
    </ul>
  );
}
