import { LogoMark } from "@/components/Brand";
import { ModulosList } from "@/components/ModulosList";

export const metadata = {
  title: "Módulos · Protocolo HT",
};

export default function ModulosPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col">
      <header className="px-5 pt-6 pb-2">
        <LogoMark size="sm" />
      </header>

      <div className="flex flex-col gap-4 px-5 pt-4 pb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-ht-text">Tus módulos</h1>
          <p className="mt-1 text-sm text-ht-muted">
            Todo tu protocolo y tu soporte en un solo lugar.
          </p>
        </div>
        <ModulosList />
      </div>
    </main>
  );
}
