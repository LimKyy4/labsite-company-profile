import { motion } from 'framer-motion';
import { ArrowUpRight, Boxes, Cpu, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { brand, engineeringMarks, heroStats, sectionIndex, systemStatus, type HeroStat } from '../data/companyData';
import { useCountUp, useMagnetic, useMediaQuery } from '../hooks';
import ScopeDiagnoser from './ScopeDiagnoser';
import {
  MagneticTap,
  SnapRail,
  SwissIndex,
  welcomeItem,
  welcomeSequence,
} from './ui';

const MARKS = [
  { label: engineeringMarks[0], icon: Boxes },
  { label: engineeringMarks[1], icon: Cpu },
  { label: engineeringMarks[2], icon: Zap },
  { label: engineeringMarks[3], icon: ShieldCheck },
];

export default function Hero() {
  const wide = useMediaQuery('(min-width: 1024px)');
  const panelMagnetic = useMagnetic(0.1);

  return (
    <section id="hero" className="surface relative overflow-hidden pb-section pt-24 sm:pt-28 lg:pt-36">
      <div className="shell">
        {/* ── Masthead ──────────────────────────────────────────────── */}
        <motion.div variants={welcomeSequence} initial="hidden" animate="show">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <SwissIndex index={sectionIndex.hero.index} label={sectionIndex.hero.label} />
            <motion.span
              variants={welcomeItem}
              className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]"
            >
              <span className="status-pulse" aria-hidden />
              {systemStatus.state}
            </motion.span>
          </div>

          <motion.h1
            variants={welcomeItem}
            className="mt-5 max-w-[20ch] text-balance text-[1.9rem] font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)] sm:mt-6 sm:text-fluid-4xl lg:text-fluid-5xl lg:leading-[0.96]"
          >
            Kami mentransformasi operasional{' '}
            <span className="text-[var(--accent)]">
              yang berantakan menjadi sistem digital
            </span>{' '}
            yang otomatis, andal, dan terukur.
          </motion.h1>
        </motion.div>

        {/* ── 65 / 35 asymmetric split ──────────────────────────────── */}
        <div className="mt-fluid-lg grid grid-cols-12 items-start gap-x-gutter gap-y-fluid-lg">
          {/* 65 — position, proof, engineering vocabulary */}
          <motion.div
            variants={welcomeSequence}
            initial="hidden"
            animate="show"
            className="col-span-12 lg:col-span-8 xl:col-span-7"
          >
            <motion.p
              variants={welcomeItem}
              className="max-w-[58ch] text-pretty text-fluid-base leading-relaxed text-[var(--text-secondary)]"
            >
              {brand.subtitle}
            </motion.p>

            <motion.div variants={welcomeItem} className="mt-5 flex flex-wrap items-center gap-2.5">
              <MagneticTap href="#contact" icon={ArrowUpRight}>
                Konsultasi Masalah Anda
              </MagneticTap>
              <MagneticTap href="#manifesto" variant="secondary">
                Baca Code Manifesto
              </MagneticTap>
            </motion.div>

            {/* Engineering vocabulary, stated as constraints rather than claims. */}
            <motion.ul
              variants={welcomeItem}
              className="mt-fluid-lg grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)]"
            >
              {MARKS.map((mark) => {
                const Icon = mark.icon;
                return (
                  <li
                    key={mark.label}
                    className="flex items-center gap-2.5 bg-[var(--bg)] px-3.5 py-3 transition-colors duration-500 hover:bg-[var(--accent-soft)]"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" strokeWidth={1.8} />
                    <span className="font-mono text-[9.5px] uppercase leading-tight tracking-[0.1em] text-[var(--text-secondary)]">
                      {mark.label}
                    </span>
                  </li>
                );
              })}
            </motion.ul>

            <motion.div
              variants={welcomeItem}
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--border)] pt-5"
            >
              <span className="swiss-index normal-case tracking-[0.12em]">
                UMKM &amp; bisnis lokal
              </span>
              <span className="swiss-index normal-case tracking-[0.12em]">
                Diagnosis sebelum solusi
              </span>
              <span className="swiss-index normal-case tracking-[0.12em]">
                Mitra jangka panjang
              </span>
            </motion.div>
          </motion.div>

          {/* 35 — interactive scope diagnoser */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 26, mass: 0.9, delay: 0.3 }}
            className="col-span-12 lg:col-span-4 xl:col-span-5"
          >
            <motion.div
              style={{ x: panelMagnetic.x, y: panelMagnetic.y }}
              {...panelMagnetic.handlers}
            >
              <ScopeDiagnoser />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Proof strip ───────────────────────────────────────────── */}
        <motion.div variants={welcomeSequence} initial="hidden" animate="show" className="mt-fluid-xl">
          <div className="flex items-center gap-3">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" strokeWidth={1.8} />
            <p className="swiss-index">Operasional yang kami serahkan</p>
          </div>

          {wide ? (
            <div className="mt-3 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
              {heroStats.map((stat) => (
                <motion.div
                  key={stat.id}
                  variants={welcomeItem}
                  className="bg-[var(--bg)] p-5 transition-colors duration-500 hover:bg-[var(--accent-soft)] lg:p-7"
                >
                  <StatBlock stat={stat} />
                </motion.div>
              ))}
            </div>
          ) : (
            <SnapRail label="Statistik utama" className="mt-3">
              {heroStats.map((stat) => (
                <motion.div
                  key={stat.id}
                  variants={welcomeItem}
                  className="rail-slide rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5"
                >
                  <StatBlock stat={stat} />
                </motion.div>
              ))}
            </SnapRail>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function StatBlock({ stat }: { stat: HeroStat }) {
  return (
    <>
      <p className="swiss-index">{stat.label}</p>
      <StatValue stat={stat} />
      <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">{stat.detail}</p>
    </>
  );
}

type CountedStat = Extract<HeroStat, { count: number }>;

function StatValue({ stat }: { stat: HeroStat }) {
  if ('count' in stat) return <CountedStatValue stat={stat} />;

  return (
    <p className="mt-2 font-display text-fluid-2xl font-semibold tracking-tight tabular text-[var(--text-primary)]">
      {stat.value}
    </p>
  );
}

/** Split out so useCountUp is only ever called by the counted variant. */
function CountedStatValue({ stat }: { stat: CountedStat }) {
  const animated = useCountUp(stat.count);

  return (
    <p className="mt-2 font-display text-fluid-2xl font-semibold tracking-tight tabular text-[var(--text-primary)]">
      <span ref={animated.ref}>{animated.value}</span>
      <span className="text-[var(--accent)]">{stat.suffix}</span>
    </p>
  );
}
