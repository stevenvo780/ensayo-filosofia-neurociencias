#!/usr/bin/env bash
# Regenera los PDF del ensayo y la tesis con formato académico (UdeA):
# Times (TeX Gyre Termes) 12 pt, interlineado 1.5, márgenes 2.5 cm, sangría de
# primera línea, sin separadores decorativos. Requiere pandoc + xelatex.
set -euo pipefail
cd "$(dirname "$0")"

COMMON=(
  --pdf-engine=xelatex
  -H pandoc-header.tex
  -V mainfont="TeX Gyre Termes"
  -V fontsize=12pt
  -V geometry:margin=2.5cm
  -V linestretch=1.5
  -V indent=true
  -V colorlinks=true -V linkcolor=black -V urlcolor=black -V citecolor=black
  -V lang=es-ES
)

echo "→ ensayo…"
pandoc 00_ensayo.md -o 00_ensayo.pdf "${COMMON[@]}"

echo "→ tesis…"
pandoc tesis.md -o tesis.pdf "${COMMON[@]}" --toc --toc-depth=2

echo "✓ PDFs regenerados."
