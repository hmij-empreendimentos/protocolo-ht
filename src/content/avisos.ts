/**
 * Avisos / comunicados destacados en la home (banner dorado dispensable).
 * Edita libremente. Pon `activo: false` para ocultar uno sin borrarlo.
 * El primer aviso `activo` es el que se muestra.
 */

export type Aviso = {
  id: string;
  titulo: string;
  texto: string;
  cta?: { label: string; href: string };
  activo: boolean;
};

export const AVISOS: Aviso[] = [
  {
    id: "bienvenida",
    titulo: "¡Bienvenido al Protocolo HT!",
    texto:
      "Empieza por el módulo «Comienza por Aquí» y avanza un paso cada día. Tu transformación arranca hoy.",
    cta: { label: "Comenzar ahora", href: "/modulos/comienza-por-aqui" },
    activo: true,
  },
  {
    id: "novedad-boost",
    titulo: "Nuevo: Boost HT disponible",
    texto:
      "Ya puedes acceder al módulo Boost HT para potenciar tus resultados. Échale un vistazo.",
    cta: { label: "Ver Boost HT", href: "/modulos/boost-ht" },
    activo: false,
  },
];

export function getAvisoActivo(): Aviso | undefined {
  return AVISOS.find((a) => a.activo);
}
