"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
}

function IconList() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <path d="M2.5 4h11M2.5 8h11M2.5 12h11" />
    </svg>
  );
}
function IconCollapse() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 3.5 5.5 8l4.5 4.5" />
    </svg>
  );
}

export default function TOC({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored =
      typeof localStorage !== "undefined" && localStorage.getItem("sot-toc") === "collapsed";
    setCollapsed(stored);
    document.documentElement.setAttribute("data-toc", stored ? "collapsed" : "open");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    document.documentElement.setAttribute("data-toc", next ? "collapsed" : "open");
    try {
      localStorage.setItem("sot-toc", next ? "collapsed" : "open");
    } catch {}
  };

  return (
    <nav className="toc" aria-label="Contenidos">
      <button
        className="toc-toggle"
        onClick={toggle}
        aria-expanded={!collapsed}
        aria-label={collapsed ? "Mostrar contenidos" : "Ocultar contenidos"}
        title={collapsed ? "Mostrar contenidos" : "Ocultar contenidos"}
      >
        {collapsed ? (
          <IconList />
        ) : (
          <>
            <IconCollapse />
            <span>Contenidos</span>
          </>
        )}
      </button>
      <div className="toc-list">
        {items.map((it) => (
          <a key={it.id} href={`#${it.id}`} className={active === it.id ? "active" : ""}>
            {it.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
