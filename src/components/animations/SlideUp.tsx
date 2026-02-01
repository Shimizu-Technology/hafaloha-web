import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SlideUpProps {
  children: React.ReactNode;
  /** Delay before animation starts (seconds). Default: 0 */
  delay?: number;
  /** Animation duration (seconds). Default: 0.6 */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
}

/** Dramatic entrance easing from the design guide */
const EASING = [0.22, 1, 0.36, 1] as const;

/**
 * Slide-up entrance animation that plays immediately on mount.
 *
 * Ideal for hero text, badges, CTAs — anything above the fold that
 * should animate when the page first loads (not on scroll).
 *
 * Respects `prefers-reduced-motion`.
 */
export default function SlideUp({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: SlideUpProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: [...EASING] }}
    >
      {children}
    </motion.div>
  );
}
