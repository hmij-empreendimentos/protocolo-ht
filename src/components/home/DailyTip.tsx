import { Lightbulb } from "lucide-react";
import { getTipDelDia } from "@/lib/daily-tips";

export function DailyTip() {
  const tip = getTipDelDia();

  return (
    <section className="flex items-start gap-3 rounded-2xl bg-ht-surface p-4 ring-1 ring-border">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ht-gold/15 text-ht-gold">
        <Lightbulb className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-widest text-ht-gold">
          Tip del día
        </p>
        <h3 className="mt-0.5 text-base font-extrabold text-ht-text">{tip.titulo}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ht-text/80">{tip.texto}</p>
      </div>
    </section>
  );
}
