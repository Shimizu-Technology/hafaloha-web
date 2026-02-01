import FadeIn from './FadeIn';

interface AnimatedSectionProps {
  children: React.ReactNode;
  /** Additional CSS classes (merged with default padding) */
  className?: string;
  /** HTML id for anchor linking */
  id?: string;
  /** Optional inline background style (e.g. a color or image) */
  background?: React.CSSProperties;
}

/**
 * Convenience wrapper for page sections.
 *
 * Combines `FadeIn` with standardized vertical padding (`py-24 lg:py-32`)
 * so every section animates in with consistent spacing.
 *
 * Reduced-motion is handled by the inner `FadeIn` component.
 */
export default function AnimatedSection({
  children,
  className = '',
  id,
  background,
}: AnimatedSectionProps) {
  return (
    <section
      id={id}
      className={`py-24 lg:py-32 ${className}`.trim()}
      style={background}
    >
      <FadeIn>{children}</FadeIn>
    </section>
  );
}
