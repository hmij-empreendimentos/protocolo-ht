"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Incrusta una página HTML del módulo (de `public/contenido/...`) en un iframe
 * del mismo origen, ajustando la altura al contenido y armonizando su tema al
 * estilo oscuro + dorado del app (inyecta variables CSS de marca).
 */

// Normaliza el tema de los HTML (algunos vienen claros/verdes) a oscuro+dorado.
const THEME_OVERRIDE = `
:root{
  --bg:#0c0c0f !important; --bg2:#121218 !important; --bg3:#17171d !important;
  --card:#17171d !important; --card-2:#1f1f27 !important;
  --text:#f2efe6 !important; --muted:#9a988f !important; --text-muted:#9a988f !important;
  --border:rgba(212,175,55,.14) !important;
  --accent:#d4af37 !important; --accent-2:#e8c46b !important; --accent-dark:#a8801f !important;
  --gold:#d4af37 !important; --gold2:#e8c46b !important;
}
html,body{ background:#0c0c0f !important; color:#f2efe6 !important; }
::selection{ background:rgba(212,175,55,.3); }
a{ color:#e8c46b; }
`;

export function HtmlContent({ src }: { src: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(640);
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback(() => {
    const win = ref.current?.contentWindow;
    const doc = win?.document;
    if (!win || !doc) return;

    // Inyecta el tema de marca.
    try {
      const style = doc.createElement("style");
      style.textContent = THEME_OVERRIDE;
      doc.head.appendChild(style);
    } catch {
      // ignore
    }

    const measure = () =>
      setHeight(
        Math.max(doc.documentElement.scrollHeight, doc.body?.scrollHeight ?? 0) + 16,
      );

    measure();
    setLoaded(true);

    try {
      const RO = (win as unknown as { ResizeObserver?: typeof ResizeObserver })
        .ResizeObserver;
      if (RO) {
        const ro = new RO(() => measure());
        ro.observe(doc.documentElement);
      }
    } catch {
      // ignore
    }

    doc.addEventListener("click", () => window.setTimeout(measure, 350));
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-ht-bg ring-1 ring-border">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-ht-bg">
          <div className="flex flex-col items-center gap-3 text-ht-muted">
            <div className="size-8 animate-spin rounded-full border-2 border-ht-surface-2 border-t-ht-gold" />
            <span className="text-xs">Cargando contenido…</span>
          </div>
        </div>
      )}
      <iframe
        ref={ref}
        src={src}
        onLoad={onLoad}
        title="Contenido del módulo"
        className="w-full"
        style={{ height, border: 0, background: "#0c0c0f" }}
        scrolling="no"
      />
    </div>
  );
}
