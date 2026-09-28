import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Entraide Boisbriand",
  description: "Donner et recevoir sans le chaos des groupes Facebook.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${sans.variable} ${serif.variable}`}>
        <div className="shell">
          <header className="top">
            <Link className="marque" href="/">
              Entraide Boisbriand
            </Link>
            <nav className="nav">
              <Link href="/offre">Offrir</Link>
              <Link href="/besoin">Besoin</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
