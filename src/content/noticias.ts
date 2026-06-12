/**
 * Novedades / noticias mostradas en el carrusel de la home.
 * Edita libremente. `imagen` es opcional: si no hay, se usa un degradado.
 * Para usar una imagen, ponla en `public/noticias/` y referencia `/noticias/archivo.jpg`.
 */

export type Noticia = {
  id: string;
  titulo: string;
  fecha: string; // "2026-06-11"
  resumen: string;
  imagen?: string;
  url?: string; // enlace interno (ej. /modulos/...) o externo
  etiqueta?: string; // ej. "Nuevo", "Consejo"
};

export const NOTICIAS: Noticia[] = [
  {
    id: "rutina-manana",
    titulo: "La rutina de la mañana que lo cambia todo",
    fecha: "2026-06-10",
    resumen:
      "3 hábitos simples al despertar para activar tu energía y tu enfoque durante todo el día.",
    etiqueta: "Consejo",
    imagen: "/noticias/1.png",
    url: "/modulos/codigo-del-hombre",
  },
  {
    id: "modo-acelerado",
    titulo: "Cómo usar el Modo Acelerado sin saltarte lo esencial",
    fecha: "2026-06-08",
    resumen:
      "La guía rápida para ver resultados antes, manteniendo las bases del protocolo.",
    etiqueta: "Nuevo",
    imagen: "/noticias/2.png",
    url: "/modulos/modo-acelerado",
  },
  {
    id: "descanso",
    titulo: "Dormir mejor: tu arma secreta de rendimiento",
    fecha: "2026-06-05",
    resumen:
      "Por qué el descanso es el factor más subestimado para tu transformación.",
    etiqueta: "Salud",
    imagen: "/noticias/3.png",
    url: "/modulos/protocolo-ht",
  },
];

/** Busca una noticia por id (para la página de artículo). */
export function getNoticia(id: string): Noticia | undefined {
  return NOTICIAS.find((n) => n.id === id);
}

/** Ruta HTML del contenido de la noticia. */
export function noticiaHtml(id: string): string {
  return `/contenido/noticias/${id}.html`;
}
