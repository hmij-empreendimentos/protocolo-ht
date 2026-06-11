"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { readLastVisited } from "@/components/NavTracker";
import { getModulo, getSubmodulo } from "@/lib/modulos-conteudo";

type Continuar = {
  href: string;
  titulo: string;
  subtitulo: string;
};

function resolver(path: string): Continuar | null {
  const sub = /^\/modulos\/([^/]+)\/([^/]+)\/?$/.exec(path);
  if (sub) {
    const found = getSubmodulo(sub[1], sub[2]);
    if (found) {
      return {
        href: path,
        titulo: found.submodulo.titulo,
        subtitulo: found.modulo.titulo,
      };
    }
  }
  const main = /^\/modulos\/([^/]+)\/?$/.exec(path);
  if (main) {
    const m = getModulo(main[1]);
    if (m) {
      return { href: path, titulo: m.titulo, subtitulo: "Continúa donde lo dejaste" };
    }
  }
  return null;
}

export function ContinueCard() {
  const [cont, setCont] = useState<Continuar | null>(null);

  useEffect(() => {
    const last = readLastVisited();
    if (last) setCont(resolver(last.path));
  }, []);

  if (!cont) return null;

  return (
    <Link
      href={cont.href}
      className="glow-gold flex items-center gap-4 rounded-2xl bg-gradient-to-br from-ht-surface-2 to-ht-bg p-4 ring-1 ring-ht-gold/40 transition active:scale-[0.99]"
    >
      <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-ht-gold text-ht-bg">
        <Play className="size-7 fill-ht-bg" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-widest text-ht-gold">
          Continúa aquí
        </p>
        <h3 className="truncate text-lg font-extrabold text-ht-text">
          {cont.titulo}
        </h3>
        <p className="truncate text-xs text-ht-muted">{cont.subtitulo}</p>
      </div>
    </Link>
  );
}
