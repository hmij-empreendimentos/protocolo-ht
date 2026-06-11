/**
 * Módulos / cards de la home del webapp PROTOCOLO HT.
 *
 * Tipos de card:
 *  - `contenido`  → módulo con video + PDFs (navega a /modulos/[slug])
 *  - `whatsapp`   → abre wa.me/<número> en nueva pestaña
 *  - `email`      → abre mailto:<email>
 *  - `especialista` → abre el chat con el especialista (/especialista)
 *
 * Si un módulo `contenido` tiene `submodulos`, la página de [slug] muestra
 * la lista de submódulos en lugar del contenido directo.
 *
 * NOTA: el contenido real (IDs de video Vturb/YouTube, descripciones y PDFs)
 * lo proporciona el cliente. Los marcados con `// TODO` son placeholders.
 */

const VTURB_ACCOUNT_ID = "TODO-ACCOUNT-ID";

export type VturbVideo = {
  provider: "vturb";
  accountId: string;
  videoId: string;
  aspectRatio?: "9:16" | "16:9" | "1:1";
};

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
  /** Imagen de portada opcional. Si no hay, se usa el card con degradado + ícono. */
  imagen?: string;
  /** Clave del ícono Lucide (ver iconMap en ModuloCard). */
  icono?: string;
  video?: VideoEmbed;
  pdfs?: Pdf[];
};

/** Tono de acento del card (controla el degradado y el resplandor). */
export type Acento = "gold" | "red" | "steel";

export type ModuloContenido = {
  tipo: "contenido";
  slug: string;
  titulo: string;
  /** Etiqueta corta mostrada bajo el título. */
  etiqueta: string;
  badge: "principal" | "bonus";
  icono: string;
  acento: Acento;
  /** Imagen de portada opcional (si el cliente sube el arte del card). */
  imagen?: string;
  descripcion?: string;
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
  email: string;
  asunto?: string;
};

export type Modulo =
  | ModuloContenido
  | ModuloEspecialista
  | ModuloWhatsapp
  | ModuloEmail;

/** Helper: construye un VturbVideo con el accountId de la marca. */
export function vturb(
  videoId: string,
  aspectRatio: VturbVideo["aspectRatio"] = "9:16",
): VturbVideo {
  return { provider: "vturb", accountId: VTURB_ACCOUNT_ID, videoId, aspectRatio };
}

export const MODULOS: Modulo[] = [
  {
    tipo: "contenido",
    slug: "comienza-por-aqui",
    titulo: "Comienza por Aquí",
    etiqueta: "Empieza aquí",
    badge: "bonus",
    icono: "flag",
    acento: "gold",
    descripcion:
      "Bienvenido al Protocolo HT. Mira este video corto antes de comenzar: te explicamos cómo usar el app y aprovechar cada módulo.",
    // video: vturb("TODO-VIDEO-ID"),
  },
  {
    tipo: "contenido",
    slug: "protocolo-ht",
    titulo: "Protocolo HT",
    etiqueta: "Producto principal",
    badge: "principal",
    icono: "flame",
    acento: "gold",
    descripcion:
      "El protocolo completo paso a paso. Aquí está el método central para transformar tu rendimiento.",
    submodulos: [
      {
        slug: "introduccion",
        titulo: "Introducción al Protocolo",
        icono: "play",
        descripcion: "Qué es el Protocolo HT y cómo funciona.",
      },
      {
        slug: "fase-1",
        titulo: "Fase 1: Fundamentos",
        icono: "layers",
        descripcion: "La base sobre la que se construye todo.",
      },
      {
        slug: "fase-2",
        titulo: "Fase 2: Activación",
        icono: "zap",
        descripcion: "Pon el protocolo en marcha.",
      },
      {
        slug: "fase-3",
        titulo: "Fase 3: Consolidación",
        icono: "trophy",
        descripcion: "Mantén y consolida los resultados.",
      },
    ],
  },
  {
    tipo: "contenido",
    slug: "modo-acelerado",
    titulo: "Modo Acelerado",
    etiqueta: "Resultados rápidos",
    badge: "bonus",
    icono: "gauge",
    acento: "red",
    descripcion:
      "El atajo para quienes quieren ver resultados lo antes posible, sin saltarse lo esencial.",
    // video: vturb("TODO-VIDEO-ID"),
  },
  {
    tipo: "contenido",
    slug: "boost-ht",
    titulo: "Boost HT",
    etiqueta: "Potenciador",
    badge: "bonus",
    icono: "trending-up",
    acento: "red",
    descripcion:
      "Lleva tus resultados al siguiente nivel con estrategias avanzadas de potenciación.",
    // video: vturb("TODO-VIDEO-ID"),
  },
  {
    tipo: "contenido",
    slug: "codigo-del-hombre",
    titulo: "Código del Hombre",
    etiqueta: "Mentalidad",
    badge: "bonus",
    icono: "shield",
    acento: "steel",
    descripcion:
      "Mentalidad, disciplina y postura. El código que separa al hombre común del hombre de resultados.",
    // video: vturb("TODO-VIDEO-ID"),
  },
  {
    tipo: "contenido",
    slug: "formula-de-la-seduccion",
    titulo: "Fórmula de la Seducción",
    etiqueta: "Relaciones",
    badge: "bonus",
    icono: "flame",
    acento: "red",
    descripcion:
      "Atracción, confianza y conexión. La fórmula para recuperar tu poder de seducción.",
    // video: vturb("TODO-VIDEO-ID"),
  },
  {
    tipo: "especialista",
    slug: "hablar-con-especialista",
    titulo: "Hablar con Especialista",
    etiqueta: "Soporte experto",
    badge: "bonus",
    icono: "message-circle",
    acento: "gold",
    descripcion:
      "Habla con nuestro especialista. Resuelve tus dudas sobre el protocolo de forma directa.",
  },
  {
    tipo: "whatsapp",
    slug: "soporte-whatsapp",
    titulo: "Soporte por WhatsApp",
    etiqueta: "WhatsApp",
    badge: "bonus",
    icono: "whatsapp",
    acento: "gold",
    urlWhatsapp:
      "https://wa.me/0000000000?text=Hola%2C%20tengo%20una%20duda%20sobre%20el%20Protocolo%20HT.", // TODO: número real
  },
  {
    tipo: "email",
    slug: "correo-soporte",
    titulo: "Correo de Soporte",
    etiqueta: "Correo",
    badge: "bonus",
    icono: "mail",
    acento: "steel",
    email: "soporte@protocoloht.com", // TODO: email real
    asunto: "Soporte - Protocolo HT",
  },
];

/** Lookup por slug, para las páginas dinámicas. */
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
