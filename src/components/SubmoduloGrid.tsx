"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { readVisits } from "@/components/NavTracker";
import { ModuleIcon } from "@/components/icons";
import type { Submodulo } from "@/lib/modulos-conteudo";

type Props = {
  slug: string;
  submodulos: Submodulo[];
};

/** Grilla de pósters (estilo Netflix) de los submódulos de un producto. */
export function SubmoduloGrid({ slug, submodulos }: Props) {
  const [visitados, setVisitados] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const visits = readVisits();
    setVisitados(visits[slug] ?? []);
    setHydrated(true);
  }, [slug]);

  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-5">
      {submodulos.map((sub, i) => {
        const visto = hydrated && visitados.includes(sub.slug);
        return (
          <li key={sub.slug}>
            <Link
              href={`/modulos/${slug}/${sub.slug}`}
              className="group block"
              aria-label={`Parte ${i + 1}: ${sub.titulo}`}
            >
              <div
                className={
                  "relative aspect-square overflow-hidden rounded-2xl bg-ht-surface ring-1 transition active:scale-[0.97] " +
                  (visto
                    ? "ring-ht-gold/60 shadow-[0_10px_28px_-14px_rgba(212,175,55,0.5)]"
                    : "ring-border shadow-[0_8px_22px_-14px_rgba(0,0,0,0.7)]")
                }
              >
                {sub.imagen ? (
                  <Image
                    src={sub.imagen}
                    alt={sub.titulo}
                    fill
                    sizes="(max-width: 640px) 50vw, 240px"
                    className="object-cover transition-transform duration-500 group-active:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-ht-gold">
                    <ModuleIcon name={sub.icono ?? "play"} className="size-10" />
                  </div>
                )}

                {/* Viñeta inferior para dar profundidad */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Número de parte */}
                <span className="absolute left-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-ht-gold backdrop-blur-sm">
                  Parte {i + 1}
                </span>

                {/* Estado: visto (check dorado) o botón play al tocar */}
                {visto ? (
                  <span className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-ht-gold text-ht-bg shadow">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                ) : (
                  <span className="absolute bottom-2 right-2 flex size-9 items-center justify-center rounded-full bg-ht-gold/90 text-ht-bg opacity-0 transition group-active:opacity-100">
                    <Play className="size-4 fill-ht-bg" />
                  </span>
                )}
              </div>

              <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-ht-muted">
                Parte {i + 1}
                {visto && <span className="ml-1 text-ht-gold">· Visto</span>}
              </p>
              <h3 className="line-clamp-2 text-sm font-bold leading-tight text-ht-text">
                {sub.titulo}
              </h3>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
