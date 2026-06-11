"use client";

import { Flame, Check, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getLogros,
  getStreak,
  getWeekStatus,
  type DiaSemana,
  type Logro,
} from "@/lib/gamification";
import { ModuleIcon } from "@/components/icons";
import { useProgress } from "./useProgress";

const META_DIAS = 30;

export function StreakCard() {
  const { tick, hydrated } = useProgress();
  const [streak, setStreak] = useState(0);
  const [week, setWeek] = useState<DiaSemana[]>([]);
  const [logros, setLogros] = useState<Logro[]>([]);

  useEffect(() => {
    setStreak(getStreak());
    setWeek(getWeekStatus());
    setLogros(getLogros());
  }, [tick]);

  const pctMeta = Math.min(100, Math.round((streak / META_DIAS) * 100));

  return (
    <section className="card-premium glow-gold overflow-hidden rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-ht-gold">
            Tu racha
          </p>
          <div className="mt-1 flex items-end gap-2">
            <span className="text-5xl font-black leading-none text-ht-text">
              {hydrated ? streak : 0}
            </span>
            <span className="mb-1 text-sm font-semibold text-ht-muted">
              {streak === 1 ? "día" : "días"}
            </span>
          </div>
        </div>
        <Flame
          className={
            "size-14 text-ht-red " + (hydrated && streak > 0 ? "anim-flame" : "opacity-40")
          }
        />
      </div>

      {/* Calendario de la semana */}
      <div className="mt-4 flex items-center justify-between gap-1">
        {(hydrated ? week : Array.from({ length: 7 }, () => null)).map((d, i) => (
          <DayDot key={i} dia={d} />
        ))}
      </div>

      {/* Meta de 30 días */}
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-ht-muted">
          <span>Meta: {META_DIAS} días</span>
          <span>{hydrated ? streak : 0}/{META_DIAS}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-ht-surface-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-ht-gold-deep to-ht-gold transition-[width] duration-500"
            style={{ width: `${hydrated ? pctMeta : 0}%` }}
          />
        </div>
      </div>

      {/* Logros */}
      <div className="mt-5">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-ht-muted">
          Logros
        </p>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {(hydrated ? logros : []).map((l) => (
            <div key={l.id} className="flex w-16 shrink-0 flex-col items-center gap-1 text-center">
              <span
                className={
                  "flex size-12 items-center justify-center rounded-2xl ring-1 transition " +
                  (l.conseguido
                    ? "bg-ht-gold/15 text-ht-gold ring-ht-gold/50 glow-gold"
                    : "bg-ht-surface-2 text-ht-muted ring-border")
                }
              >
                {l.conseguido ? (
                  <ModuleIcon name={l.icono} className="size-6" />
                ) : (
                  <Lock className="size-5" />
                )}
              </span>
              <span className="text-[9px] font-semibold leading-tight text-ht-muted">
                {l.titulo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DayDot({ dia }: { dia: DiaSemana | null }) {
  const base =
    "flex size-9 items-center justify-center rounded-full text-xs font-bold ";
  if (!dia) {
    return <span className={base + "bg-ht-surface-2 text-ht-muted"}>·</span>;
  }
  if (dia.status === "done") {
    return (
      <span className={base + "bg-ht-gold text-ht-bg"}>
        <Check className="size-4" />
      </span>
    );
  }
  if (dia.status === "today") {
    return (
      <span className={base + "bg-ht-surface-2 text-ht-gold ring-2 ring-ht-gold"}>
        {dia.label}
      </span>
    );
  }
  if (dia.status === "future") {
    return <span className={base + "bg-ht-surface-2 text-ht-muted/60"}>{dia.label}</span>;
  }
  // miss
  return <span className={base + "bg-ht-surface-2 text-ht-muted"}>{dia.label}</span>;
}
