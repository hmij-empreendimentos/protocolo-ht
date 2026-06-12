"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { METAS_DIARIAS } from "@/lib/metas";
import {
  emitProgress,
  getTodayMetas,
  getTodayProgress,
  toggleMeta,
  type ProgresoHoy,
} from "@/lib/gamification";
import { ModuleIcon } from "@/components/icons";
import { confettiBurst, floatToast } from "@/components/celebrate";
import { ProgressRing } from "./ProgressRing";

export function DailyGoals() {
  const [metas, setMetas] = useState<Record<string, boolean>>({});
  const [progreso, setProgreso] = useState<ProgresoHoy>({
    done: 0,
    total: METAS_DIARIAS.length,
    pct: 0,
    completed: false,
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const m = getTodayMetas();
    setMetas(m);
    setProgreso(getTodayProgress(m));
    setHydrated(true);
  }, []);

  function onToggle(id: string) {
    const wasCompleted = progreso.completed;
    const next = toggleMeta(id);
    const nextProgreso = getTodayProgress(next);
    setMetas(next);
    setProgreso(nextProgreso);
    emitProgress();

    // Dopamina: celebra el día completo; si no, muestra el XP ganado.
    if (!wasCompleted && nextProgreso.completed) {
      confettiBurst();
      floatToast("🔥 ¡Día completado! +25 XP", { grande: true });
    } else if (next[id]) {
      const meta = METAS_DIARIAS.find((m) => m.id === id);
      floatToast(`+${meta?.xp ?? 10} XP`);
    }
  }

  const ringColor = progreso.completed ? "var(--ht-green)" : "var(--ht-gold)";

  return (
    <section
      className={
        "card-premium rounded-3xl p-5 transition " +
        (progreso.completed ? "glow-green" : "")
      }
    >
      <div className="flex items-center gap-4">
        <ProgressRing pct={hydrated ? progreso.pct : 0} color={ringColor} size={78}>
          <span className="font-display text-2xl font-bold leading-none tabular-nums text-ht-text">
            {hydrated ? progreso.done : 0}
            <span className="text-ht-muted">/{progreso.total}</span>
          </span>
          <span className="text-[9px] uppercase tracking-wider text-ht-muted">metas</span>
        </ProgressRing>

        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-extrabold text-ht-text">Metas de hoy</h2>
          {progreso.completed ? (
            <p className="anim-pop text-sm font-bold text-ht-green">
              ✅ ¡Día completado! Sigue así 🔥
            </p>
          ) : (
            <p className="text-sm text-ht-muted">
              Cumple tus metas y mantén tu racha viva.
            </p>
          )}
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {METAS_DIARIAS.map((meta) => {
          const marcada = !!metas[meta.id];
          return (
            <li key={meta.id}>
              <button
                type="button"
                onClick={() => onToggle(meta.id)}
                aria-pressed={marcada}
                className={
                  "flex w-full items-center gap-3 rounded-2xl p-3 text-left ring-1 transition active:scale-[0.99] " +
                  (marcada
                    ? "bg-ht-green/10 ring-ht-green/40"
                    : "bg-ht-bg/40 ring-border hover:ring-ht-gold/30")
                }
              >
                <span
                  className={
                    "flex size-10 shrink-0 items-center justify-center rounded-xl transition " +
                    (marcada ? "bg-ht-green text-ht-bg" : "bg-ht-surface-2 text-ht-gold")
                  }
                >
                  {marcada ? (
                    <Check className="size-5 anim-pop" />
                  ) : (
                    <ModuleIcon name={meta.icono} className="size-5" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={
                      "block text-sm font-bold " +
                      (marcada
                        ? "text-ht-text line-through decoration-ht-green/60"
                        : "text-ht-text")
                    }
                  >
                    {meta.label}
                  </span>
                  <span className="block text-[11px] leading-snug text-ht-muted">
                    {meta.beneficio}
                  </span>
                </span>
                <span className="shrink-0 self-start rounded-full bg-ht-gold/10 px-2 py-0.5 text-[10px] font-extrabold text-ht-gold">
                  +{meta.xp} XP
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
