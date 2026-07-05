import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { BookOpen, Presentation, BarChart2 } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "¿Silicio o Tejido? Límites del sustrato en la emulación de la mente",
  description: "Ensayo y laboratorio biofísico sobre el problema de la mente, la autopoiesis y los límites de la arquitectura digital de silicio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <header style={{
          background: 'linear-gradient(135deg, #0b0f19 0%, #111827 100%)',
          borderBottom: '1px solid #1e293b',
          padding: '20px 0',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px', background: 'linear-gradient(to right, #b388ff, #69f0ae)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
                ¿Silicio o Tejido?
              </h1>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Filosofía de las Neurociencias
              </span>
            </div>
            <nav style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Link href="/" style={{
                color: '#e0e6ed',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.2s',
                border: '1px solid #1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <BookOpen size={16} /> Ensayo
              </Link>
              <Link href="/slides/0" style={{
                color: '#e0e6ed',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.2s',
                border: '1px solid #1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Presentation size={16} /> Diapositivas
              </Link>
              <Link href="/laboratorio" style={{
                color: '#e0e6ed',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.2s',
                border: '1px solid #1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <BarChart2 size={16} /> Laboratorio
              </Link>
            </nav>
          </div>
        </header>
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          {children}
        </main>
        <footer style={{
          borderTop: '1px solid #1e293b',
          padding: '30px 0',
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '0.85rem',
          marginTop: '60px'
        }}>
          <p>Universidad de Antioquia · Instituto de Filosofía · 2026</p>
        </footer>
      </body>
    </html>
  );
}
