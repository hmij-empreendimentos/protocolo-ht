import { notFound } from "next/navigation";
import { PageHeader } from "@/components/Brand";
import { ContentBody } from "@/components/ContentBody";
import { SubmoduloGrid } from "@/components/SubmoduloGrid";
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
            <SubmoduloGrid slug={m.slug} submodulos={m.submodulos!} />
          </>
        ) : (
          <ContentBody video={m.video} descripcion={m.descripcion} pdfs={m.pdfs} />
        )}
      </div>
    </main>
  );
}
