"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { getLeccionDelDia, type LeccionDia } from "@/lib/leccion-del-dia";

/** Card destacado: la lección recomendada de hoy, con su beneficio. */
export function LeccionDelDia() {
  const [leccion, setLeccion] = useState<LeccionDia | null>(null);

  useEffect(() => {
    setLeccion(getLeccionDelDia());
  }, []);

  if (!leccion) return null;

  return (
    <Link
      href={leccion.href}
      className="card-premium glow-gold group flex items-stretch gap-3 overflow-hidden rounded-3xl p-3 transition active:scale-[0.99]"
    >
      <div className="relative aspect-[256/454] w-24 shrink-0 overflow-hidden rounded-2xl bg-ht-surface ring-1 ring-ht-gold/30">
        {leccion.imagen && (
          <Image
            src={leccion.imagen}
            alt={leccion.titulo}
            fill
            sizes="96px"
            className="object-cover"
          />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/30">
          <span className="flex size-10 items-center justify-center rounded-full bg-ht-gold text-ht-bg">
            <Play className="size-5 fill-ht-bg" />
          </span>
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
        <p className="text-[11px] font-bold uppercase tracking-widest text-ht-gold">
          Tu lección de hoy
        </p>
        <h3 className="mt-0.5 line-clamp-2 font-display text-lg font-bold uppercase leading-tight tracking-wide text-ht-text">
          {leccion.titulo}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-snug text-ht-muted">
          {leccion.gancho}
        </p>
        <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-lg bg-ht-gold px-3 py-1 text-xs font-extrabold text-ht-bg">
          Ver ahora
        </span>
      </div>
    </Link>
  );
}
