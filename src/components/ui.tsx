import { motion, useMotionValue, type Variants } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Children, useEffect, useRef, useState, type ReactNode } from 'react';
import { useMagnetic } from '../hooks';

export const EDITORIAL = [0.16, 1, 0.3, 1] as const;

/**
 * Animation budget.
 *
 * One spring constant governs every interactive transition on the page
 * (stiffness 220 / damping 24). Two reasons it is fixed rather than tuned per
 * component:
 *
 * 1. Coherence. A pill that arrives with one spring and a drawer with another
 *    reads as two different products stitched together, even when neither is
 *    individually wrong.
 * 2. Damping ratio. zeta = c / (2*sqrt(k*m)) = 24 / (2*sqrt(220*0.85)) ≈ 0.91 —
 *    critically damped. It settles without a single overshoot frame, which is
 *    what "elegant" actually looks like: motion that terminates rather than
 *    bounces. Every earlier value in this file (300/30, 420/32, 520/30) was
 *    under-damped and produced a visible bounce on touch-down.
 */
export const SPRING = { type: 'spring', stiffness: 220, damping: 24, mass: 0.85 } as const;

/** Scroll-in reveal. Matches SPRING so a card never lands differently than its frame. */
export const SPRING_REVEAL = { type: 'spring', stiffness: 220, damping: 24, mass: 0.85 } as const;

/**
 * Touch-down feedback. Deliberately near-critically damped and fast: a bounce
 * here reads as a glitch, not as delight. Scale overshoot is capped at 2% so
 * the press is felt rather than seen.
 */
export const SPRING_TAP = { type: 'spring', stiffness: 420, damping: 34, mass: 0.5 } as const;

/**
 * Scroll-reveal travel is 18px, not the 40–60px that reads as "entering".
 * Below ~12px the motion is invisible; above ~24px it competes with the reading
 * eye and makes a grid feel like it is still loading. 18px reads as expensive.
 */
export const REVEAL_Y = 18;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y },
  show: { opacity: 1, y: 0, transition: SPRING_REVEAL },
};

/** Page-load sequence for the hero column. */
export const welcomeSequence: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.075 } },
};

export const welcomeItem: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y, scale: 0.99 },
  show: { opacity: 1, y: 0, scale: 1, transition: SPRING_REVEAL },
};

/** Container that staggers <RevealItem> children on scroll. */
export const revealGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y },
  show: { opacity: 1, y: 0, transition: SPRING_REVEAL },
};

export const VIEWPORT = { once: true, amount: 0.18 } as const;

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ ...SPRING_REVEAL, delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className = '',
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={`[&>*]:min-w-0 ${className}`}
      variants={revealGroup}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={revealItem}>
      {children}
    </motion.div>
  );
}

/** Full-bleed 1px rule that separates sections edge to edge. */
export function Hairline({ className = '' }: { className?: string }) {
  return <div role="presentation" className={`h-px w-full bg-[var(--border)] ${className}`} />;
}

/** `[ 01 // ABOUT US ]` micro-index in the Swiss editorial manner. */
export function SwissIndex({
  index,
  label,
  className = '',
}: {
  index?: string;
  label: string;
  className?: string;
}) {
  return (
    <p className={`swiss-index swiss-index-nowrap flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
      <span className="swiss-index-strong">[ {index ? `${index} //` : '//'}</span>
      <span>{label} ]</span>
    </p>
  );
}

/**
 * `[ 01 // ABOUT US ]` that pins under the floating nav for the length of its
 * section, then releases as the next one arrives.
 *
 * It also fades out over the last ~90px of its section. Without this the
 * pinned bar sits at the section boundary with a stale label directly above the
 * *next* section's own index — two micro-labels stacked, one of them lying
 * about where you are.
 *
 * The fade writes `style.opacity` directly from a rAF-throttled passive scroll
 * listener rather than going through React state: it is one property on one
 * element, and a state update per scroll frame would re-render the whole
 * section. No Framer Motion on this element at all — an animation would win the
 * cascade over the inline write and permanently override the fade.
 */
export function StickyIndex({ index, label }: { index?: string; label: string }) {
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const section = pin?.closest('section');
    if (!pin || !section) return undefined;
    let frame = 0;

    const sync = () => {
      frame = 0;
      const indexTop = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--index-top'),
      );
      // Where the pinned bar actually rests, plus its own height.
      const rest = (Number.isFinite(indexTop) ? indexTop : 60) + pin.offsetHeight;
      const remaining = section.getBoundingClientRect().bottom - rest;
      const next = remaining >= 0 ? 1 : Math.max(0, 1 + remaining / 90);
      pin.style.opacity = String(Number(next.toFixed(2)));
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    };
  }, []);

  return (
    <div ref={pinRef} className="index-pin">
      <SwissIndex index={index} label={label} />
    </div>
  );
}

/**
 * Horizontal snap rail for thumb-driven browsing.
 *
 * Scrolling is native CSS scroll-snap (see `.rail`), so this only owns the two
 * things the platform cannot give us: a progress readout, and which slide is
 * currently under the thumb. Both are computed from rects inside a single
 * rAF-throttled passive scroll listener — reads only, no writes, no
 * scroll-hijack — so it stays off the critical path at 60fps.
 *
 * Drop `rail-slide` on each child to get the peek width. Place the rail inside
 * `.shell`; it bleeds its own margins so cards run to the screen edge while
 * the indicator stays aligned to the gutter.
 */
export function SnapRail({
  children,
  label,
  indicator = 'bar',
  snap = true,
  counterPrefix,
  onActiveChange,
  className = '',
}: {
  children: ReactNode;
  /** Accessible name for the scroll region. */
  label: string;
  indicator?: 'bar' | 'none';
  /** Off for tab strips, where one-detent-per-flick fights the user. */
  snap?: boolean;
  /**
   * Word that names the counter's domain, e.g. `ISSUE` or `STAGE`. Without it
   * a bare `03 / 07` reads as a page-section number; with it, `ISSUE 03 / 07`
   * can only mean the third of seven cards in this group.
   */
  counterPrefix?: string;
  onActiveChange?: (index: number) => void;
  className?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const scaleX = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [total, setTotal] = useState(0);

  // Read through a ref so an inline callback in the parent does not tear down
  // and rebuild the scroll listeners on every render.
  const notify = useRef(onActiveChange);
  notify.current = onActiveChange;
  const activeRef = useRef(0);
  const totalRef = useRef(0);

  useEffect(() => {
    const node = railRef.current;
    if (!node) return undefined;
    let frame = 0;

    const sync = () => {
      frame = 0;
      const max = node.scrollWidth - node.clientWidth;
      scaleX.set(max > 1 ? Math.min(1, Math.max(0, node.scrollLeft / max)) : 0);

      const slides = node.children;
      if (slides.length !== totalRef.current) {
        totalRef.current = slides.length;
        setTotal(slides.length);
      }
      if (!slides.length) return;

      // Nearest slide centre to the viewport centre. Rect reads only.
      const center = node.getBoundingClientRect().left + node.clientWidth / 2;
      let nearest = 0;
      let distance = Infinity;
      for (let i = 0; i < slides.length; i += 1) {
        const rect = slides[i].getBoundingClientRect();
        const d = Math.abs(rect.left + rect.width / 2 - center);
        if (d < distance) {
          distance = d;
          nearest = i;
        }
      }

      if (nearest !== activeRef.current) {
        activeRef.current = nearest;
        setActive(nearest);
        notify.current?.(nearest);
      }
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    sync();
    node.addEventListener('scroll', request, { passive: true });
    // Cards reflow when fonts land or a slide's content changes height.
    const observer = new ResizeObserver(request);
    observer.observe(node);
    for (const slide of node.children) observer.observe(slide);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      node.removeEventListener('scroll', request);
      observer.disconnect();
    };
  }, [scaleX]);

  return (
    <div className={className}>
      <div
        ref={railRef}
        role="group"
        aria-label={label}
        className={`rail ${snap ? '' : 'rail-free'}`}
        tabIndex={0}
      >
        {Children.toArray(children)}
      </div>

      {indicator === 'bar' && total > 1 ? (
        /* The `02 / 06` readout sits on the same 1px baseline grid as every
           other rule on the page, so it needs its own band of air or the
           numeral's descenders touch the progress hairline and the whole
           indicator reads as clipped. 14px above + 10px below puts the digits
           in a clear lane while still grouping them with the bar. */
        <div className="mt-3.5 flex items-center gap-4 pb-2.5">
          <div className="relative h-px flex-1 bg-[var(--border)]">
            <motion.div
              className="absolute inset-0 origin-left bg-[var(--accent)]"
              style={{ scaleX }}
            />
          </div>
          <span className="swiss-index swiss-index-nowrap tabular pl-1">
            {counterPrefix ? (
              <span className="text-[var(--text-muted)]">{counterPrefix} </span>
            ) : null}
            <span className="text-[var(--text-primary)]">
              {String(active + 1).padStart(2, '0')}
            </span>
            {' / '}
            {String(total).padStart(2, '0')}
          </span>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Section wrapper. `index` renders the Swiss micro-label; `bleed` lets the
 * section own the full viewport width instead of sitting inside the shell.
 */
export function Section({
  id,
  index,
  label,
  title,
  description,
  children,
  className = '',
  headingClassName = '',
  headingTitleClassName = '',
  invert = false,
  topRule = true,
}: {
  id?: string;
  index?: string;
  label?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Applied to the <Reveal> that wraps the heading block. */
  headingClassName?: string;
  /** Applied to the <h2> itself, for per-section heading overrides. */
  headingTitleClassName?: string;
  invert?: boolean;
  topRule?: boolean;
}) {
  const surface = invert ? 'surface-invert' : 'surface';

  return (
    <section
      id={id}
      className={`${surface} relative scroll-mt-28 py-section ${className}`}
    >
      {topRule ? <Hairline className="absolute inset-x-0 top-0" /> : null}
      <div className="shell">
        {index && label ? <StickyIndex index={index} label={label} /> : null}
        {title ? (
          <Reveal delay={0.05} className={`mt-fluid-md ${headingClassName}`}>
            {/*
              `headingTitleClassName` is merged after the defaults so a section
              can widen the measure (`max-w-*`) or re-tune the tracking without
              restating the whole type scale.
            */}
            <h2
              className={`max-w-4xl text-balance text-fluid-5xl font-semibold leading-[0.95] text-[var(--text-primary)] ${headingTitleClassName}`}
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-fluid-sm max-w-2xl text-pretty text-fluid-base leading-relaxed text-[var(--text-secondary)]">
                {description}
              </p>
            ) : null}
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function Card({
  children,
  className = '',
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  const cls = `card ${hover ? 'card-hover' : ''} ${className}`;

  if (!hover) return <div className={cls}>{children}</div>;

  return (
    <motion.div
      className={cls}
      /* 2px, not 4: at 4px the card visibly detaches from the hairline grid it
         is supposed to sit on, and a grid of six such cards reads as a page
         mid-transition rather than a settled layout. */
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={SPRING_TAP}
    >
      {children}
    </motion.div>
  );
}

export function IconBadge({
  icon: Icon,
  size = 'default',
  className = '',
}: {
  icon: LucideIcon;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}) {
  const box = { sm: 'h-9 w-9 rounded-lg', default: 'h-11 w-11 rounded-xl', lg: 'h-14 w-14 rounded-2xl' }[size];
  const glyph = { sm: 'h-4 w-4', default: 'h-5 w-5', lg: 'h-6 w-6' }[size];

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center border border-[var(--border)] bg-[var(--accent-soft)] text-[var(--accent)] transition-colors duration-300 ${box} ${className}`}
    >
      <Icon className={`${glyph} icon-optical`} strokeWidth={1.6} />
    </span>
  );
}

/** Primary/secondary link or button that leans toward the cursor. */
export function MagneticTap({
  as = 'a',
  href,
  type,
  onClick,
  children,
  icon: Icon,
  variant = 'primary',
  className = '',
  disabled,
  iconClassName,
}: {
  as?: 'a' | 'button';
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: ReactNode;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
  iconClassName?: string;
}) {
  const magnetic = useMagnetic(0.18);
  const shared = {
    style: { x: magnetic.x, y: magnetic.y },
    ...magnetic.handlers,
    whileTap: { scale: 0.97 },
    className: `group ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`,
  };
  const inner = (
    <>
      {children}
      {Icon ? (
        <Icon
          className={
            iconClassName ?? 'h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1'
          }
          strokeWidth={2}
        />
      ) : null}
    </>
  );

  if (as === 'button') {
    return (
      <motion.button {...shared} type={type ?? 'button'} onClick={onClick} disabled={disabled}>
        {inner}
      </motion.button>
    );
  }

  return (
    <motion.a {...shared} href={href}>
      {inner}
    </motion.a>
  );
}
