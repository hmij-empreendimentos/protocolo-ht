/**
 * "Lección de hoy": cada día destaca una lección real del protocolo (rotando
 * por día del año). Hace el dashboard específico y dinámico — el usuario sabe
 * exactamente qué ver hoy y qué gana con ello.
 */

import { getModulosContenido } from "./modulos-conteudo";

export type LeccionDia = {
  href: string;
  modulo: string;
  titulo: string;
  imagen?: string;
  /** Beneficio/gancho para generar deseo. */
  gancho: string;
};

// Ganchos rotativos (beneficio + futuro imaginado). Se asignan por día.
const GANCHOS = [
  "10 minutos hoy = un cambio que vas a notar esta semana.",
  "Lo que aprendas aquí, tu versión de dentro de 30 días te lo agradece.",
  "Pequeño paso hoy, gran diferencia en tu energía y confianza.",
  "Aplica esto y empieza a sentir el cambio desde mañana.",
  "Este es el detalle que separa al que lo intenta del que lo logra.",
  "Dale play: tu mejor versión se construye una lección a la vez.",
  "Hoy sumas un ladrillo más a tu transformación.",
];

function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86_400_000);
}

/** Lista plana de todas las lecciones (submódulos) con su módulo. */
function todasLasLecciones() {
  const lecciones: { href: string; modulo: string; titulo: string; imagen?: string }[] = [];
  for (const m of getModulosContenido()) {
    for (const s of m.submodulos ?? []) {
      lecciones.push({
        href: `/modulos/${m.slug}/${s.slug}`,
        modulo: m.titulo,
        titulo: s.titulo,
        imagen: s.imagen,
      });
    }
  }
  return lecciones;
}

export function getLeccionDelDia(date: Date = new Date()): LeccionDia | null {
  const lecciones = todasLasLecciones();
  if (lecciones.length === 0) return null;
  const dia = dayOfYear(date);
  const l = lecciones[dia % lecciones.length];
  const gancho = GANCHOS[dia % GANCHOS.length];
  return { ...l, gancho };
}
