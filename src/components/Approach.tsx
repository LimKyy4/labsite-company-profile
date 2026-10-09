import { useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2, Package } from 'lucide-react';
import { approach, sectionIndex } from '../data/companyData';
import { ui } from '../i18n/ui';
import { useLanguage } from '../context/LanguageContext';
import { useElementWidth, useMediaQuery, useReducedMotion } from '../hooks';
import {
  EDITORIAL,
  Hairline,
  IconBadge,
  Reveal,
  SnapRail,
  SPRING,
  SPRING_TAP,
  StickyIndex,
} from './ui';

export default function Approach() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const wide = useMediaQuery('(min-width: 1024px)');
  const { t } = useLanguage();
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
  const x = useSpring(rawX, { stiffness: 220, damping: 24, mass: 0.85 });

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
          <SnapRail label={t(ui.approach.railLabel)} onActiveChange={setActive} className="mt-fluid-lg">
            {approach.map((stage, index) => (
              <StageCard
                key={stage.id}
                index={index}
                step={stage.step}
                name={t(stage.name)}
                duration={`${t(ui.approach.stageSuffix)}${stage.step}`}
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
  const { t } = useLanguage();

  return (
    <div className="relative h-[340vh]">
      <div className="sticky top-0 flex min-h-screen flex-col justify-center py-[var(--section-y)]">
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

        {/*
          Track wrapper — this is where the reported clipping lived.

          The old markup was `overflow-hidden` on a box sized only by its
          content, so it clipped vertically on both axes at exactly the card
          box. Two things went wrong: the "Tahap 2" line sat hard against the
          card's bottom border with no air, and the active marker (a 1px rule
          at `bottom-0`) was shaved in half by the clip.

          Fixed structurally rather than by adding padding:
            · `overflow-x-clip` keeps the horizontal track from widening the
              document, but unlike `hidden` it does NOT establish a scroll
              container, so vertical overflow stays visible.
            · `py-2` gives the card box a lane above and below, so the border
              and the marker are drawn inside the clipper rather than at its
              edge.
            · `overflow-visible` on the axis that matters is the documented
              supported combination (one axis clipped, the other visible).
        */}
        <div className="mt-fluid-md overflow-x-clip overflow-y-visible py-2">
<motion.div ref={trackRef} style={{ x }} className="flex items-stretch gap-4 px-gutter will-change-transform">
            {approach.map((stage, index) => (
              <StageCard
                key={stage.id}
                index={index}
                step={stage.step}
                name={stage.name}
                duration={`${t(ui.approach.stageSuffix)}${stage.step}`}
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
  const { t } = useLanguage();

  return (
    <>
      <StickyIndex index={sectionIndex.approach.index} label={sectionIndex.approach.label} />
      {/*
        `lg:items-end` aligns the two blocks on their bottom edges. Because the
        paragraph is shorter than the two-line heading, its baseline lands well
        above the heading's — which reads as a floating orphan rather than a
        deliberate right-hand note. `lg:items-baseline` is wrong here for the
        opposite reason (it would push the paragraph down and out of the row).

        The fix is to stop treating them as one row and give the paragraph its
        own optical baseline: it is pinned to the heading's *last* line via
        `lg:mb-1`, so its final line reads as a caption against the title rather
        than a separate block floating mid-air.
      */}
      <Reveal
        delay={0.05}
        className="mt-fluid-md grid grid-cols-12 items-start gap-x-gutter gap-y-4 lg:items-end"
      >
        <h2 className="col-span-12 max-w-2xl text-balance text-fluid-5xl font-semibold leading-[0.95] text-[var(--text-primary)] lg:col-span-7">
          {t(ui.approach.title)}
        </h2>
        <p className="col-span-12 max-w-sm text-pretty text-sm leading-relaxed text-[var(--text-secondary)] lg:col-span-5 lg:mb-1 lg:text-right">
          {t(ui.approach.description)}
        </p>
      </Reveal>
    </>
  );
}

function DetailPanel({ current }: { current: (typeof approach)[number] }) {
  const { t, lang } = useLanguage();

  return (
    <div className="mt-fluid-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${current.id}-${lang}`}
          initial={{ opacity: 0, y: 16 }}
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
                <p className="swiss-index">
                  {t(ui.approach.stageSuffix)}
                  {current.step}
                </p>
                <h3 className="mt-1 font-display text-fluid-xl font-semibold tracking-tight text-[var(--text-primary)]">
                  {t(current.name)}
                </h3>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
              {t(current.description)}
            </p>
          </div>

          <div className="bg-[var(--accent-soft)] p-6 lg:p-8">
            <p className="swiss-index swiss-index-strong flex items-center gap-2">
              <Package className="icon-optical h-3 w-3" strokeWidth={2} />
              {t(ui.approach.deliverable)}
            </p>
            <p className="mt-3 max-w-[46ch] text-pretty text-sm leading-relaxed text-[var(--text-primary)]">
              {t(current.deliverable)}
            </p>
            <p className="mt-5 flex items-start gap-2 border-t border-[var(--border)] pt-4 text-xs leading-relaxed text-[var(--text-secondary)]">
              <CheckCircle2 className="icon-optical mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" strokeWidth={2} />
              {t(ui.approach.approvalNote)}
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
  /** Already-resolved string on the rail, a `Localized` on the pinned track. */
  name: string | (typeof approach)[number]['name'];
  duration: string;
  active: boolean;
  onActivate: () => void;
  /** Desktop pinned track only; the phone rail syncs through its scroll. */
  onHover?: (index: number) => void;
}) {
  const stage = approach[index];
  const Icon = stage.icon;
  const { t } = useLanguage();
  const node = useRef<HTMLButtonElement>(null);

  const label = typeof name === 'string' ? name : t(name);

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
      whileTap={{ scale: 0.985 }}
      transition={SPRING_TAP}
      aria-current={active}
      className={`rail-slide group card relative flex h-full flex-col text-left transition-colors duration-300 ease-editorial hover:border-[var(--accent)] lg:w-[24rem] lg:shrink-0 ${
        active ? 'border-[var(--accent)] shadow-lift' : ''
      }`}
    >
      {/*
        `pb-6` is load-bearing. The card previously ended right after the
        duration line with no bottom padding, so the text's descenders touched
        the 1px border and the active marker sat directly on top of both — the
        "Tahap 2" glyphs looked sliced by the card edge. Six units of bottom
        padding gives the line a full text-height of clearance.
      */}
      <div className="flex items-start justify-between gap-3">
        <IconBadge icon={Icon} size="lg" />
        <span className="swiss-index tabular">{step}</span>
      </div>

      <h3
        className={`mt-5 font-display text-xl font-semibold transition-colors duration-300 ${
          active ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
        }`}
      >
        {label}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{duration}</p>

      {/* Breathing room before the card closes, so the marker rule reads as an
          underline rather than as the card's own border doubled up. */}
      <div className="pb-6" aria-hidden />

      {active ? (
        <motion.span
          layoutId="stage-marker"
          className="absolute inset-x-5 bottom-0 h-px bg-[var(--accent)]"
          transition={SPRING}
        />
      ) : null}
    </motion.button>
  );
}
