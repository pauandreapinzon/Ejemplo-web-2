import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type NeuralNetworkProps = {
  /** Palabras que aparecen al hacer clic sobre la red */
  words: string[];
  className?: string;
};

const VIOLET = "176, 137, 250";
const CYAN = "64, 196, 246";
const LINK_DIST = 130;
const MOUSE_DIST = 170;

/**
 * Red neuronal interactiva en canvas: nodos que derivan y se conectan,
 * reaccionan al cursor y cada clic materializa una idea (palabra) en el grafo.
 * Se pausa fuera de viewport y se desactiva con prefers-reduced-motion.
 */
const NeuralNetwork = ({ words, className }: NeuralNetworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordsRef = useRef(words);
  wordsRef.current = words;
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Node = { x: number; y: number; vx: number; vy: number; r: number; c: string };
    type Floating = { x: number; y: number; text: string; born: number };

    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    const floating: Floating[] = [];
    const mouse = { x: -9999, y: -9999 };
    let wordIndex = 0;

    const makeNode = (x: number, y: number): Node => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 1.8,
      c: Math.random() > 0.3 ? VIOLET : CYAN,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(85, Math.max(30, Math.floor((w * h) / 17000)));
      nodes = Array.from({ length: count }, () => makeNode(Math.random() * w, Math.random() * h));
    };

    const tick = (now: number) => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // Conexiones entre nodos
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(${VIOLET}, ${(1 - d / LINK_DIST) * 0.16})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Conexiones con el cursor
      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (d < MOUSE_DIST) {
          ctx.strokeStyle = `rgba(${CYAN}, ${(1 - d / MOUSE_DIST) * 0.35})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Nodos
      for (const n of nodes) {
        ctx.shadowColor = `rgba(${n.c}, 0.8)`;
        ctx.shadowBlur = 7;
        ctx.fillStyle = `rgba(${n.c}, 0.85)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Palabras flotantes (las ideas del grafo)
      ctx.textAlign = "center";
      for (let i = floating.length - 1; i >= 0; i--) {
        const f = floating[i];
        const age = (now - f.born) / 2000;
        if (age >= 1) {
          floating.splice(i, 1);
          continue;
        }
        const alpha = age < 0.12 ? age / 0.12 : 1 - (age - 0.12) / 0.88;
        const size = 17 + 5 * (1 - age);
        ctx.font = `600 ${size}px "Bricolage Grotesque", Inter, sans-serif`;
        ctx.shadowColor = `rgba(${VIOLET}, ${alpha})`;
        ctx.shadowBlur = 16;
        ctx.fillStyle = `rgba(235, 233, 252, ${alpha})`;
        ctx.fillText(f.text, f.x, f.y - age * 36);
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const list = wordsRef.current;
      if (list.length) {
        floating.push({ x, y, text: list[wordIndex % list.length], born: performance.now() });
        wordIndex++;
      }
      for (let k = 0; k < 4; k++) nodes.push(makeNode(x + (Math.random() - 0.5) * 40, y + (Math.random() - 0.5) * 40));
      if (nodes.length > 110) nodes.splice(0, nodes.length - 110);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.05 });
    io.observe(canvas);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, [reduce]);

  if (reduce) return null;

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
};

export default NeuralNetwork;
