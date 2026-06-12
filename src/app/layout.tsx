import type { Metadata, Viewport } from "next";
import { Geist, Oswald } from "next/font/google";
import { BottomNav } from "@/components/BottomNav";
import { NavTracker } from "@/components/NavTracker";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Fuente display: condensada y atlética, para números y titulares con energía.
const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Protocolo HT",
  description:
    "Tu protocolo masculino completo. Accede a tus módulos, sigue tu progreso y transforma tu rendimiento.",
  applicationName: "Protocolo HT",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/logo/icon.svg",
    apple: "/logo/icon.svg",
  },
  appleWebApp: {
    capable: true,
    title: "Protocolo HT",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0c0c0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="flex-1 pb-24">{children}</div>
        <BottomNav />
        <NavTracker />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
