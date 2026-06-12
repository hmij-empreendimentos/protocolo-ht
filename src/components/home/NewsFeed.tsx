import Image from "next/image";
import Link from "next/link";
import { NOTICIAS, type Noticia } from "@/content/noticias";

function formatFecha(iso: string): string {
  const meses = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic",
  ];
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${meses[m - 1]} ${y}`;
}

function NoticiaCard({ noticia }: { noticia: Noticia }) {
  const inner = (
    <div className="flex w-64 shrink-0 flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border transition active:scale-[0.98]">
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-ht-surface-2 to-ht-bg">
        {noticia.imagen ? (
          <Image
            src={noticia.imagen}
            alt={noticia.titulo}
            fill
            sizes="256px"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute -right-6 -top-6 size-24 rounded-full opacity-25 blur-2xl"
            style={{ background: "var(--ht-gold)" }}
          />
        )}
        {noticia.etiqueta && (
          <span className="absolute left-2 top-2 rounded-full bg-ht-gold px-2 py-0.5 text-[10px] font-extrabold uppercase text-ht-bg">
            {noticia.etiqueta}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ht-muted">
          {formatFecha(noticia.fecha)}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-extrabold leading-tight text-ht-text">
          {noticia.titulo}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ht-muted">
          {noticia.resumen}
        </p>
      </div>
    </div>
  );

  if (noticia.url) {
    return <Link href={noticia.url}>{inner}</Link>;
  }
  return inner;
}

export function NewsFeed() {
  if (NOTICIAS.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-ht-muted">
        Novedades
      </h2>
      <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 no-scrollbar">
        {NOTICIAS.map((n) => (
          <NoticiaCard key={n.id} noticia={n} />
        ))}
      </div>
    </section>
  );
}
