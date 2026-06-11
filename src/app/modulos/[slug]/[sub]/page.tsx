import { notFound } from "next/navigation";
import { PageHeader } from "@/components/Brand";
import { ContentBody } from "@/components/ContentBody";
import { HtmlContent } from "@/components/HtmlContent";
import { getModulosContenido, getSubmodulo } from "@/lib/modulos-conteudo";

export function generateStaticParams() {
  const params: { slug: string; sub: string }[] = [];
  for (const m of getModulosContenido()) {
    for (const s of m.submodulos ?? []) {
      params.push({ slug: m.slug, sub: s.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;
  const found = getSubmodulo(slug, sub);
  return {
    title: found ? `${found.submodulo.titulo} · Protocolo HT` : "Protocolo HT",
  };
}

export default async function SubmoduloPage({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;
  const found = getSubmodulo(slug, sub);

  if (!found) notFound();
  const { modulo, submodulo } = found;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col">
      <PageHeader titulo={submodulo.titulo} back={`/modulos/${modulo.slug}`} />

      <div className="flex flex-col gap-5 px-5 pt-5 pb-8">
        <p className="text-[11px] font-bold uppercase tracking-widest text-ht-gold">
          {modulo.titulo}
        </p>
        {submodulo.html ? (
          <HtmlContent src={submodulo.html} />
        ) : (
          <ContentBody
            video={submodulo.video}
            descripcion={submodulo.descripcion}
            pdfs={submodulo.pdfs}
          />
        )}
      </div>
    </main>
  );
}
