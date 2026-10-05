import { motion, type Variants } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useMagnetic } from '../hooks';

export const EDITORIAL = [0.16, 1, 0.3, 1] as const;
export const SWIFT = [0.32, 0.72, 0, 1] as const;

export const SPRING = { type: 'spring', stiffness: 300, damping: 30 } as const;
export const SPRING_SNAPPY = { type: 'spring', stiffness: 420, damping: 32 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EDITORIAL } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EDITORIAL } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EDITORIAL } },
};

/** Page-load sequence for the hero column. */
export const welcomeSequence: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.085 } },
};

export const welcomeItem: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EDITORIAL } },
};

/** Container that staggers <RevealItem> children on scroll. */
export const revealGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.04 } },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease: EDITORIAL } },
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
      transition={{ duration: 0.62, delay, ease: EDITORIAL }}
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
  headingClassName?: string;
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
        {index && label ? (
          <Reveal>
            <SwissIndex index={index} label={label} />
          </Reveal>
        ) : null}
        {title ? (
          <Reveal delay={0.05} className={`mt-6 ${headingClassName}`}>
            <h2 className="max-w-4xl text-balance text-fluid-5xl font-semibold leading-[0.95] text-[var(--text-primary)]">
              {title}
            </h2>
            {description ? (
              <p className="mt-6 max-w-2xl text-pretty text-fluid-base leading-relaxed text-[var(--text-secondary)]">
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
    <motion.div className={cls} whileHover={{ y: -4 }} transition={{ duration: 0.32, ease: EDITORIAL }}>
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
      <Icon className={glyph} strokeWidth={1.6} />
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

export function StatusDot({ label, className = '' }: { label?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex h-1.5 w-1.5" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-[var(--accent)] opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      </span>
      {label ? <span className="swiss-index swiss-index-nowrap">{label}</span> : null}
    </span>
  );
}
