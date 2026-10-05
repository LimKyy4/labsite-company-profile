import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { belief, focus } from '../data/companyData';
import { EDITORIAL, IconBadge, RevealGroup, RevealItem, Section } from './ui';

export default function FocusBelief() {
  const [active, setActive] = useState(0);
  const current = focus.stages[active];

  return (
    <Section
      id="focus"
      label="FOCUS & BELIEF"
      invert
      title={
        <>
          {focus.headline}
        </>
      }
      description="Empat tahap yang selalu kami jalankan, apa pun masalah yang dibawa klien."
    >
      <div className="mt-14 grid grid-cols-12 gap-4">
        <RevealGroup className="col-span-12 grid gap-3 sm:grid-cols-2 lg:col-span-7">
          {focus.stages.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = index === active;
            return (
              <RevealItem key={stage.name}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={isActive}
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 text-left transition-all duration-300 ease-editorial hover:-translate-y-1 hover:border-[var(--accent)] sm:p-7"
                >
                  {isActive ? (
                    <motion.span
                      layoutId="focus-rail"
                      className="absolute inset-y-0 left-0 w-[3px] bg-[var(--accent)]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  ) : null}

                  <div className="flex w-full items-center justify-between">
                    <IconBadge icon={Icon} size="sm" />
                    <span className="font-display text-2xl font-semibold tabular text-[var(--text-muted)] opacity-40 transition-opacity duration-300 group-hover:opacity-100">
                      {stage.step}
                    </span>
                  </div>

                  <h3
                    className={`mt-6 font-display text-xl font-semibold transition-colors duration-300 ${
                      isActive ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
                    }`}
                  >
                    {stage.name}
                  </h3>
                  <p className="mt-2.5 max-w-[48ch] text-sm leading-relaxed text-[var(--text-secondary)]">
                    {stage.description}
                  </p>
                </button>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <RevealGroup className="col-span-12 flex flex-col gap-4 lg:col-span-5">
          <RevealItem>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: EDITORIAL }}
                className="rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-8"
              >
                <p className="swiss-index swiss-index-strong">Tahap {current.step}</p>
                <h3 className="mt-4 font-display text-fluid-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                  {current.name}
                </h3>
                <p className="mt-4 max-w-[58ch] text-pretty leading-relaxed text-[var(--text-secondary)]">
                  {current.description}
                </p>
                <a
                  href="#approach"
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
                >
                  Lihat tahap metodologinya
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </a>
              </motion.div>
            </AnimatePresence>
          </RevealItem>

          <RevealItem className="flex-1">
            <figure className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border)] p-8">
              <div>
                <p className="swiss-index">Our Belief</p>
                <blockquote className="mt-6 border-l-2 border-[var(--accent)] pl-6 max-w-[40ch] text-pretty font-display text-fluid-xl font-medium leading-snug tracking-tight text-[var(--text-primary)]">
                  {belief.quote}
                </blockquote>
              </div>
              <ul className="mt-8 space-y-3 border-t border-[var(--border)] pt-6">
                {belief.points.map((point) => (
                  <li key={point} className="flex max-w-[62ch] gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    <span className="mt-2.5 h-px w-3 shrink-0 bg-[var(--accent)]" aria-hidden />
                    <span>{point}</span>
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
