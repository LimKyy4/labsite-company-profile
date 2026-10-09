import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, ArrowUpRight, Sparkles, X } from 'lucide-react';
import { problems, sectionIndex, solutions, type Problem } from '../data/companyData';
import { ui } from '../i18n/ui';
import { useLanguage } from '../context/LanguageContext';
import { useEscapeKey, useLockBodyScroll, useMediaQuery } from '../hooks';
import { Marquee } from './Marquee';
import {
  Hairline,
  IconBadge,
  Reveal,
  SnapRail,
  SPRING,
  SPRING_TAP,
  StickyIndex,
} from './ui';

export default function Problems() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { t } = useLanguage();
  const active = problems.find((problem) => problem.id === openId) ?? null;

  useLockBodyScroll(Boolean(active));
  useEscapeKey(Boolean(active), useCallback(() => setOpenId(null), []));

  return (
    <section id="problems" className="surface relative py-section">
      <Hairline className="absolute inset-x-0 top-0" />

      <div className="shell">
        <StickyIndex index={sectionIndex.problems.index} label={sectionIndex.problems.label} />
        <Reveal
          delay={0.05}
          className="mt-fluid-md flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <h2 className="max-w-[17ch] text-balance text-fluid-5xl font-semibold leading-[0.95] tracking-tight text-[var(--text-primary)]">
            {t(ui.problems.title)}
          </h2>
          {/* `lg:pb-1` is an optical correction, not padding: the paragraph's
              last line sits a descender lower than the heading's cap-height
              bottom, so a true `items-end` alignment reads as the paragraph
              hanging. One pixel restores the shared optical baseline. */}
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-[var(--text-secondary)] lg:text-right lg:pb-1">
            {t(ui.problems.description)}
          </p>
        </Reveal>
      </div>

      {/* Diagnostic ticker — the seven failure modes running as one continuous
          band. Full-bleed on purpose: it reads as an instrument strip, and the
          mask fades it into the gutter so it never needs side padding. */}
      <div className="relative mt-fluid-lg border-y border-[var(--border)] py-3">
        <Marquee
          duration={46}
          itemClassName="flex items-center gap-2.5 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]"
          gapClassName="gap-6"
          edgeClassName="pr-6"
        >
          {problems.map((problem) => (
            <span key={problem.id} className="flex items-center gap-2.5">
              <span>{t(problem.title)}</span>
              <span className="inline-block h-1 w-1 rotate-45 bg-[var(--accent)]" aria-hidden />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="shell">
        <SnapRail label={t(ui.problems.railLabel)} className="mt-fluid-lg">
          {problems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} onOpen={() => setOpenId(problem.id)} />
          ))}
        </SnapRail>
      </div>

      <AnimatePresence>
        {active ? <ProblemDrawer problem={active} onClose={() => setOpenId(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}

function ProblemCard({ problem, onOpen }: { problem: Problem; onOpen: () => void }) {
  const Icon = problem.icon;
  const { t } = useLanguage();

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={SPRING_TAP}
      className="group rail-slide card card-hover flex flex-col items-start p-5 text-left sm:p-6"
    >
      <div className="flex w-full items-start justify-between gap-4">
        <IconBadge icon={Icon} size="sm" />
        <ArrowUpRight
          className="h-4 w-4 text-[var(--text-muted)] transition-all duration-300 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
          strokeWidth={1.6}
        />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-[var(--text-primary)]">
        {t(problem.title)}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{t(problem.symptom)}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 swiss-index swiss-index-strong">
        {t(ui.problems.cardCta)}
        <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
      </span>
    </motion.button>
  );
}

/**
 * Bottom sheet on phones, side panel from `lg` up. The sheet exists so the
 * close affordance lands inside thumb reach instead of the top-right corner,
 * and so the whole panel is dismissable by dragging the scrim.
 */
function ProblemDrawer({ problem, onClose }: { problem: Problem; onClose: () => void }) {
  const wide = useMediaQuery('(min-width: 1024px)');
  const Icon = problem.icon;
  const { t } = useLanguage();
  const related = solutions.filter((pillar) => problem.pillars.includes(pillar.id));

  const hidden = wide ? { x: '100%' } : { y: '100%' };
  const shown = wide ? { x: 0 } : { y: 0 };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      className="fixed inset-0 z-[70] flex items-end justify-end bg-black/40 lg:items-stretch"
    >
      <motion.aside
        initial={hidden}
        animate={shown}
        exit={hidden}
        transition={SPRING}
        onClick={(event) => event.stopPropagation()}
        className="surface flex max-h-[86dvh] w-full flex-col overflow-y-auto rounded-t-3xl border-t border-[var(--border)] lg:max-h-none lg:h-full lg:max-w-xl lg:rounded-none lg:rounded-l-3xl lg:border-l lg:border-t-0"
      >
        <header className="flex items-start justify-between gap-6 border-b border-[var(--border)] p-5 sm:p-7">
          <div className="flex items-start gap-4">
            <IconBadge icon={Icon} />
            <div>
              <p className="swiss-index">{t(ui.problems.drawerEyebrow)}</p>
              <h3
                id="drawer-title"
                className="mt-2 font-display text-fluid-xl font-semibold tracking-tight text-[var(--text-primary)]"
              >
                {t(problem.title)}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t(ui.problems.drawerClose)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 space-y-6 p-5 sm:p-7">
          <div>
            <p className="swiss-index flex items-center gap-2">
              <AlertTriangle className="h-3 w-3" strokeWidth={2} />
              {t(ui.problems.drawerSymptom)}
            </p>
            <p className="mt-3 max-w-[62ch] text-pretty text-sm leading-relaxed text-[var(--text-primary)]">
              {t(problem.symptom)}
            </p>
          </div>

          <div>
            <p className="swiss-index">{t(ui.problems.drawerImpact)}</p>
            <p className="mt-3 max-w-[62ch] text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
              {t(problem.impact)}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] p-5">
            <p className="swiss-index swiss-index-strong flex items-center gap-2">
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              {t(ui.problems.drawerResolution)}
            </p>
            <p className="mt-3 max-w-[58ch] text-pretty leading-relaxed text-[var(--text-primary)]">
              {t(problem.solution)}
            </p>
          </div>

          {related.length ? (
            <div>
              <p className="swiss-index">{t(ui.problems.drawerRelated)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {related.map((pillar) => {
                  const PillarIcon = pillar.icon;
                  return (
                    <span key={pillar.id} className="chip">
                      <PillarIcon className="h-3 w-3" strokeWidth={2} />
                      {t(pillar.name)}
                    </span>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </motion.aside>
    </motion.div>
  );
}