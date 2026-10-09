import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { solutions, sectionIndex } from '../data/companyData';
import { useMediaQuery } from '../hooks';
import ArchitectureViewer from './ArchitectureViewer';
import {
  EDITORIAL,
  Hairline,
  IconBadge,
  Reveal,
  RevealGroup,
  RevealItem,
  SnapRail,
  SPRING,
  SPRING_TAP,
  StickyIndex,
} from './ui';

export default function Solutions() {
  const [activeId, setActiveId] = useState(solutions[0].id);
  const wide = useMediaQuery('(min-width: 1024px)');
  const active = solutions.find((pillar) => pillar.id === activeId) ?? solutions[0];
  const ActiveIcon = active.icon;

  return (
    <section id="solutions" className="surface relative py-section">
      <Hairline className="absolute inset-x-0 top-0" />

      <div className="shell">
        <StickyIndex index={sectionIndex.solutions.index} label={sectionIndex.solutions.label} />
        <Reveal
          delay={0.05}
          className="mt-fluid-md flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <h2 className="max-w-[15ch] text-balance text-fluid-5xl font-semibold leading-[0.95] tracking-tight text-[var(--text-primary)]">
            Empat pilar. Satu arsitektur.
          </h2>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-[var(--text-secondary)] lg:text-right">
            Setiap pilar berdiri sendiri atau digabung, tergantung masalah yang benar-benar Anda
            hadapi — bukan tergantung paket yang paling mahal.
          </p>
        </Reveal>

        {/* The diagram comes before the pillar tabs: prospects arrive with a
            problem, not with a shopping list, so show them the path first. */}
        <Reveal delay={0.1} className="mt-fluid-lg">
          <ArchitectureViewer />
        </Reveal>

        <div
          role="tablist"
          aria-label="Pilar arsitektur"
          className="mt-fluid-xl flex flex-wrap gap-2 lg:pb-6 lg:border-b lg:border-[var(--border)]"
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
                className={`relative flex items-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] transition-colors duration-300 lg:px-5 lg:py-3 ${
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
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.32, ease: EDITORIAL }}
            className="mt-fluid-md grid grid-cols-12 gap-4"
          >
            <div className="col-span-12 rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-5 sm:p-6 lg:col-span-4 lg:p-9">
              <IconBadge icon={ActiveIcon} size="lg" />
              <h3 className="mt-5 font-display text-fluid-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                {active.name}
              </h3>
              <p className="mt-3 max-w-[46ch] text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
                {active.summary}
              </p>
              <p className="mt-5 border-t border-[var(--border)] pt-4 swiss-index swiss-index-strong">
                {active.features.length} modul dalam pilar ini
              </p>
            </div>

            {wide ? (
              <RevealGroup key={active.id} className="col-span-12 grid gap-4 sm:grid-cols-2 lg:col-span-8">
                {active.features.map((feature) => (
                  <RevealItem key={feature.name}>
                    <FeatureCard feature={feature} />
                  </RevealItem>
                ))}
              </RevealGroup>
            ) : (
              <div className="col-span-12">
                <SnapRail key={active.id} label={`Modul pada pilar ${active.name}`}>
                  {active.features.map((feature) => (
                    <motion.div
                      key={feature.name}
                      whileTap={{ scale: 0.975 }}
                      transition={SPRING_TAP}
                      className="rail-slide"
                    >
                      <FeatureCard feature={feature} />
                    </motion.div>
                  ))}
                </SnapRail>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: (typeof solutions)[number]['features'][number] }) {
  const Icon = feature.icon;

  return (
    <div className="group card card-hover h-full rounded-2xl p-5 transition-transform duration-300 ease-editorial hover:-translate-y-1 sm:p-6">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--accent-soft)] text-[var(--accent)] transition-transform duration-300 ease-editorial group-hover:-translate-y-1">
        <Icon className="h-5 w-5" strokeWidth={1.6} />
      </span>
      <h4 className="mt-4 font-display font-semibold tracking-tight text-[var(--text-primary)]">
        {feature.name}
      </h4>
      <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-[var(--text-secondary)]">
        {feature.detail}
      </p>
    </div>
  );
}
