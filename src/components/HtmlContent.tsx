"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Incrusta una página HTML del módulo (de `public/contenido/...`) en un iframe
 * aislado, ajustando la altura automáticamente al contenido. Como es mismo
 * origen, podemos leer el alto real y reaccionar a acordeones que se expanden.
 */
export function HtmlContent({ src }: { src: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(600);

  const onLoad = useCallback(() => {
    const win = ref.current?.contentWindow;
    const doc = win?.document;
    if (!win || !doc) return;

    const measure = () =>
      setHeight(
        Math.max(
          doc.documentElement.scrollHeight,
          doc.body?.scrollHeight ?? 0,
        ) + 16,
      );

    measure();

    // Reacciona a cambios de tamaño (acordeones, imágenes, etc.)
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

    // Por si algún <details> tarda en animar
    doc.addEventListener("click", () => {
      window.setTimeout(measure, 350);
    });
  }, []);

  return (
    <iframe
      ref={ref}
      src={src}
      onLoad={onLoad}
      title="Contenido del módulo"
      className="w-full overflow-hidden rounded-2xl ring-1 ring-border"
      style={{ height, border: 0 }}
      scrolling="no"
    />
  );
}
