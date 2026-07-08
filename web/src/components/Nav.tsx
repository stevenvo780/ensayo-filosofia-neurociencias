"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import Emblem from "./Emblem";

const REPO = "https://github.com/stevenvo780/ensayo-filosofia-neurociencias";

function GithubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

const LINKS = [
  { href: "/", label: "Ensayo" },
  { href: "/tesis", label: "Tesis" },
  { href: "/laboratorio", label: "Laboratorio" },
  { href: "/slides/0", label: "Presentación" },
];

export default function Nav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const stored = (typeof localStorage !== "undefined" && localStorage.getItem("sot-theme")) as
      | "light"
      | "dark"
      | null;
    const initial =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("sot-theme", next);
    } catch {}
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("/").slice(0, 2).join("/"));

  return (
    <nav className="nav">
      <Link href="/" className="nav-brand" style={{ textDecoration: "none" }}>
        <Emblem size={30} />
        <span>
          Silicio <span style={{ color: "var(--muted)" }}>⇄</span> Tejido
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div className="nav-links">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? "active" : ""}>
              {l.label}
            </Link>
          ))}
        </div>
        <a
          className="icon-btn"
          href={REPO}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Código y datos en GitHub"
          title="Repositorio abierto (código, datos y procesos)"
        >
          <GithubMark />
        </a>
        <button
          className="icon-btn"
          onClick={toggle}
          aria-label="Cambiar tema"
          title="Cambiar tema"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </nav>
  );
}
