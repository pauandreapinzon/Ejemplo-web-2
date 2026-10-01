import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Inclinación máxima en grados */
  max?: number;
};

/** Tarjeta con tilt 3D que sigue al cursor + spotlight violeta. */
const TiltCard = ({ children, className, max = 6 }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [tilt, setTilt] = useState<CSSProperties>({});
  const [spot, setSpot] = useState<CSSProperties>({ opacity: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({
      transform: `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`,
      transition: "transform 0.08s ease-out",
      willChange: "transform",
    });
    setSpot({
      opacity: 1,
      background: `radial-gradient(440px circle at ${px * 100}% ${py * 100}%, hsl(var(--violet-glow) / 0.13), transparent 65%)`,
    });
  };

  const onLeave = () => {
    setTilt({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
    });
    setSpot({ opacity: 0 });
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`relative ${className ?? ""}`} style={tilt}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-[1]"
        style={spot}
      />
      {children}
    </div>
  );
};

export default TiltCard;
