import { cloneElement, isValidElement, type ReactNode } from "react";
import RefTooltip from "@/components/RefTooltip";
import { REF_BY_TOKEN, createRefMatcher } from "@/data/refs";

/**
 * enrich.tsx — enriquecedor de referencias sobre JSX.
 * Recorre un árbol de nodos React y reemplaza el texto plano coincidente por
 * <RefTooltip>. No toca componentes (función) ni <a>/<code>: los deja intactos,
 * de modo que los explicadores interactivos y los enlaces no se ven afectados.
 * Máximo una marca por entrada dentro de cada bloque (evita saturación).
 */

function isOpaque(el: React.ReactElement): boolean {
  const t = el.type;
  // Componentes React (explainers, headings, etc.) y enlaces/código: no entrar.
  if (typeof t === "function") return true;
  if (t === "a" || t === "code" || t === "pre") return true;
  return false;
}

function enrichString(text: string, used: Set<string>, keyBase: string): ReactNode[] {
  const re = createRefMatcher();
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    const raw = m[0];
    const entry = REF_BY_TOKEN.get(raw.toLowerCase());
    // Una sola marca por entrada dentro de este bloque.
    if (!entry || used.has(entry.id)) continue;
    used.add(entry.id);

    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <RefTooltip key={`${keyBase}-r${k++}`} entry={entry}>
        {raw}
      </RefTooltip>,
    );
    last = re.lastIndex;
  }

  if (last === 0) return [text];
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function enrichNode(node: ReactNode, used: Set<string>, keyBase: string): ReactNode {
  if (typeof node === "string") {
    const parts = enrichString(node, used, keyBase);
    return parts.length === 1 ? parts[0] : parts;
  }
  if (Array.isArray(node)) {
    return node.map((child, i) => enrichNode(child, used, `${keyBase}-${i}`));
  }
  if (isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: ReactNode }>;
    if (isOpaque(el) || el.props?.children == null) return node;
    const newChildren = enrichNode(el.props.children, used, keyBase);
    return cloneElement(el, undefined, newChildren);
  }
  return node;
}

/**
 * Enriquece los hijos de un bloque. El Set de deduplicado se crea POR LLAMADA
 * (no compartido), de modo que el resultado es idéntico en cada render.
 */
export function enrichBlock(children: ReactNode, keyBase = "content"): ReactNode {
  return enrichNode(children, new Set<string>(), keyBase);
}
