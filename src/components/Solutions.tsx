import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { solutions } from '../data/companyData';
import {
  EDITORIAL,
  Hairline,
  IconBadge,
  Reveal,
  RevealGroup,
  RevealItem,
  SPRING,
  SwissIndex,
} from './ui';

export default function Solutions() {
  const [activeId, setActiveId] = useState(solutions[0].id);
  const active = solutions.find((pillar) => pillar.id === activeId) ?? solutions[0];
  const ActiveIcon = active.icon;

  return (
    <section id="solutions" className="surface relative py-section">
      <Hairline className="absolute inset-x-0 top-0" />

      <div className="shell">
        <Reveal>
          <SwissIndex index="04" label="OUR SOLUTIONS" />
        </Reveal>
        <Reveal delay={0.05} className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl text-balance text-fluid-5xl font-semibold leading-[0.95] text-[var(--text-primary)]">
            Empat pilar, satu arah.
          </h2>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-[var(--text-secondary)] lg:text-right">
            Setiap pilar bisa berdiri sendiri atau digabungkan, tergantung masalah yang benar-benar
            Anda hadapi.
          </p>
        </Reveal>

        <div
          role="tablist"
          aria-label="Pilar solusi"
          className="mt-12 flex flex-wrap gap-2 border-b border-[var(--border)] pb-6"
        >
          {solutions.map((pillar) => {
            const Icon = pillar.icon;
            const isActive = pillar.id === active.id;
            return (
              <button
                key={pillar.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveId(pillar.id)}
                className={`relative flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-[var(--accent-contrast)]'
                    : 'border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]'
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="solution-tab"
                    className="absolute inset-0 rounded-full bg-[var(--accent)]"
                    transition={SPRING}
                  />
                ) : null}
                <Icon className="relative z-10 h-4 w-4" strokeWidth={1.6} />
                <span className="relative z-10">{pillar.name}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            role="tabpanel"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.34, ease: EDITORIAL }}
            className="mt-10 grid grid-cols-12 gap-4"
          >
            <div className="col-span-12 rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-8 lg:col-span-4 lg:p-10">
              <IconBadge icon={ActiveIcon} size="lg" />
              <h3 className="mt-8 font-display text-fluid-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                {active.name}
              </h3>
              <p className="mt-4 max-w-[46ch] text-pretty leading-relaxed text-[var(--text-secondary)]">
                {active.summary}
              </p>
              <p className="mt-8 border-t border-[var(--border)] pt-6 swiss-index swiss-index-strong">
                {active.features.length} layanan dalam pilar ini
              </p>
            </div>

            <RevealGroup key={active.id} className="col-span-12 grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {active.features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <RevealItem key={feature.name}>
                    <div className="group card card-hover h-full rounded-2xl p-6 hover:-translate-y-1">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--accent-soft)] text-[var(--accent)] transition-transform duration-300 ease-editorial group-hover:-translate-y-1">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <h4 className="mt-5 font-display font-semibold text-[var(--text-primary)]">
                        {feature.name}
                      </h4>
                      <p className="mt-2.5 max-w-[48ch] text-sm leading-relaxed text-[var(--text-secondary)]">
                        {feature.detail}
                      </p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
