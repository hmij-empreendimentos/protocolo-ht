"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid } from "lucide-react";
import { WhatsappIcon } from "./icons";
import { InstallButton } from "./InstallButton";

const WHATSAPP_URL =
  "https://wa.me/5537991209892?text=Hola%2C%20tengo%20dudas%20sobre%20el%20Honey%20Trick%20Protocol.";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const items: NavItem[] = [
  { href: "/", label: "Inicio", icon: <Home className="size-6" /> },
  { href: "/modulos", label: "Módulos", icon: <LayoutGrid className="size-6" /> },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-ht-bg-soft/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-3xl items-stretch justify-around">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  "relative flex min-h-16 flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-semibold transition-colors " +
                  (active ? "text-ht-gold" : "text-ht-muted hover:text-ht-text")
                }
              >
                {active && (
                  <span className="absolute top-0 h-0.5 w-9 rounded-full bg-ht-gold shadow-[0_0_10px_rgba(212,175,55,0.7)]" />
                )}
                <span className={active ? "scale-110 transition-transform" : "transition-transform"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
        <li className="flex-1">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-16 flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-ht-muted transition-colors hover:text-ht-text"
          >
            <WhatsappIcon className="size-6" />
            <span>Soporte</span>
          </a>
        </li>
        <li className="flex-1">
          <InstallButton />
        </li>
      </ul>
    </nav>
  );
}
