import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface StaggerItemProps {
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/** Dramatic entrance easing from the design guide */
const EASING = [0.22, 1, 0.36, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [...EASING],
    },
  },
};

/**
 * Individual item within a `StaggerContainer`.
 *
 * Uses motion variants: hidden (opacity 0, y 20) → visible (opacity 1, y 0)
 * with 0.5s duration and the dramatic entrance easing curve.
 *
 * Note: reduced-motion is handled by the parent `StaggerContainer` —
 * if the parent renders a plain `<div>`, children render normally.
 */
export default function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
