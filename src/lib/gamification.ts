/**
 * Motor de gamificación del Protocolo HT (100% client-side, sin backend).
 *
 * Persistencia (localStorage):
 *  - `ht-habits-history` → historial de metas diarias por fecha
 *  - `ht-visited-subs`   → submódulos visitados (lo escribe NavTracker)
 *
 * El XP y el nivel son DERIVADOS (se calculan a partir del historial y de las
 * visitas), así que nunca se desincronizan ni se duplican al marcar/desmarcar.
 */

import { METAS_DIARIAS, META_UMBRAL } from "./metas";

const HISTORY_KEY = "ht-habits-history";
const VISITS_KEY = "ht-visited-subs";

/** Evento global para que el dashboard se refresque al marcar una meta. */
export const PROGRESS_EVENT = "ht-progress";

export function emitProgress() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  }
}

const XP_POR_META = 10;
const XP_DIA_COMPLETO = 25;
const XP_POR_SUBMODULO = 15;
const XP_POR_NIVEL = 100;

export type DiaMetas = {
  metas: Record<string, boolean>;
  completed: boolean;
};

export type History = Record<string, DiaMetas>;

/* ---------- Fechas ---------- */

export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDaysKey(base: Date, delta: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + delta);
  return todayKey(d);
}

/* ---------- Lectura / escritura ---------- */

function readHistory(): History {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as History) : {};
  } catch {
    return {};
  }
}

function writeHistory(h: History) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
  } catch {
    // ignore
  }
}

function countVisitedSubs(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(VISITS_KEY);
    if (!raw) return 0;
    const visits = JSON.parse(raw) as Record<string, string[]>;
    return Object.values(visits).reduce((sum, arr) => sum + arr.length, 0);
  } catch {
    return 0;
  }
}

/* ---------- Metas del día ---------- */

function computeCompleted(metas: Record<string, boolean>): boolean {
  const total = METAS_DIARIAS.length;
  const done = METAS_DIARIAS.filter((m) => metas[m.id]).length;
  return total > 0 && done / total >= META_UMBRAL;
}

export function getTodayMetas(): Record<string, boolean> {
  const h = readHistory();
  return h[todayKey()]?.metas ?? {};
}

export type ProgresoHoy = {
  done: number;
  total: number;
  pct: number;
  completed: boolean;
};

export function getTodayProgress(metas?: Record<string, boolean>): ProgresoHoy {
  const m = metas ?? getTodayMetas();
  const total = METAS_DIARIAS.length;
  const done = METAS_DIARIAS.filter((x) => m[x.id]).length;
  return {
    done,
    total,
    pct: total > 0 ? Math.round((done / total) * 100) : 0,
    completed: computeCompleted(m),
  };
}

/** Alterna una meta del día de hoy y persiste. Devuelve el nuevo estado. */
export function toggleMeta(id: string): Record<string, boolean> {
  const h = readHistory();
  const key = todayKey();
  const metas = { ...(h[key]?.metas ?? {}) };
  metas[id] = !metas[id];
  h[key] = { metas, completed: computeCompleted(metas) };
  writeHistory(h);
  return metas;
}

/* ---------- Racha ---------- */

export function getStreak(): number {
  const h = readHistory();
  const base = new Date();
  let streak = 0;

  // Hoy cuenta solo si ya está completo.
  if (h[todayKey(base)]?.completed) streak += 1;

  // Retrocede día a día mientras estén completos.
  for (let i = 1; i < 400; i++) {
    const key = addDaysKey(base, -i);
    if (h[key]?.completed) streak += 1;
    else break;
  }
  return streak;
}

/** Total de días completados en todo el historial. */
export function getTotalDiasCompletos(): number {
  const h = readHistory();
  return Object.values(h).filter((d) => d.completed).length;
}

/* ---------- Semana (calendario L–D) ---------- */

export type DiaSemana = {
  label: string;
  key: string;
  status: "done" | "miss" | "today" | "future";
};

export function getWeekStatus(): DiaSemana[] {
  const labels = ["L", "M", "M", "J", "V", "S", "D"];
  const h = readHistory();
  const now = new Date();
  // getDay(): 0=Dom … 6=Sáb. Convertimos a Lunes=0.
  const dowMon = (now.getDay() + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - dowMon);

  const hoy = todayKey(now);

  return labels.map((label, i) => {
    const key = addDaysKey(monday, i);
    let status: DiaSemana["status"];
    if (key === hoy) status = h[key]?.completed ? "done" : "today";
    else if (key > hoy) status = "future";
    else status = h[key]?.completed ? "done" : "miss";
    return { label, key, status };
  });
}

/* ---------- XP y Nivel (derivados) ---------- */

export type NivelInfo = {
  xp: number;
  nivel: number;
  xpEnNivel: number;
  xpParaSubir: number;
  pct: number;
};

export function getXp(): number {
  const h = readHistory();
  let xp = 0;
  for (const dia of Object.values(h)) {
    const marcadas = Object.values(dia.metas).filter(Boolean).length;
    xp += marcadas * XP_POR_META;
    if (dia.completed) xp += XP_DIA_COMPLETO;
  }
  xp += countVisitedSubs() * XP_POR_SUBMODULO;
  return xp;
}

export function getNivelInfo(): NivelInfo {
  const xp = getXp();
  const nivel = Math.floor(xp / XP_POR_NIVEL) + 1;
  const xpEnNivel = xp % XP_POR_NIVEL;
  return {
    xp,
    nivel,
    xpEnNivel,
    xpParaSubir: XP_POR_NIVEL,
    pct: Math.round((xpEnNivel / XP_POR_NIVEL) * 100),
  };
}

/* ---------- Logros / conquistas ---------- */

export type Logro = {
  id: string;
  titulo: string;
  icono: string;
  meta: number;
  actual: number;
  conseguido: boolean;
};

export function getLogros(): Logro[] {
  const streak = getStreak();
  const total = getTotalDiasCompletos();
  const subs = countVisitedSubs();

  const defs: Omit<Logro, "conseguido">[] = [
    { id: "primer-dia", titulo: "Primer día", icono: "flame", meta: 1, actual: total },
    { id: "racha-7", titulo: "7 días de racha", icono: "flame", meta: 7, actual: streak },
    { id: "racha-30", titulo: "30 días de racha", icono: "trophy", meta: 30, actual: streak },
    { id: "racha-100", titulo: "100 días", icono: "trophy", meta: 100, actual: streak },
    { id: "explorador", titulo: "5 lecciones", icono: "play", meta: 5, actual: subs },
  ];

  return defs.map((d) => ({ ...d, conseguido: d.actual >= d.meta }));
}
