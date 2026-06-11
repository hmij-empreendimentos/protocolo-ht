import Link from "next/link";
import { LogoMark } from "@/components/Brand";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-5 text-center">
      <LogoMark />
      <div>
        <h1 className="text-2xl font-extrabold text-ht-text">Página no encontrada</h1>
        <p className="mt-2 text-sm text-ht-muted">
          El contenido que buscas no existe o fue movido.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-xl bg-ht-gold px-6 py-3 text-base font-extrabold text-ht-bg transition active:scale-95"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
