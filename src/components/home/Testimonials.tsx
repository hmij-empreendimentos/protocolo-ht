import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { DEPOIMENTOS, type Depoimento } from "@/content/depoimentos";

function iniciales(nombre: string): string {
  return nombre
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={
            "size-3.5 " +
            (i < n ? "fill-ht-gold text-ht-gold" : "fill-ht-surface-2 text-ht-surface-2")
          }
        />
      ))}
    </div>
  );
}

function DepoCard({ depo }: { depo: Depoimento }) {
  const sub = [depo.edad ? `${depo.edad} años` : null, depo.ciudad]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="card-premium flex w-72 shrink-0 flex-col gap-3 rounded-2xl p-4">
      <Quote className="size-6 text-ht-gold/50" />
      <p className="text-sm leading-relaxed text-ht-text/90">“{depo.texto}”</p>
      <div className="mt-auto flex items-center gap-3 pt-2">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-ht-gold/15 ring-1 ring-ht-gold/40">
          {depo.foto ? (
            <Image src={depo.foto} alt={depo.nombre} fill sizes="44px" className="object-cover" />
          ) : (
            <span className="flex size-full items-center justify-center text-sm font-black text-ht-gold">
              {iniciales(depo.nombre)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold text-ht-text">{depo.nombre}</p>
          {sub && <p className="truncate text-[11px] text-ht-muted">{sub}</p>}
        </div>
        <Stars n={depo.estrellas} />
      </div>
    </div>
  );
}

export function Testimonials() {
  if (DEPOIMENTOS.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-ht-muted">
        Lo que dicen
      </h2>
      <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 no-scrollbar">
        {DEPOIMENTOS.map((d) => (
          <DepoCard key={d.id} depo={d} />
        ))}
      </div>
    </section>
  );
}
