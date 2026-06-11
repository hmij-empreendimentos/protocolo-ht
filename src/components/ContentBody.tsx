import { Download, FileText } from "lucide-react";
import { VideoPlayer } from "@/components/VideoPlayer";
import type { Pdf, VideoEmbed } from "@/lib/modulos-conteudo";

type Props = {
  video?: VideoEmbed;
  descripcion?: string;
  pdfs?: Pdf[];
};

/** Cuerpo de contenido genérico: video + texto + descargas. */
export function ContentBody({ video, descripcion, pdfs }: Props) {
  const vacio = !video && !descripcion && (!pdfs || pdfs.length === 0);

  return (
    <div className="flex flex-col gap-5">
      {video && <VideoPlayer video={video} />}

      {descripcion && (
        <p className="text-base leading-relaxed text-ht-text/85">{descripcion}</p>
      )}

      {pdfs && pdfs.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold uppercase tracking-widest text-ht-muted">
            Material para descargar
          </h3>
          {pdfs.map((pdf) => (
            <a
              key={pdf.url}
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-card p-3 ring-1 ring-border transition active:scale-[0.99]"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-ht-surface-2 text-ht-gold">
                <FileText className="size-5" />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ht-text">
                {pdf.titulo}
              </span>
              <Download className="size-5 shrink-0 text-ht-gold" />
            </a>
          ))}
        </div>
      )}

      {vacio && (
        <div className="rounded-2xl bg-card p-6 text-center ring-1 ring-border">
          <p className="text-sm text-ht-muted">
            El contenido de este módulo estará disponible muy pronto.
          </p>
        </div>
      )}
    </div>
  );
}
