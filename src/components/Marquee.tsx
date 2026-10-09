import { Children, type ReactNode } from 'react';

export type MarqueeProps = {
  children: ReactNode;
  /**
   * Seconds for one full pass. Written to a CSS custom property rather than a
   * Tailwind class so callers can pick a tempo without the stylesheet growing
   * a variant per value.
   */
  duration?: number;
  reverse?: boolean;
  className?: string;
  /** Applied to each item, e.g. a chip or a mono label. */
  itemClassName?: string;
  /** Gap between items inside one copy. */
  gapClassName?: string;
  /** Trailing space after the last item, so the seam matches the inner gap. */
  edgeClassName?: string;
  ariaLabel?: string;
};

/**
 * Seamless infinite ticker.
 *
 * The track holds exactly two identical copies of the children and slides
 * -50%, which puts the wrap point one full list-width away — the seam is never
 * on screen and nothing has to be measured in JS. `aria-hidden` on the second
 * copy stops screen readers hearing every item twice, which matters because the
 * content is decorative repetition of copy that exists in full elsewhere.
 */
export function Marquee({
  children,
  duration = 38,
  reverse = false,
  className = '',
  itemClassName = '',
  gapClassName = 'gap-3',
  edgeClassName = 'pr-3',
  ariaLabel,
}: MarqueeProps) {
  const items = Children.toArray(children);

  const copy = (hidden: boolean) => (
    <div className={`flex items-center ${gapClassName} ${edgeClassName}`} aria-hidden={hidden}>
      {items.map((item, index) => (
        <span key={index} className={`shrink-0 ${itemClassName}`}>
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee ${reverse ? 'marquee-reverse' : ''} ${className}`}
      role={ariaLabel ? 'marquee' : undefined}
      aria-label={ariaLabel}
      style={{ ['--marquee-duration' as string]: `${duration}s` }}
    >
      <div className="marquee-track">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}
