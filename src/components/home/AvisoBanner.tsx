"use client";

import Link from "next/link";
import { Megaphone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getAvisoActivo } from "@/content/avisos";

export function AvisoBanner() {
  const aviso = getAvisoActivo();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (!aviso) return;
    try {
      setDismissed(localStorage.getItem(`ht-aviso-dismissed-${aviso.id}`) === "1");
    } catch {
      setDismissed(false);
    }
  }, [aviso]);

  if (!aviso || dismissed) return null;

  function close() {
    if (!aviso) return;
    try {
      localStorage.setItem(`ht-aviso-dismissed-${aviso.id}`, "1");
    } catch {
      // ignore
    }
    setDismissed(true);
  }

  return (
    <div className="anim-rise relative overflow-hidden rounded-2xl bg-gradient-to-br from-ht-gold/20 to-ht-surface p-4 ring-1 ring-ht-gold/40">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ht-gold text-ht-bg">
          <Megaphone className="size-5" />
        </span>
        <div className="min-w-0 flex-1 pr-6">
          <h3 className="text-sm font-extrabold text-ht-text">{aviso.titulo}</h3>
          <p className="mt-0.5 text-sm leading-relaxed text-ht-text/80">{aviso.texto}</p>
          {aviso.cta && (
            <Link
              href={aviso.cta.href}
              className="mt-2 inline-flex rounded-lg bg-ht-gold px-3 py-1.5 text-xs font-extrabold text-ht-bg transition active:scale-95"
            >
              {aviso.cta.label}
            </Link>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={close}
        aria-label="Cerrar aviso"
        className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full text-ht-muted transition hover:text-ht-text"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
