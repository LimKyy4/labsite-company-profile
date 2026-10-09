import { useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2, Package } from 'lucide-react';
import { approach, sectionIndex } from '../data/companyData';
import { useElementWidth, useMediaQuery, useReducedMotion } from '../hooks';
import {
  EDITORIAL,
  Hairline,
  IconBadge,
  Reveal,
  SnapRail,
  SPRING_TAP,
  StickyIndex,
} from './ui';

export default function Approach() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const wide = useMediaQuery('(min-width: 1024px)');
  // Horizontal travel is a scroll effect, not a transition: opt out of it
  // wholesale under reduced motion and fall back to the same rail the phone
  // gets. Snapping stays — it is user-driven, not autoplay.
  const pinned = wide && !reduced;

  const sectionRef = useRef<HTMLElement>(null);
  const [trackRef, trackWidth] = useElementWidth<HTMLDivElement>();

  // Pin the section, then translate the track by exactly the overflow distance.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const distance = Math.max(trackWidth - 100, 0);
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.6 });

  const current = approach[active];

  return (
    <section ref={sectionRef} id="approach" className="surface relative">
      <Hairline className="absolute inset-x-0 top-0" />

      {pinned ? (
        <PinnedPanel progress={scrollYProgress} x={x} trackRef={trackRef} active={active} onActivate={setActive}>
          <DetailPanel current={current} />
        </PinnedPanel>
      ) : (
        <div className="shell">
          <ApproachHeading />
          <SnapRail label="Enam tahap kerja" onActiveChange={setActive} className="mt-fluid-lg">
            {approach.map((stage, index) => (
              <StageCard
                key={stage.id}
                index={index}
                step={stage.step}
                name={stage.name}
                duration={stage.duration}
                active={index === active}
                onActivate={() => setActive(index)}
              />
            ))}
          </SnapRail>
          <DetailPanel current={current} />
        </div>
      )}
    </section>
  );
}

type Progress = ReturnType<typeof useScroll>['scrollYProgress'];

function PinnedPanel({
  progress,
  x,
  trackRef,
  active,
  onActivate,
  children,
}: {
  progress: Progress;
  x: ReturnType<typeof useSpring>;
  trackRef: (node: HTMLDivElement | null) => void;
  active: number;
  onActivate: (index: number) => void;
  children: ReactNode;
}) {
  return (
    <div className="relative h-[320vh]">
      <div className="sticky top-0 flex min-h-screen flex-col justify-center">
        <div className="shell">
          <ApproachHeading />
        </div>

        {/* Progress rail */}
        <div className="shell mt-fluid-lg">
          <div className="h-px w-full bg-[var(--border)]">
            <motion.div
              className="h-px origin-left bg-[var(--accent)]"
              style={{ scaleX: progress }}
            />
          </div>
        </div>

        <div className="mt-fluid-md overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="flex gap-4 px-gutter will-change-transform">
            {approach.map((stage, index) => (
              <StageCard
                key={stage.id}
                index={index}
                step={stage.step}
                name={stage.name}
                duration={stage.duration}
                active={index === active}
                onActivate={() => onActivate(index)}
                onHover={onActivate}
              />
            ))}
          </motion.div>
        </div>

        <div className="shell mt-fluid-md">{children}</div>
      </div>
    </div>
  );
}

function ApproachHeading() {
  return (
    <>
      <StickyIndex index={sectionIndex.approach.index} label={sectionIndex.approach.label} />
      <Reveal delay={0.05} className="mt-fluid-md flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="max-w-2xl text-balance text-fluid-5xl font-semibold leading-[0.95] text-[var(--text-primary)]">
          Enam tahap, satu kelanjutan.
        </h2>
        <p className="max-w-sm text-pretty text-sm leading-relaxed text-[var(--text-secondary)] lg:text-right">
          Setiap tahap punya keluaran yang jelas dan disetujui sebelum lanjut, sehingga tidak ada
          yang dibangun dengan asumsi.
        </p>
      </Reveal>
    </>
  );
}

function DetailPanel({ current }: { current: (typeof approach)[number] }) {
  return (
    <div className="mt-fluid-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: EDITORIAL }}
          className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] lg:grid-cols-3"
        >
          <div className="bg-[var(--bg-elevated)] p-6 lg:col-span-2 lg:p-8">
            <div className="flex items-center gap-4">
              <span className="font-display text-fluid-3xl font-semibold tabular text-[var(--text-muted)] opacity-50">
                {current.step}
              </span>
              <div>
                <p className="swiss-index">{current.duration}</p>
                <h3 className="mt-1 font-display text-fluid-xl font-semibold tracking-tight text-[var(--text-primary)]">
                  {current.name}
                </h3>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
              {current.description}
            </p>
          </div>

          <div className="bg-[var(--accent-soft)] p-6 lg:p-8">
            <p className="swiss-index swiss-index-strong flex items-center gap-2">
              <Package className="h-3 w-3" strokeWidth={2} />
              Deliverable
            </p>
            <p className="mt-3 max-w-[46ch] text-pretty text-sm leading-relaxed text-[var(--text-primary)]">
              {current.deliverable}
            </p>
            <p className="mt-5 flex items-start gap-2 border-t border-[var(--border)] pt-4 text-xs leading-relaxed text-[var(--text-secondary)]">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" strokeWidth={2} />
              Disetujui bersama sebelum masuk ke tahap berikutnya.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StageCard({
  index,
  step,
  name,
  duration,
  active,
  onActivate,
  onHover,
}: {
  index: number;
  step: string;
  name: string;
  duration: string;
  active: boolean;
  onActivate: () => void;
  /** Desktop pinned track only; the phone rail syncs through its scroll. */
  onHover?: (index: number) => void;
}) {
  const Icon = approach[index].icon;
  const node = useRef<HTMLButtonElement>(null);

  // Only on tap: scrolling on mount would drag the rail to the last card.
  const handleTap = () => {
    onActivate();
    if (onHover) node.current?.scrollIntoView({ inline: 'start', block: 'nearest' });
  };

  return (
    <motion.button
      ref={node}
      type="button"
      onClick={handleTap}
      onMouseEnter={onHover ? () => onHover(index) : undefined}
      onFocus={onHover ? () => onHover(index) : undefined}
      whileTap={{ scale: 0.975 }}
      transition={SPRING_TAP}
      aria-current={active}
      className={`rail-slide group card relative flex flex-col text-left transition-colors duration-300 ease-editorial hover:border-[var(--accent)] lg:w-[24rem] lg:shrink-0 ${
        active ? 'border-[var(--accent)] shadow-lift' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <IconBadge icon={Icon} size="lg" />
        <span className="swiss-index tabular">{step}</span>
      </div>

      <h3
        className={`mt-5 font-display text-xl font-semibold transition-colors duration-300 ${
          active ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
        }`}
      >
        {name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{duration}</p>

      {active ? (
        <motion.span
          layoutId="stage-marker"
          className="absolute inset-x-6 bottom-0 h-px bg-[var(--accent)]"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      ) : null}
    </motion.button>
  );
}
