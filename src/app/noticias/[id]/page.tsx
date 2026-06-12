import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/Brand";
import { HtmlContent } from "@/components/HtmlContent";
import { NOTICIAS, getNoticia, noticiaHtml } from "@/content/noticias";

export function generateStaticParams() {
  return NOTICIAS.map((n) => ({ id: n.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const n = getNoticia(id);
  return { title: n ? `${n.titulo} · Protocolo HT` : "Protocolo HT" };
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const noticia = getNoticia(id);
  if (!noticia) notFound();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col">
      <PageHeader titulo="Novedades" back="/" />

      <div className="flex flex-col gap-5 px-5 pt-5 pb-8">
        <HtmlContent src={noticiaHtml(noticia.id)} />

        {noticia.url && (
          <Link
            href={noticia.url}
            className="flex items-center justify-between gap-3 rounded-2xl bg-ht-gold px-5 py-4 text-base font-extrabold text-ht-bg transition active:scale-[0.98]"
          >
            Ver el módulo relacionado
            <ArrowRight className="size-5" />
          </Link>
        )}
      </div>
    </main>
  );
}
