/**
 * Metas diarias del Protocolo HT — el "checklist" gamificado de la home.
 * Cumplir ≥75% marca el día como completado (alimenta la racha y da XP).
 *
 * Edita los textos/íconos aquí libremente. El `id` NO debe cambiarse
 * (se usa como clave en el historial de localStorage).
 */

export type Meta = {
  id: string;
  label: string;
  icono: string; // clave del ModuleIcon
  xp: number;
};

export const METAS_DIARIAS: Meta[] = [
  { id: "leccion", label: "Mira tu lección de hoy", icono: "play", xp: 10 },
  { id: "entrenamiento", label: "Marca tu entrenamiento", icono: "dumbbell", xp: 10 },
  { id: "hidratacion", label: "Hidrátate bien", icono: "droplet", xp: 10 },
  { id: "descanso", label: "Duerme 7+ horas", icono: "moon", xp: 10 },
];

/** Umbral de cumplimiento del día (75%). */
export const META_UMBRAL = 0.75;
