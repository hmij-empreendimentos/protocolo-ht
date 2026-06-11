"use client";

import { useEffect, useState } from "react";
import { Check, Pencil } from "lucide-react";
import { getUserName, setUserName } from "@/lib/onboarding";

const FRASES = [
  "Hoy es un buen día para avanzar.",
  "La disciplina vence a la motivación.",
  "Un paso a la vez. Pero todos los días.",
  "Tu mejor versión se construye hoy.",
  "Constancia hoy, resultados mañana.",
  "El hombre que eres se forja en lo diario.",
  "Pequeñas acciones, grandes cambios.",
];

function saludoPorHora(): string {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

export function Greeting() {
  const [name, setName] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const n = getUserName();
    setName(n);
    setHydrated(true);
    if (!n) setEditing(true);
  }, []);

  // Frase estable durante el día (no cambia en cada render).
  const frase = FRASES[new Date().getDate() % FRASES.length];

  function save() {
    const clean = draft.trim();
    if (!clean) {
      setEditing(false);
      return;
    }
    setUserName(clean);
    setName(clean);
    setEditing(false);
  }

  return (
    <div>
      <p className="text-sm font-medium text-ht-muted">{saludoPorHora()}</p>

      {hydrated && editing ? (
        <div className="mt-1 flex items-center gap-2">
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            placeholder="¿Cómo te llamas?"
            className="min-w-0 flex-1 rounded-xl border border-border bg-ht-surface px-3 py-2 text-lg font-bold text-ht-text placeholder:font-normal placeholder:text-ht-muted focus:border-ht-gold focus:outline-none"
            maxLength={24}
          />
          <button
            type="button"
            onClick={save}
            aria-label="Guardar nombre"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ht-gold text-ht-bg transition active:scale-95"
          >
            <Check className="size-5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setDraft(name ?? "");
            setEditing(true);
          }}
          className="group mt-0.5 flex items-center gap-2 text-left"
        >
          <h1 className="text-2xl font-extrabold leading-tight text-ht-text">
            {name ? (
              <>
                Hola, <span className="text-gold-gradient">{name}</span>
              </>
            ) : (
              "Bienvenido"
            )}
          </h1>
          <Pencil className="size-4 text-ht-muted opacity-0 transition group-hover:opacity-100" />
        </button>
      )}

      <p className="mt-1 text-sm text-ht-muted">{frase}</p>
    </div>
  );
}
