import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { langueActuelle } from "@/src/i18n/langue";
import { t } from "@/src/i18n/textes";
import { BasculeLangue } from "@/src/ui/BasculeLangue";
import { AuthBoutons } from "@/src/ui/AuthBoutons";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});
const serif = Fraunces({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Entraide Boisbriand",
  description:
    "Publier un don ou un besoin et se rejoindre dans un lieu public à Boisbriand.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const langue = await langueActuelle();
  const i = t(langue);
  return (
    <html lang={langue}>
      <body className={`${sans.variable} ${serif.variable}`}>
        <div className="shell">
          <header className="top">
            <Link className="marque" href="/">
              {i.marque}
            </Link>
            <nav className="nav">
              <Link href="/offre">{i.offrir}</Link>
              <Link href="/besoin">{i.besoin}</Link>
              <Link href="/mes-echanges">{i.messages}</Link>
              <Link href="/favoris">{i.lieux}</Link>
              <BasculeLangue actuelle={langue} />
              <AuthBoutons langue={langue} />
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
