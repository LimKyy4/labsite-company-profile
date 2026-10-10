import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { belief, focus, sectionIndex } from '../data/companyData';
import { ui } from '../i18n/ui';
import { useLanguage } from '../context/LanguageContext';
import { useMediaQuery } from '../hooks';
import {
  EDITORIAL,
  IconBadge,
  RevealGroup,
  RevealItem,
  Section,
  SnapRail,
  SPRING,
  SPRING_TAP,
} from './ui';

export default function FocusBelief() {
  const [active, setActive] = useState(0);
  const wide = useMediaQuery('(min-width: 640px)');
  const { t, lang } = useLanguage();
  const current = focus.stages[active];

  return (
    <Section
      id="focus"
      index={sectionIndex.focus.index}
      label={sectionIndex.focus.label}
      invert
      title={<>{t(focus.headline)}</>}
      description={t(ui.focus.description)}
    >
      <div className="mt-fluid-lg grid grid-cols-12 gap-4">
        {wide ? (
          <RevealGroup className="col-span-12 grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {focus.stages.map((stage, index) => (
              <RevealItem key={stage.id}>
                <FocusCard stage={stage} active={index === active} onSelect={() => setActive(index)} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <div className="col-span-12">
            <SnapRail label={t(ui.focus.railLabel)} counterPrefix="STAGE" onActiveChange={setActive}>
              {focus.stages.map((stage, index) => (
                <div key={stage.id} className="rail-slide">
                  <FocusCard stage={stage} active={index === active} onSelect={() => setActive(index)} />
                </div>
              ))}
            </SnapRail>
          </div>
        )}

        <RevealGroup className="col-span-12 flex flex-col gap-4 lg:col-span-5">
          <RevealItem>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${current.id}-${lang}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EDITORIAL }}
                className="rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-6 sm:p-8"
              >
                <p className="swiss-index swiss-index-strong flex items-center gap-3">
                  {t(ui.focus.stagePrefix)}{current.step}
                </p>
                <h3 className="mt-3 font-display text-fluid-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                  {t(current.name)}
                </h3>
                <p className="mt-3 max-w-[58ch] text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
                  {t(current.description)}
                </p>
                <a
                  href="#approach"
                  className="group mt-4 -my-2 inline-flex min-h-[var(--touch)] items-center gap-2 py-2 text-sm font-semibold text-[var(--accent)] active:scale-[0.99]"
                >
                  {t(ui.focus.methodologyLink)}
                  <ArrowRight
                    className="icon-optical h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </a>
              </motion.div>
            </AnimatePresence>
          </RevealItem>

          <RevealItem className="flex-1">
            <figure className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border)] p-6 sm:p-8">
              <div>
                <p className="swiss-index">{t(ui.focus.beliefEyebrow)}</p>
                <blockquote className="mt-4 max-w-[40ch] border-l-2 border-[var(--accent)] pl-5 text-pretty font-display text-fluid-xl font-medium leading-snug tracking-tight text-[var(--text-primary)]">
                  {t(belief.quote)}
                </blockquote>
              </div>
              <ul className="mt-6 space-y-3 border-t border-[var(--border)] pt-5">
                {belief.points.map((point) => (
                  <li key={point.id} className="flex max-w-[62ch] gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    <span className="mt-2.5 h-px w-3 shrink-0 bg-[var(--accent)]" aria-hidden />
                    <span>{t(point)}</span>
                  </li>
                ))}
              </ul>
            </figure>
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  );
}

function FocusCard({
  stage,
  active,
  onSelect,
}: {
  stage: (typeof focus.stages)[number];
  active: boolean;
  onSelect: () => void;
}) {
  const Icon = stage.icon;
  const { t } = useLanguage();

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      whileTap={{ scale: 0.985 }}
      transition={SPRING_TAP}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-[var(--bg-elevated)] p-6 text-left transition-colors duration-300 ease-editorial hover:border-[var(--accent)] ${
        active ? 'border-[var(--accent)]' : 'border-[var(--border)]'
      }`}
    >
      {active ? (
        <motion.span
          layoutId="focus-rail"
          className="absolute inset-y-0 left-0 w-[3px] bg-[var(--accent)]"
          transition={SPRING}
        />
      ) : null}

      <div className="flex w-full items-center justify-between">
        <IconBadge icon={Icon} size="sm" />
        <span className="font-display text-2xl font-semibold tabular text-[var(--text-muted)] opacity-40 transition-opacity duration-300 group-hover:opacity-100">
          {stage.step}
        </span>
      </div>

      <h3
        className={`mt-5 font-display text-xl font-semibold transition-colors duration-300 ${
          active ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
        }`}
      >
        {t(stage.name)}
      </h3>
      <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-[var(--text-secondary)]">
        {t(stage.description)}
      </p>
    </motion.button>
  );
}