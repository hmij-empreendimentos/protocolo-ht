import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LogoMark } from "@/components/Brand";
import { ModuloCard } from "@/components/ModuloCard";
import { Greeting } from "@/components/home/Greeting";
import { ContinueCard } from "@/components/home/ContinueCard";
import { MODULOS } from "@/lib/modulos-conteudo";

export default function Home() {
  // En la home destacamos los módulos de contenido + especialista.
  // WhatsApp y correo viven en /modulos y en la barra inferior.
  const destacados = MODULOS.filter(
    (m) => m.tipo === "contenido" || m.tipo === "especialista",
  );

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col">
      <header className="px-5 pt-6 pb-2">
        <LogoMark />
      </header>

      <div className="flex flex-col gap-6 px-5 pt-4 pb-8">
        <Greeting />

        <ContinueCard />

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
