import type { Metadata } from "next";
import { Fraunces, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--f-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--f-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--f-plex-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neurocarbon.stevenvallejo.com"),
  title: "¿Silicio o Tejido? — Límites materiales y ontológicos de la mente",
  description:
    "Ensayo y laboratorio biofísico sobre los límites del silicio digital para emular el carbono vivo: economía de la codificación, termodinámica de la señalización y autopoiesis.",
  authors: [{ name: "Steven Vallejo Ortiz" }],
  openGraph: {
    title: "¿Silicio o Tejido?",
    description:
      "El sustrato importa: del cuello de botella de Von Neumann a la autopoiesis, con un laboratorio computacional interactivo.",
    type: "article",
    locale: "es_ES",
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem('sot-theme');if(t){document.documentElement.setAttribute('data-theme',t);}var c=localStorage.getItem('sot-toc');if(c){document.documentElement.setAttribute('data-toc',c);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${fraunces.variable} ${newsreader.variable} ${plexMono.variable}`}>
        <Nav />
        <main>{children}</main>
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "40px 24px",
            textAlign: "center",
            color: "var(--muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            letterSpacing: "0.04em",
            marginTop: "80px",
          }}
        >
          <p style={{ margin: 0 }}>
            Steven Vallejo Ortiz · Universidad de Antioquia · Instituto de Filosofía · 2026
          </p>
          <p style={{ margin: "6px 0 0", opacity: 0.7 }}>
            Ensayo + laboratorio computacional reproducible · Filosofía de las Neurociencias
          </p>
        </footer>
      </body>
    </html>
  );
}
