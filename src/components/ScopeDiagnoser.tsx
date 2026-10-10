import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, ArrowUpRight, Cpu, Layers, Scale } from 'lucide-react';
import {
  diagnosticOptions,
  pillarLookup,
  scaleSteps,
  type DiagnosticOption,
} from '../data/companyData';
import { ui } from '../i18n/ui';
import { useLanguage } from '../context/LanguageContext';
import { useMediaQuery } from '../hooks';
import { EDITORIAL, SnapRail, SPRING, SPRING_TAP } from './ui';

/**
 * Interactive Scope Diagnoser.
 *
 * Two thumb-sized inputs — "what breaks" and "how big are you" — resolve to one
 * concrete engineering recommendation. Deliberately not a form: nothing is
 * submitted, nothing is validated, no email gate. A prospect should get to a
 * useful answer before deciding whether they trust us enough to write.
 *
 * The scale step is what makes it a *scope* tool rather than a feature list:
 * the same problem gets a different depth of answer at 3 users versus 200.
 */
export default function ScopeDiagnoser() {
  const [optionId, setOptionId] = useState<DiagnosticOption['id']>(diagnosticOptions[0].id);
  const [scaleId, setScaleId] = useState(scaleSteps[1].id);

  const wide = useMediaQuery('(min-width: 1024px)');
  const { t, lang } = useLanguage();
  const selected = diagnosticOptions.find((o) => o.id === optionId) ?? diagnosticOptions[0];
  const scale = scaleSteps.find((s) => s.id === scaleId) ?? scaleSteps[0];
  const pillar = pillarLookup[selected.pillar];
  const PillarIcon = pillar.icon;

  // Reorder the scale's module list so anything this pillar actually owns is
  // read first. Stable sort, so the order is deterministic between renders.
  // Keys are compared on the Indonesian variant because that is the stable
  // identity of a module; the pair object changes shape with the language but
  // `.id` does not.
  const pillarFeatures = pillar.features.map((feature) => feature.name.id);
  const modules = [...scale.modules].sort(
    (a, b) => Number(pillarFeatures.includes(a.id)) - Number(pillarFeatures.includes(b.id)),
  );

  return (
    <div className="card overflow-hidden rounded-2xl">
      <header className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3 sm:px-5">
        <Activity className="icon-optical h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={1.6} />
        <h2 className="font-display text-sm font-medium tracking-tight">{t(ui.diagnoser.title)}</h2>
        <span className="ml-auto flex items-center gap-2">
          <span className="status-pulse" aria-hidden />
          <span className="swiss-index swiss-index-nowrap">{t(ui.diagnoser.live)}</span>
        </span>
      </header>

      <div className="p-4 sm:p-6">
        {/* ---- Input 1: which operation is failing ---- */}
        <fieldset>
          <legend className="swiss-index">{t(ui.diagnoser.legendProblem)}</legend>
          {wide ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {diagnosticOptions.map((option) => (
                <OptionPill
                  key={option.id}
                  label={t(option.label)}
                  active={option.id === selected.id}
                  onSelect={() => setOptionId(option.id)}
                />
              ))}
            </div>
          ) : (
            <SnapRail label={t(ui.diagnoser.railLabel)} indicator="bar" counterPrefix="OPTION" snap={false} className="mt-3">
              {diagnosticOptions.map((option) => (
                <OptionPill
                  key={option.id}
                  label={t(option.label)}
                  active={option.id === selected.id}
                  onSelect={() => setOptionId(option.id)}
                />
              ))}
            </SnapRail>
          )}
        </fieldset>

        {/* ---- Input 2: how big is the operation ---- */}
        <fieldset className="mt-5">
          <legend className="swiss-index flex items-center gap-1.5">
            <Scale className="icon-optical h-3 w-3" strokeWidth={2} />
            {t(ui.diagnoser.legendScale)}
          </legend>
          <div className="mt-3 grid grid-cols-5 gap-1.5" role="radiogroup" aria-label={t(ui.diagnoser.scaleAria)}>
            {scaleSteps.map((step, index) => {
              const active = step.id === scale.id;
              return (
                <motion.button
                  key={step.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setScaleId(step.id)}
                  whileTap={{ scale: 0.96 }}
                  transition={SPRING_TAP}
                  className={`relative flex min-h-[var(--touch)] min-w-0 flex-col items-center justify-center gap-1 rounded-lg border px-1 py-2.5 transition-colors duration-300 active:scale-[0.97] ${
                    active
                      ? 'border-[var(--accent)] text-[var(--accent-contrast)]'
                      : 'border-[var(--border)] text-[var(--text-secondary)]'
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="scope-scale"
                      className="absolute inset-0 rounded-lg bg-[var(--accent)]"
                      transition={SPRING}
                    />
                  ) : null}
                  <span className="relative z-10 font-mono text-[11px] font-medium leading-none tabular">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="relative z-10 hidden text-[9px] leading-tight sm:block">
                    {t(step.range)}
                  </span>
                </motion.button>
              );
            })}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`${scale.id}-${lang}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.24, ease: EDITORIAL }}
              className="mt-2.5 text-[11px] leading-relaxed text-[var(--text-muted)]"
            >
              <span className="font-medium text-[var(--text-secondary)]">{t(scale.label)}</span>{' '}
              · {t(scale.depth)}
            </motion.p>
          </AnimatePresence>
        </fieldset>

        {/* ---- Output ---- */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${selected.id}-${scale.id}-${lang}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EDITORIAL }}
            className="mt-5 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] p-4 sm:p-5"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--accent)]/40 bg-[var(--bg-elevated)] text-[var(--accent)]">
                <PillarIcon className="icon-optical h-4 w-4" strokeWidth={1.7} />
              </span>
              <div className="min-w-0">
                <p className="swiss-index swiss-index-strong">{t(ui.diagnoser.recommendationTitle)}</p>
                <p className="mt-1.5 font-display text-base font-semibold leading-snug tracking-tight text-[var(--text-primary)]">
                  {t(pillar.name)}
                </p>
              </div>
            </div>

            <p className="mt-3.5 text-sm leading-relaxed text-[var(--text-secondary)]">
              {t(selected.recommendation)}
            </p>

            <div className="mt-4 border-t border-[var(--border)] pt-3.5">
              <p className="swiss-index flex items-center gap-1.5">
                <Layers className="icon-optical h-3 w-3" strokeWidth={2} />
                {t(ui.diagnoser.stackTitle)} {t(scale.label)}
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {modules.map((module) => (
                  <li key={module.id} className="chip normal-case tracking-normal">
                    {t(module)}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#architecture"
              className="group mt-2 -my-2 inline-flex min-h-[var(--touch)] items-center gap-1.5 py-2 swiss-index swiss-index-strong"
            >
              {t(ui.diagnoser.viewDiagram)}
              <ArrowUpRight
                className="icon-optical h-3 w-3 transition-transform duration-300 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </a>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center gap-2 border-t border-[var(--border)] pt-3.5">
          <Cpu className="icon-optical h-3 w-3 shrink-0 text-[var(--text-muted)]" strokeWidth={1.8} />
          <p className="font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.14em] text-[var(--text-muted)]">
            {t(ui.diagnoser.footnote)}
          </p>
        </div>
      </div>
    </div>
  );
}

function OptionPill({
  label,
  active,
  onSelect,
}: {
  label: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      whileTap={{ scale: 0.96 }}
      transition={SPRING_TAP}
      className={`flex min-h-[var(--touch)] shrink-0 items-center rounded-full border px-3.5 py-2 text-[11px] font-medium transition-colors duration-300 ease-editorial active:scale-[0.97] ${
        active
          ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]'
          : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]'
      }`}
    >
      {label}
    </motion.button>
  );
}