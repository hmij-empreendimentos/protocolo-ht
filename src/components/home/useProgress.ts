"use client";

import { useEffect, useState } from "react";
import { PROGRESS_EVENT } from "@/lib/gamification";

/**
 * Hook que entrega un `tick` que cambia cada vez que el progreso se actualiza
 * (al marcar una meta) y un flag `hydrated` para evitar mismatch SSR/cliente.
 * Los componentes recalculan su estado derivado cuando cambia `tick`.
 */
export function useProgress(): { tick: number; hydrated: boolean } {
  const [tick, setTick] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const handler = () => setTick((t) => t + 1);
    window.addEventListener(PROGRESS_EVENT, handler);
    return () => window.removeEventListener(PROGRESS_EVENT, handler);
  }, []);

  return { tick, hydrated };
}
