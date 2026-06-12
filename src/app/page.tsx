import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LogoMark } from "@/components/Brand";
import { ModuloCard } from "@/components/ModuloCard";
import { Greeting } from "@/components/home/Greeting";
import { ContinueCard } from "@/components/home/ContinueCard";
import { LevelBadge } from "@/components/home/LevelBadge";
import { StreakCard } from "@/components/home/StreakCard";
import { DailyGoals } from "@/components/home/DailyGoals";
import { AvisoBanner } from "@/components/home/AvisoBanner";
import { NewsFeed } from "@/components/home/NewsFeed";
import { DailyTip } from "@/components/home/DailyTip";
import { Testimonials } from "@/components/home/Testimonials";
import { MODULOS } from "@/lib/modulos-conteudo";

export default function Home() {
  const destacados = MODULOS.filter(
    (m) => m.tipo === "contenido" || m.tipo === "especialista",
  );

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-border/60 bg-ht-bg/80 px-5 pb-3 pt-6 backdrop-blur-md">
        <LogoMark />
        <LevelBadge />
      </header>

      <div className="flex flex-col gap-6 px-5 pt-4 pb-8">
        <Greeting />

        <AvisoBanner />

        <div className="anim-rise">
          <StreakCard />
        </div>

        <div className="anim-rise">
          <DailyGoals />
        </div>

        <ContinueCard />

        <div className="anim-rise">
          <NewsFeed />
        </div>

        <DailyTip />

        <div className="anim-rise">
          <Testimonials />
        </div>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-ht-muted">
              Tus módulos
            </h2>
            <Link
              href="/modulos"
              className="flex items-center gap-0.5 text-xs font-semibold text-ht-gold"
            >
              Ver todos <ChevronRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {destacados.map((modulo) => (
              <ModuloCard key={modulo.slug} modulo={modulo} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
