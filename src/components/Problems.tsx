import { useCallback, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, ArrowUpRight, Sparkles, X } from 'lucide-react';
import { problems, solutions, type Problem } from '../data/companyData';
import { useEscapeKey, useLockBodyScroll, useReducedMotion } from '../hooks';
import { EDITORIAL, Hairline, IconBadge, Reveal, SPRING, SwissIndex } from './ui';

export default function Problems() {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const active = problems.find((problem) => problem.id === openId) ?? null;

  useLockBodyScroll(Boolean(active));
  useEscapeKey(Boolean(active), useCallback(() => setOpenId(null), []));

  // Duplicated once so the -50% translate wraps seamlessly.
  const track = [...problems, ...problems];

  return (
    <section id="problems" className="surface relative py-section">
      <Hairline className="absolute inset-x-0 top-0" />

      <div className="shell">
        <Reveal>
          <SwissIndex index="02" label="COMMON PROBLEMS" />
        </Reveal>
        <Reveal delay={0.05} className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-3xl text-balance text-fluid-5xl font-semibold leading-[0.95] text-[var(--text-primary)]">
            Tujuh masalah yang paling sering menghambat pertumbuhan bisnis lokal.
          </h2>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-[var(--text-secondary)] lg:text-right">
            Berjalan otomatis, berhenti saat kursor diarahkan. Klik kartu untuk melihat bagaimana
            LABSITE.ID menyelesaikannya.
          </p>
        </Reveal>
      </div>

      {/* Edge-to-edge: intentionally outside .shell so cards bleed to both margins. */}
      <div className="marquee-viewport fade-edge-x relative mt-14 overflow-hidden [--edge:4rem]">
        <div
          className={`marquee-track flex w-max gap-4 px-2 ${reduced ? '' : 'animate-marquee'}`}
          style={reduced ? undefined : ({ '--marquee-duration': '58s' } as CSSProperties)}
        >
          {track.map((problem, index) => (
            <ProblemCard
              key={`${problem.id}-${index}`}
              problem={problem}
              onOpen={() => setOpenId(problem.id)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? <ProblemDrawer problem={active} onClose={() => setOpenId(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}

function ProblemCard({ problem, onOpen }: { problem: Problem; onOpen: () => void }) {
  const Icon = problem.icon;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EDITORIAL }}
      className="group card card-hover flex w-[20rem] shrink-0 flex-col items-start p-6 text-left sm:w-[22rem] sm:p-7"
    >
      <div className="flex w-full items-start justify-between gap-4">
        <IconBadge icon={Icon} size="sm" />
        <ArrowUpRight
          className="h-4 w-4 text-[var(--text-muted)] transition-all duration-300 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
          strokeWidth={1.6}
        />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-[var(--text-primary)]">
        {problem.title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">{problem.symptom}</p>
      <span className="mt-6 swiss-index swiss-index-strong opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Solusi
      </span>
    </motion.button>
  );
}

function ProblemDrawer({ problem, onClose }: { problem: Problem; onClose: () => void }) {
  const Icon = problem.icon;
  const related = solutions.filter((pillar) => problem.pillars.includes(pillar.id));

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
      className="fixed inset-0 z-[70] flex items-stretch justify-end bg-black/35 backdrop-blur-sm"
    >
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={SPRING}
        onClick={(event) => event.stopPropagation()}
        className="surface flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-[var(--border)]"
      >
        <header className="flex items-start justify-between gap-6 border-b border-[var(--border)] p-7 sm:p-8">
          <div className="flex items-start gap-4">
            <IconBadge icon={Icon} />
            <div>
              <p className="swiss-index">Problem</p>
              <h3
                id="drawer-title"
                className="mt-2 font-display text-fluid-xl font-semibold tracking-tight text-[var(--text-primary)]"
              >
                {problem.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 space-y-8 p-7 sm:p-8">
          <div>
            <p className="swiss-index flex items-center gap-2">
              <AlertTriangle className="h-3 w-3" strokeWidth={2} />
              Gejala
            </p>
            <p className="mt-3 max-w-[62ch] text-pretty text-sm leading-relaxed text-[var(--text-primary)]">
              {problem.symptom}
            </p>
          </div>

          <div>
            <p className="swiss-index">Dampak bisnis</p>
            <p className="mt-3 max-w-[62ch] text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
              {problem.impact}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent-soft)] p-6">
            <p className="swiss-index swiss-index-strong flex items-center gap-2">
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              Bagaimana LABSITE.ID menyelesaikannya
            </p>
            <p className="mt-3 max-w-[58ch] text-pretty leading-relaxed text-[var(--text-primary)]">
              {problem.solution}
            </p>
          </div>

          {related.length ? (
            <div>
              <p className="swiss-index">Pilar solusi terkait</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {related.map((pillar) => {
                  const PillarIcon = pillar.icon;
                  return (
                    <span key={pillar.id} className="chip">
                      <PillarIcon className="h-3 w-3" strokeWidth={2} />
                      {pillar.name}
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
