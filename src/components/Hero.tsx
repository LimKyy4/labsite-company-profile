import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { brand, diagnosticOptions, heroStats, type HeroStat } from '../data/companyData';
import { useCountUp, useMagnetic } from '../hooks';
import {
  EDITORIAL,
  MagneticTap,
  StatusDot,
  welcomeItem,
  welcomeSequence,
} from './ui';

export default function Hero() {
  const [selectedId, setSelectedId] = useState(diagnosticOptions[0].id);
  const selected = diagnosticOptions.find((o) => o.id === selectedId) ?? diagnosticOptions[0];
  const panelMagnetic = useMagnetic(0.1);

  return (
    <section id="hero" className="surface relative overflow-hidden pb-section pt-32 sm:pt-40">
      <div className="shell">
        {/* Poster headline: full-bleed with explicit editorial line breaks.
            Inside the 7/12 column each word wrapped alone; here each line is
            composed deliberately and scales from mobile to ultra-wide. */}
        <motion.div variants={welcomeSequence} initial="hidden" animate="show">
          <motion.div variants={welcomeItem} className="flex items-center gap-3">
            <span className="chip">
              <Sparkles className="h-3 w-3 text-[var(--accent)]" strokeWidth={2} />
              {brand.tagline}
            </span>
            <StatusDot label="Available" />
          </motion.div>

          <motion.h1
            variants={welcomeItem}
            className="mt-8 text-fluid-4xl font-semibold leading-[0.94] tracking-[-0.035em] text-[var(--text-primary)] sm:text-fluid-5xl lg:text-fluid-6xl"
          >
            <span className="block">Solving Real Business</span>
            <span className="block">Problems Through</span>
            <span className="block text-[var(--accent)]">Targeted Technology.</span>
          </motion.h1>
        </motion.div>

        <div className="mt-12 grid grid-cols-12 items-start gap-x-gutter gap-y-12 lg:mt-16">
          <motion.div
            variants={welcomeSequence}
            initial="hidden"
            animate="show"
            className="col-span-12 lg:col-span-7"
          >
            <motion.p
              variants={welcomeItem}
              className="max-w-xl text-pretty text-fluid-lg leading-relaxed text-[var(--text-secondary)]"
            >
              {brand.subtitle}
            </motion.p>

            <motion.div variants={welcomeItem} className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticTap href="#contact" icon={ArrowRight}>
                Konsultasi Masalah Anda
              </MagneticTap>
              <MagneticTap href="#work" variant="secondary" icon={ArrowUpRight}>
                Lihat Portofolio
              </MagneticTap>
            </motion.div>

            <motion.ul
              variants={welcomeItem}
              className="mt-10 flex max-w-xl flex-wrap gap-x-8 gap-y-3 border-t border-[var(--border)] pt-6"
            >
              {['UMKM & bisnis lokal', 'Diagnosis sebelum solusi', 'Mitra jangka panjang'].map((item) => (
                <li key={item} className="swiss-index normal-case tracking-[0.12em]">
                  {item}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.3, ease: EDITORIAL }}
            className="col-span-12 lg:col-span-5"
          >
            <motion.div style={{ x: panelMagnetic.x, y: panelMagnetic.y }} {...panelMagnetic.handlers}>
              <div className="card overflow-hidden rounded-2xl">
                <div className="flex items-center gap-3 border-b border-[var(--border)] px-6 py-4">
                  <Activity className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.6} />
                  <h2 className="font-display text-sm font-medium">Business Diagnostic</h2>
                  <StatusDot label="Live" className="ml-auto" />
                </div>

                <div className="p-6 sm:p-7">
                  <p className="text-sm text-[var(--text-secondary)]">
                    Pilih hambatan utama bisnis Anda.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {diagnosticOptions.map((option) => {
                      const isActive = option.id === selected.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedId(option.id)}
                          aria-pressed={isActive}
                          className={`rounded-full border px-4 py-2.5 text-left text-xs font-medium transition-all duration-300 ease-editorial ${
                            isActive
                              ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]'
                              : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selected.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.34, ease: EDITORIAL }}
                      className="mt-6 rounded-xl border border-[var(--accent)]/25 bg-[var(--accent-soft)] p-5"
                    >
                      <p className="swiss-index swiss-index-strong">Rekomendasi</p>
                      <p className="mt-2.5 font-medium leading-snug text-[var(--text-primary)]">
                        {selected.headline}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {selected.recommendation}
                      </p>
                      <span className="mt-4 inline-flex rounded-full border border-[var(--accent)]/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
                        {selected.pillar}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={welcomeSequence}
          initial="hidden"
          animate="show"
          className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3"
        >
          {heroStats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={welcomeItem}
              className="bg-[var(--bg)] p-7 transition-colors duration-500 hover:bg-[var(--accent-soft)] sm:p-9"
            >
              <p className="swiss-index">{stat.label}</p>
              <StatValue stat={stat} />
              <p className="mt-3 text-xs leading-relaxed text-[var(--text-secondary)]">{stat.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

type CountedStat = Extract<HeroStat, { count: number }>;

function StatValue({ stat }: { stat: HeroStat }) {
  if ('count' in stat) return <CountedStatValue stat={stat} />;

  return (
    <p className="mt-3 font-display text-fluid-2xl font-semibold tracking-tight tabular text-[var(--text-primary)]">
      {stat.value}
    </p>
  );
}

/** Split out so useCountUp is only ever called by the counted variant. */
function CountedStatValue({ stat }: { stat: CountedStat }) {
  const animated = useCountUp(stat.count);

  return (
    <p className="mt-3 font-display text-fluid-2xl font-semibold tracking-tight tabular text-[var(--text-primary)]">
      <span ref={animated.ref}>{animated.value}</span>
      <span className="text-[var(--accent)]">{stat.suffix}</span>
    </p>
  );
}
