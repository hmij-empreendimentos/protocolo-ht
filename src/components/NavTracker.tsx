"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NAV_KEY = "ht-last-visited";
const VISITS_KEY = "ht-visited-subs";

export type LastVisited = {
  path: string;
  ts: number;
};

export type Visits = Record<string, string[]>;

function readVisitsRaw(): Visits {
  try {
    const raw = localStorage.getItem(VISITS_KEY);
    return raw ? (JSON.parse(raw) as Visits) : {};
  } catch {
    return {};
  }
}

function recordVisit(slug: string, sub: string) {
  try {
    const visits = readVisitsRaw();
    const arr = visits[slug] ?? [];
    if (!arr.includes(sub)) {
      visits[slug] = [...arr, sub];
      localStorage.setItem(VISITS_KEY, JSON.stringify(visits));
    }
  } catch {
    // ignore
  }
}

/**
 * Componente invisible que persiste el último path visitado y registra
 * qué submódulos fueron explorados, para que la Home muestre
 * "Continúa aquí" y /modulos calcule el progreso por módulo.
 */
export function NavTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const isModuloSub = /^\/modulos\/([^/]+)\/([^/]+)\/?$/.exec(pathname);
    const isModuloMain = /^\/modulos\/([^/]+)\/?$/.exec(pathname);

    if (isModuloSub) {
      const [, slug, sub] = isModuloSub;
      recordVisit(slug, sub);
    } else if (isModuloMain) {
      // Para módulos sin submódulos, registramos la visita con "_" como sub.
      const [, slug] = isModuloMain;
      recordVisit(slug, "_");
    }

    if (isModuloSub || isModuloMain) {
      try {
        const data: LastVisited = { path: pathname, ts: Date.now() };
        localStorage.setItem(NAV_KEY, JSON.stringify(data));
      } catch {
        // ignore
      }
    }
  }, [pathname]);

  return null;
}

export function readLastVisited(): LastVisited | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(NAV_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LastVisited;
  } catch {
    return null;
  }
}

export function readVisits(): Visits {
  if (typeof window === "undefined") return {};
  return readVisitsRaw();
}
