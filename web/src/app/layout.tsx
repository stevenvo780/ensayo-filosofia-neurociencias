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
  title: "La unidad que falta — La falacia mereológica y el argumento del sustrato",
  description:
    "Ensayo de filosofía de las neurociencias: por qué la autopoiesis no puede decidir si una máquina puede ser consciente. Individúa células, no sujetos. Con un laboratorio computacional auditado.",
  authors: [{ name: "Steven Vallejo Ortiz" }],
  openGraph: {
    title: "La unidad que falta",
    description:
      "Antes de preguntar de qué está hecho un sujeto, hay que poder decir cuál es. Un ensayo sobre autopoiesis, individuación y conciencia artificial.",
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
