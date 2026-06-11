"use client";

import { useEffect, useState } from "react";
import { Download, Share, SquarePlus, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt: () => Promise<void>;
};

type Platform = "android" | "ios" | "desktop" | "unknown";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  if (/macintosh|windows|linux/.test(ua)) return "desktop";
  return "unknown";
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(display-mode: standalone)").matches) return true;
  if ("standalone" in navigator && (navigator as { standalone?: boolean }).standalone)
    return true;
  return false;
}

export function InstallButton() {
  const [installed, setInstalled] = useState(false);
  const [platform, setPlatform] = useState<Platform>("unknown");
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
    setInstalled(isStandalone());

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onAppInstalled);
    const mq = window.matchMedia("(display-mode: standalone)");
    const onChange = () => setInstalled(isStandalone());
    mq.addEventListener("change", onChange);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onAppInstalled);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  // Si ya está instalado, no ocupamos espacio en la nav.
  if (installed) return null;

  const handleClick = async () => {
    if (platform === "ios") {
      setShowModal(true);
      return;
    }
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") setInstalled(true);
      setDeferredPrompt(null);
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="flex min-h-16 w-full flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-ht-gold transition-colors hover:text-ht-gold-soft"
        aria-label="Instalar app en la pantalla de inicio"
      >
        <Download className="size-6" />
        <span>Instalar</span>
      </button>

      {showModal && (
        <InstallModal platform={platform} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

function InstallModal({
  platform,
  onClose,
}: {
  platform: Platform;
  onClose: () => void;
}) {
  const isIos = platform === "ios";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-ht-surface p-6 shadow-2xl ring-1 ring-ht-gold/20 sm:rounded-3xl"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 1.5rem)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2
            id="install-modal-title"
            className="text-lg font-extrabold text-ht-gold sm:text-xl"
          >
            {isIos ? "Instalar en tu iPhone" : "Instalar en tu pantalla de inicio"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ht-surface-2 text-ht-gold transition active:scale-95"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-ht-text/85">
          {isIos
            ? "Para tener acceso rápido, agrega el app a tu pantalla de inicio en 2 pasos:"
            : "Para tener acceso rápido, agrega el app a tu pantalla de inicio desde el menú de tu navegador:"}
        </p>

        <ol className="flex flex-col gap-3">
          {isIos ? (
            <>
              <Step n={1}>
                Toca el ícono <strong>Compartir</strong>{" "}
                <span className="inline-flex size-7 items-center justify-center rounded-md bg-ht-surface-2 align-middle text-ht-gold">
                  <Share className="size-4" />
                </span>{" "}
                en la barra de Safari.
              </Step>
              <Step n={2}>
                Elige <strong>Añadir a pantalla de inicio</strong>{" "}
                <span className="inline-flex size-7 items-center justify-center rounded-md bg-ht-surface-2 align-middle text-ht-gold">
                  <SquarePlus className="size-4" />
                </span>
                .
              </Step>
              <Step n={3}>
                Confirma el nombre &ldquo;Protocolo HT&rdquo; y toca{" "}
                <strong>Añadir</strong>.
              </Step>
            </>
          ) : (
            <>
              <Step n={1}>
                Abre el menú del navegador (los <strong>3 puntos</strong> arriba a la
                derecha).
              </Step>
              <Step n={2}>
                Elige <strong>Instalar app</strong> o{" "}
                <strong>Añadir a pantalla de inicio</strong>.
              </Step>
              <Step n={3}>Confirma y listo — el ícono aparecerá en tu pantalla.</Step>
            </>
          )}
        </ol>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-ht-gold py-3 text-base font-extrabold text-ht-bg shadow-sm transition active:scale-95"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ht-gold text-xs font-extrabold text-ht-bg">
        {n}
      </span>
      <span className="flex-1 text-sm leading-relaxed text-ht-text/85">{children}</span>
    </li>
  );
}
