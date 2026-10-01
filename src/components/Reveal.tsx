import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retraso en segundos (útil para stagger manual) */
  delay?: number;
  /** Desplazamiento vertical inicial en px */
  y?: number;
};

/**
 * Aparición al entrar en viewport. El contenido es visible por defecto
 * si el usuario prefiere menos movimiento.
 */
const Reveal = ({ children, className, delay = 0, y = 28 }: RevealProps) => {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
