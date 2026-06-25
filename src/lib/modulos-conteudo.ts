/**
 * Módulos / cards de la home del webapp PROTOCOLO HT.
 *
 * Tipos de card:
 *  - `contenido`    → módulo con submódulos (cada submódulo es una página HTML)
 *  - `especialista` → abre el chat con el especialista (/especialista)
 *  - `whatsapp`     → abre wa.me/<número>
 *  - `email`        → abre mailto:<email>
 *
 * El contenido real de cada submódulo vive como página HTML en
 * `public/contenido/<slug>/<n>.html` y se muestra incrustado. La imagen de
 * portada de cada submódulo está en `public/modulos/<slug>/<n>.avif`.
 * El arte del card de cada módulo está en `public/cards/`.
 *
 * Para editar títulos de submódulos: cambia el texto en los arreglos `subs(...)`.
 */

// Cuenta Vturb de la marca (Honey Trick Protocol).
const VTURB_ACCOUNT_ID = "58f4d3f5-7980-4750-ad6e-01a7b12b47b1";

export type VturbVideo = {
  provider: "vturb";
  accountId: string;
  videoId: string;
  aspectRatio?: "9:16" | "16:9" | "1:1";
};

/** Helper: arma un VturbVideo con el accountId de la marca. */
export function vturb(
  videoId: string,
  aspectRatio: VturbVideo["aspectRatio"] = "9:16",
): VturbVideo {
  return { provider: "vturb", accountId: VTURB_ACCOUNT_ID, videoId, aspectRatio };
}

export type YouTubeVideo = {
  provider: "youtube";
  videoId: string;
  aspectRatio?: "16:9" | "9:16" | "1:1";
};

export type VideoEmbed = VturbVideo | YouTubeVideo;

export type Pdf = {
  titulo: string;
  url: string;
};

export type Submodulo = {
  slug: string;
  titulo: string;
  descripcion?: string;
  imagen?: string;
  icono?: string;
  /** Página HTML incrustada (contenido del módulo). */
  html?: string;
  video?: VideoEmbed;
  pdfs?: Pdf[];
};

export type Acento = "gold" | "red" | "steel";

export type ModuloContenido = {
  tipo: "contenido";
  slug: string;
  titulo: string;
  etiqueta: string;
  badge: "principal" | "bonus";
  icono: string;
  acento: Acento;
  imagen?: string;
  descripcion?: string;
  html?: string;
  video?: VideoEmbed;
  pdfs?: Pdf[];
  submodulos?: Submodulo[];
};

export type ModuloEspecialista = {
  tipo: "especialista";
  slug: string;
  titulo: string;
  etiqueta: string;
  badge: "bonus";
  icono: string;
  acento: Acento;
  imagen?: string;
  descripcion?: string;
};

export type ModuloWhatsapp = {
  tipo: "whatsapp";
  slug: string;
  titulo: string;
  etiqueta: string;
  badge: "bonus";
  icono: string;
  acento: Acento;
  imagen?: string;
  urlWhatsapp: string;
};

export type ModuloEmail = {
  tipo: "email";
  slug: string;
  titulo: string;
  etiqueta: string;
  badge: "bonus";
  icono: string;
  acento: Acento;
  imagen?: string;
  email: string;
  asunto?: string;
};

export type Modulo =
  | ModuloContenido
  | ModuloEspecialista
  | ModuloWhatsapp
  | ModuloEmail;

/** Construye los submódulos de un módulo a partir de la lista de títulos. */
function subs(slug: string, titulos: string[]): Submodulo[] {
  return titulos.map((titulo, i) => {
    const n = i + 1;
    return {
      slug: `modulo-${n}`,
      titulo,
      imagen: `/modulos/${slug}/${n}.avif`,
      html: `/contenido/${slug}/${n}.html`,
    };
  });
}

// Número de WhatsApp del soporte (Honey Trick Protocol).
const WHATSAPP =
  "https://wa.me/5537991209892?text=Hola%2C%20tengo%20dudas%20sobre%20el%20Honey%20Trick%20Protocol.";

export const MODULOS: Modulo[] = [
  {
    tipo: "contenido",
    slug: "comienza-por-aqui",
    titulo: "Comienza por Aquí",
    etiqueta: "Empieza aquí",
    badge: "bonus",
    icono: "flag",
    acento: "gold",
    imagen: "/cards/comienza-por-aqui.png",
    descripcion:
      "Bienvenido al Protocolo HT. Mira este video antes de comenzar: te explica cómo aprovechar cada módulo y avanzar paso a paso.",
    video: vturb("69dd256fccd7dd53186249a9"),
  },
  {
    tipo: "contenido",
    slug: "protocolo-ht",
    titulo: "Protocolo HT",
    etiqueta: "Producto principal",
    badge: "principal",
    icono: "flame",
    acento: "gold",
    imagen: "/cards/protocolo-ht.png",
    descripcion:
      "Tu protocolo completo paso a paso: recetas, técnicas, entrenamiento, nutrición, descanso y seguimiento.",
    submodulos: subs("protocolo-ht", [
      "Receta Natural",
      "Técnicas y Ejercicios",
      "Técnica de Kegel",
      "Fundamentos de la Fuerza y la Energía",
      "Entrenamiento de Fuerza Guiado",
      "Nutrición para tu Energía",
      "Sueño y Recuperación",
      "Manejo del Estrés",
      "Seguimiento Semanal",
      "Bono: Guía Rápida de Arranque",
    ]),
  },
  {
    tipo: "contenido",
    slug: "modo-acelerado",
    titulo: "Modo Acelerado",
    etiqueta: "Resultados rápidos",
    badge: "bonus",
    icono: "gauge",
    acento: "red",
    imagen: "/cards/modo-acelerado.png",
    descripcion:
      "El camino rápido para ver resultados antes, sin saltarte lo esencial del protocolo.",
    submodulos: subs("modo-acelerado", [
      "Módulo 1",
      "Módulo 2",
      "Módulo 3",
      "Módulo 4",
      "Módulo 5",
      "Módulo 6",
    ]),
  },
  {
    tipo: "contenido",
    slug: "boost-ht",
    titulo: "Boost HT",
    etiqueta: "Potenciador",
    badge: "bonus",
    icono: "trending-up",
    acento: "red",
    imagen: "/cards/boost-ht.png",
    descripcion:
      "Potencia tus resultados: próstata, energía, nutrición inteligente, sueño y cuidado capilar.",
    submodulos: subs("boost-ht", [
      "Power Premium Próstata",
      "Detox Premium Energía",
      "Menú Power Premium",
      "Tónico Capilar Natural",
      "Alimentación Inteligente",
      "Sueño Reparador",
      "Nutrientes y Cabello",
    ]),
  },
  {
    tipo: "contenido",
    slug: "codigo-del-hombre",
    titulo: "Código del Hombre",
    etiqueta: "Mentalidad",
    badge: "bonus",
    icono: "shield",
    acento: "steel",
    imagen: "/cards/codigo-del-hombre.png",
    descripcion:
      "El mapa del hombre: mentalidad, disciplina y postura para sostener tus resultados.",
    submodulos: subs("codigo-del-hombre", [
      "Mapa del Hombre · Parte 1",
      "Mapa del Hombre · Parte 2",
      "Mapa del Hombre · Parte 3",
      "Mapa del Hombre · Parte 4",
      "Mapa del Hombre · Parte 5",
    ]),
  },
  {
    tipo: "contenido",
    slug: "formula-de-la-seduccion",
    titulo: "Fórmula de la Seducción",
    etiqueta: "Relaciones",
    badge: "bonus",
    icono: "flame",
    acento: "red",
    imagen: "/cards/formula-de-la-seduccion.png",
    descripcion:
      "Atracción, comunicación y conexión. Recupera tu poder de seducción.",
    submodulos: subs("formula-de-la-seduccion", [
      "Secretos del Placer",
      "El Poder de la Comunicación",
      "Técnicas de Comunicación Efectiva",
    ]),
  },
  {
    tipo: "especialista",
    slug: "hablar-con-especialista",
    titulo: "Hablar con Especialista",
    etiqueta: "Soporte experto",
    badge: "bonus",
    icono: "message-circle",
    acento: "gold",
    imagen: "/cards/hablar-con-especialista.png",
    descripcion:
      "Habla con nuestro especialista y resuelve tus dudas sobre el protocolo de forma directa.",
  },
  {
    tipo: "whatsapp",
    slug: "soporte-whatsapp",
    titulo: "Soporte por WhatsApp",
    etiqueta: "WhatsApp",
    badge: "bonus",
    icono: "whatsapp",
    acento: "gold",
    imagen: "/cards/soporte-whatsapp.png",
    urlWhatsapp: WHATSAPP,
  },
  {
    tipo: "email",
    slug: "correo-soporte",
    titulo: "Correo de Soporte",
    etiqueta: "Correo",
    badge: "bonus",
    icono: "mail",
    acento: "steel",
    imagen: "/cards/correo-soporte.png",
    email: "soporte@protocoloht.com", // TODO: email real del cliente
    asunto: "Soporte - Protocolo HT",
  },
];

/** Lookup por slug. */
export function getModulo(slug: string): Modulo | undefined {
  return MODULOS.find((m) => m.slug === slug);
}

/** Lookup de un submódulo dentro de un módulo. */
export function getSubmodulo(
  slug: string,
  sub: string,
): { modulo: ModuloContenido; submodulo: Submodulo } | undefined {
  const modulo = MODULOS.find(
    (m): m is ModuloContenido => m.tipo === "contenido" && m.slug === slug,
  );
  if (!modulo?.submodulos) return undefined;
  const submodulo = modulo.submodulos.find((s) => s.slug === sub);
  if (!submodulo) return undefined;
  return { modulo, submodulo };
}

/** Solo los módulos de contenido. */
export function getModulosContenido(): ModuloContenido[] {
  return MODULOS.filter((m): m is ModuloContenido => m.tipo === "contenido");
}
