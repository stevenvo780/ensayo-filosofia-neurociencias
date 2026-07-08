"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import Emblem from "./Emblem";

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
