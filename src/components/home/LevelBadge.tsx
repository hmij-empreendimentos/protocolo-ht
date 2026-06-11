"use client";

import { Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { getNivelInfo, getStreak, type NivelInfo } from "@/lib/gamification";
import { useProgress } from "./useProgress";

/** Chip de Nivel + barra de XP + racha, para el header de la home. */
export function LevelBadge() {
  const { tick, hydrated } = useProgress();
  const [info, setInfo] = useState<NivelInfo | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setInfo(getNivelInfo());
    setStreak(getStreak());
  }, [tick]);

  if (!hydrated || !info) {
    // Placeholder estable para evitar salto de layout
    return <div className="h-10 w-32" aria-hidden />;
  }

  return (
    <div className="flex items-center gap-2">
      {/* Nivel + XP */}
      <div className="flex items-center gap-2 rounded-full bg-ht-surface px-3 py-1.5 ring-1 ring-ht-gold/30">
        <span className="flex size-7 items-center justify-center rounded-full bg-ht-gold text-xs font-black text-ht-bg">
          {info.nivel}
        </span>
        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase leading-none tracking-wider text-ht-muted">
            Nivel
          </span>
          <div className="mt-0.5 h-1.5 w-16 overflow-hidden rounded-full bg-ht-surface-2">
            <div
              className="h-full rounded-full bg-ht-gold transition-[width] duration-500"
              style={{ width: `${info.pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Racha */}
      <div className="flex items-center gap-1 rounded-full bg-ht-surface px-3 py-1.5 ring-1 ring-ht-red/30">
        <Flame className={"size-5 text-ht-red " + (streak > 0 ? "anim-flame" : "")} />
        <span className="text-sm font-black text-ht-text">{streak}</span>
      </div>
    </div>
  );
}
