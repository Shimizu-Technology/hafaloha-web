import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface StaggerContainerProps {
  children: React.ReactNode;
  /** Delay between each child animation (seconds). Default: 0.08 */
  staggerDelay?: number;
  /** Additional CSS classes */
  className?: string;
  /** If true, animates on mount instead of on scroll. Default: false */
  immediate?: boolean;
}

/**
 * Wraps children with a staggered reveal animation.
 *
 * Use with `StaggerItem` for each child element.
 * Uses `useInView` with `once: true` and `-40px` margin.
 *
 * Respects `prefers-reduced-motion`.
 */
export default function StaggerContainer({
  children,
  staggerDelay = 0.08,
  className,
  immediate = false,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const shouldAnimate = immediate || isInView;

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
