import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInProps {
  children: React.ReactNode;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Animation duration (seconds). Default: 0.6 */
  duration?: number;
  /** Direction to fade in from. Default: 'up' */
  direction?: Direction;
  /** Additional CSS classes */
  className?: string;
  /** If true, animates on mount instead of on scroll. Default: false */
  immediate?: boolean;
}

/** Offset in pixels for each direction */
const directionOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
  none: { x: 0, y: 0 },
};

/** Dramatic entrance easing from the design guide */
const EASING = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-triggered (or immediate) fade-in animation.
 *
 * Uses `useInView` with `once: true` and a `-40px` margin so elements
 * trigger reliably when they enter the viewport.
 *
 * Respects `prefers-reduced-motion` — renders children without animation
 * when the user has enabled reduced motion.
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  className,
  immediate = false,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReducedMotion = useReducedMotion();

  // When reduced motion is preferred, render children without any animation wrapper
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = directionOffset[direction];
  const shouldAnimate = immediate || isInView;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={
        shouldAnimate
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{ duration, delay, ease: [...EASING] }}
    >
      {children}
    </motion.div>
  );
}
