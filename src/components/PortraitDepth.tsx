import { useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = { alt: string; className?: string };

/**
 * Retrato cinematográfico con profundidad real:
 * - Capa halo (muy desenfocado, móvil más lento)
 * - Capa fondo desenfocado (parallax intermedio)
 * - Capa foto enfocada al frente (parallax y tilt 3D al cursor)
 * - Spotlight violeta que sigue al cursor
 * - Insignia ISO 42001 girando lentamente
 */
const PortraitDepth = ({ alt, className }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [vals, setVals] = useState({ rx: 0, ry: 0, px: 0, py: 0, spot: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setVals({ rx: (0.5 - y) * 8, ry: (x - 0.5) * 8, px: (x - 0.5) * 20, py: (y - 0.5) * 20, spot: 1 });
  };
  const handleLeave = () => setVals({ rx: 0, ry: 0, px: 0, py: 0, spot: 0 });

  const baseTrans = "transform 0.35s cubic-bezier(0.22,1,0.36,1)";

  const haloStyle: CSSProperties = {
    transform: `translate(${vals.px * 0.6}px, ${vals.py * 0.6}px) scale(1.18)`,
    transition: baseTrans,
  };
  const bgStyle: CSSProperties = {
    transform: `translate(${vals.px * 0.45}px, ${vals.py * 0.45}px) scale(1.06)`,
    transition: baseTrans,
  };
  const fgStyle: CSSProperties = {
    transform: `perspective(1000px) rotateX(${vals.rx}deg) rotateY(${vals.ry}deg) translate(${vals.px * -0.6}px, ${vals.py * -0.6}px)`,
    transition: baseTrans,
  };
  const spotStyle: CSSProperties = {
    background:
      vals.spot > 0
        ? `radial-gradient(420px circle at ${(vals.px + 50)}% ${(vals.py + 50)}%, hsl(var(--violet-glow) / 0.28), transparent 60%)`
        : "transparent",
    opacity: vals.spot,
    transition: "opacity 0.35s ease",
    mixBlendMode: "screen",
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative ${className ?? ""}`}
      style={{ perspective: "1400px" }}
    >
      {/* halo coloreado al fondo, respirando */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-10 rounded-[3rem] overflow-hidden opacity-65 blur-2xl"
        animate={reduce ? undefined : { scale: [1, 1.04, 1], opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="/media/paula-halo.webp" alt="" className="h-full w-full object-cover" style={haloStyle} />
      </motion.div>

      {/* marco principal con capas */}
      <div className="relative rounded-[1.75rem] overflow-hidden border border-primary/30 glow-violet-strong aspect-[4/5]">
        {/* atmósfera detrás (versión desenfocada de la foto) */}
        <img
          src="/media/paula-bg-blur.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={bgStyle}
        />
        {/* gradiente que integra con la paleta del sitio */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(140% 100% at 100% 0%, hsl(263 80% 35% / 0.35), transparent 55%), linear-gradient(160deg, transparent 40%, hsl(var(--background) / 0.45) 100%)",
          }}
        />
        {/* foto enfocada al frente */}
        <img
          src="/media/paula-focus.webp"
          alt={alt}
          width={900}
          height={1126}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={fgStyle}
        />
        {/* spotlight violeta que sigue al cursor */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={spotStyle} />
        {/* viñeta de borde */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 80px hsl(224 52% 4% / 0.55)" }}
        />
      </div>

      {/* Insignia ISO 42001 que gira lentamente */}
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-4 -right-3 sm:-right-5"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        <svg width="118" height="118" viewBox="0 0 118 118" className="drop-shadow-[0_0_24px_hsl(263_86%_70%/0.5)]">
          <defs>
            <path id="iso-circle" d="M59,59 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            <linearGradient id="iso-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(263 86% 70%)" />
              <stop offset="100%" stopColor="hsl(197 92% 58%)" />
            </linearGradient>
          </defs>
          <circle cx="59" cy="59" r="55" fill="hsl(224 52% 6% / 0.85)" stroke="url(#iso-grad)" strokeWidth="1.2" />
          <circle cx="59" cy="59" r="40" fill="none" stroke="hsl(263 86% 70% / 0.25)" strokeDasharray="2 4" />
          <text fontFamily="Bricolage Grotesque, Inter, sans-serif" fontSize="9.5" fontWeight="700" fill="hsl(220 30% 96%)" letterSpacing="1.5">
            <textPath href="#iso-circle" startOffset="2%">CERTIFICADA · ISO/IEC 42001 · GOBERNANZA DE IA ·</textPath>
          </text>
        </svg>
      </motion.div>

      {/* chip credencial flotante */}
      <div className="absolute -top-3 -left-3 whitespace-nowrap rounded-full border border-primary/40 bg-background/90 backdrop-blur px-3.5 py-1.5 text-xs font-semibold text-primary glow-violet">
        PhD · Top Voice
      </div>
    </div>
  );
};

export default PortraitDepth;
