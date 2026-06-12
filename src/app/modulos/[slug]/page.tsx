import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/Brand";
import { ContentBody } from "@/components/ContentBody";
import { ModuleIcon } from "@/components/icons";
import {
  getModulosContenido,
  getModulo,
  type ModuloContenido,
} from "@/lib/modulos-conteudo";

export function generateStaticParams() {
  return getModulosContenido().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const modulo = getModulo(slug);
  return { title: modulo ? `${modulo.titulo} · Protocolo HT` : "Protocolo HT" };
}

export default async function ModuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const modulo = getModulo(slug);

  if (!modulo || modulo.tipo !== "contenido") notFound();
  const m = modulo as ModuloContenido;

  const tieneSubs = m.submodulos && m.submodulos.length > 0;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col">
      <PageHeader titulo={m.titulo} back="/modulos" />

      <div className="flex flex-col gap-5 px-5 pt-5 pb-8">
        <p className="text-[11px] font-bold uppercase tracking-widest text-ht-gold">
          {m.badge === "principal" ? "Producto principal" : m.etiqueta}
        </p>

        {tieneSubs ? (
          <>
            {m.descripcion && (
              <p className="text-base leading-relaxed text-ht-text/85">
                {m.descripcion}
              </p>
            )}
            <ul className="flex flex-col gap-3">
              {m.submodulos!.map((sub, i) => (
                <li key={sub.slug}>
                  <Link
                    href={`/modulos/${m.slug}/${sub.slug}`}
                    className="flex items-center gap-3 rounded-2xl bg-card p-3 ring-1 ring-border transition active:scale-[0.99]"
                  >
                    <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ht-surface-2 text-ht-gold ring-1 ring-border">
                      {sub.imagen ? (
                        <Image
                          src={sub.imagen}
                          alt={sub.titulo}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        <ModuleIcon name={sub.icono ?? "play"} className="size-6" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-ht-muted">
                        Parte {i + 1}
                      </p>
                      <h3 className="truncate text-sm font-bold text-ht-text sm:text-base">
                        {sub.titulo}
                      </h3>
                    </div>
                    <ChevronRight className="size-5 shrink-0 text-ht-gold" />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <ContentBody video={m.video} descripcion={m.descripcion} pdfs={m.pdfs} />
        )}
      </div>
    </main>
  );
}
