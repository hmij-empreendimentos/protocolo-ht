/**
 * Metas diarias del Protocolo HT — el "checklist" gamificado de la home.
 * Cumplir ≥75% marca el día como completado (alimenta la racha y da XP).
 *
 * Cada meta muestra su BENEFICIO directo: el usuario debe entender qué gana
 * y poder imaginar el resultado. Edita los textos libremente.
 * El `id` NO debe cambiarse (es la clave en el historial de localStorage).
 */

export type Meta = {
  id: string;
  label: string;
  /** Beneficio directo y deseable (qué gana hoy / cómo se sentirá). */
  beneficio: string;
  icono: string; // clave del ModuleIcon
  xp: number;
};

export const METAS_DIARIAS: Meta[] = [
  {
    id: "leccion",
    label: "Mira la lección de hoy",
    beneficio: "Cada lección te acerca a tu mejor versión",
    icono: "play",
    xp: 10,
  },
  {
    id: "entrenamiento",
    label: "Activa tu cuerpo hoy",
    beneficio: "Más fuerza, energía y testosterona natural",
    icono: "dumbbell",
    xp: 10,
  },
  {
    id: "hidratacion",
    label: "Bebe 2 litros de agua",
    beneficio: "Mente clara, mejor ánimo y más vitalidad",
    icono: "droplet",
    xp: 10,
  },
  {
    id: "descanso",
    label: "Duerme 7+ horas",
    beneficio: "Tu cuerpo se recupera y rinde al máximo",
    icono: "moon",
    xp: 10,
  },
];

/** Umbral de cumplimiento del día (75%). */
export const META_UMBRAL = 0.75;
