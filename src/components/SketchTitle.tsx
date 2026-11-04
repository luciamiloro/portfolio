"use client";

import { useEffect, useRef } from "react";

// Título "del boceto al código": líneas de construcción tipográficas + cotas,
// trazo del texto y luego "entintado". El <h1> real (SEO y lectores de pantalla)
// es texto oculto; los SVG son decorativos. Click en el título = repetir.

type Layout = { width: number; size: number; lead: number; lines: { text: string; italic: boolean }[] };

// Parte una línea en dos, buscando que queden de largo parecido (para mobile).
function splitBalanced(s: string): string[] {
  const words = s.split(" ");
  if (words.length < 2) return [s];
  let best = 1;
  let diff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const d = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (d < diff) [diff, best] = [d, i];
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

function Sketch({ layout, className, onReplay, svgRef }: {
  layout: Layout; className: string; onReplay: () => void; svgRef: React.RefObject<SVGSVGElement | null>;
}) {
  const { width, size, lead, lines } = layout;
  const cap = Math.round(size * 0.7);
  const xh = Math.round(size * 0.44);
  const first = size + 28; // baseline de la primera línea
  const height = first + lead * (lines.length - 1) + 50;
  const lastBase = first + lead * (lines.length - 1);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className={`sketch block w-full cursor-default overflow-visible ${className}`}
      aria-hidden
      onClick={onReplay}
    >
      {lines.map((_, i) => {
        const y = first + lead * i;
        return (
          <g key={i}>
            <line className="cl" x1="-8" x2={width} y1={y} y2={y} />
            <text className="cl-label" x={width} y={y - 5} textAnchor="end">baseline</text>
          </g>
        );
      })}
      <line className="cl" x1="-8" x2={width} y1={first - cap} y2={first - cap} />
      <line className="cl" x1="-8" x2={width} y1={first - xh} y2={first - xh} />
      <text className="cl-label" x={width} y={first - cap - 5} textAnchor="end">cap height</text>
      <text className="cl-label" x={width} y={first - xh - 5} textAnchor="end">x-height</text>
      <line className="cl" x1="0" x2="0" y1={first - cap - 30} y2={lastBase + 40} />

      <line className="cota" x1="-14" x2="-14" y1={first - cap} y2={first} />
      <line className="cota" x1="-20" x2="-8" y1={first - cap} y2={first - cap} />
      <line className="cota" x1="-20" x2="-8" y1={first} y2={first} />
      <text className="cota-t" x="-22" y={first - cap / 2 + 4} textAnchor="end">{cap}</text>
      <text className="cota-t" x="4" y={lastBase + 36}>{`Fraunces 500 / ${size} · tracking −2`}</text>

      {lines.map((l, i) => (
        <text key={i} className={l.italic ? "t2" : "t1"} x="0" y={first + lead * i} fontSize={size}
          data-i={i}>
          {l.text}
        </text>
      ))}
    </svg>
  );
}

export function SketchTitle({ lineA, lineB }: { lineA: string; lineB: string }) {
  const desk = useRef<SVGSVGElement>(null);
  const mob = useRef<SVGSVGElement>(null);

  function play() {
    for (const el of [desk.current, mob.current]) {
      if (!el) continue;
      el.classList.remove("play");
      void el.getBoundingClientRect(); // reinicia las animaciones CSS
      el.classList.add("play");
    }
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      desk.current?.classList.add("done");
      mob.current?.classList.add("done");
      return;
    }
    // Esperamos a Fraunces para que el trazo se dibuje con la tipografía final.
    let cancelled = false;
    document.fonts.ready.then(() => !cancelled && play());
    return () => {
      cancelled = true;
    };
  }, [lineA]);

  const desktop: Layout = {
    width: 1000, size: 92, lead: 120,
    lines: [{ text: lineA, italic: false }, { text: lineB, italic: true }],
  };
  const mobile: Layout = {
    width: 520, size: 72, lead: 84,
    lines: [
      ...splitBalanced(lineA).map((text) => ({ text, italic: false })),
      ...splitBalanced(lineB).map((text) => ({ text, italic: true })),
    ],
  };

  return (
    <h1 className="relative">
      <span className="sr-only">
        {lineA} {lineB}
      </span>
      <Sketch layout={desktop} className="hidden max-w-5xl sm:block" onReplay={play} svgRef={desk} />
      <Sketch layout={mobile} className="sm:hidden" onReplay={play} svgRef={mob} />
    </h1>
  );
}
