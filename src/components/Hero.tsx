import { motion } from 'framer-motion';
import { ArrowUpRight, Boxes, Cpu, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { brand, engineeringMarks, heroStats, sectionIndex, systemStatus, type HeroStat } from '../data/companyData';
import { ui } from '../i18n/ui';
import { useLanguage } from '../context/LanguageContext';
import { useCountUp, useMagnetic, useMediaQuery } from '../hooks';
import ScopeDiagnoser from './ScopeDiagnoser';
import {
  MagneticTap,
  SnapRail,
  SwissIndex,
  welcomeItem,
  welcomeSequence,
} from './ui';

const MARK_ICONS = [Boxes, Cpu, Zap, ShieldCheck];

export default function Hero() {
  const wide = useMediaQuery('(min-width: 1024px)');
  const panelMagnetic = useMagnetic(0.1);
  const { t, lang } = useLanguage();

  const audience = [
    t(ui.hero.audienceLocal),
    t(ui.hero.audienceDiagnose),
    t(ui.hero.audiencePartner),
  ];

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
              {t(systemStatus.state)}
            </motion.span>
          </div>

          {/* The headline is stored as three fragments rather than one string so
              the accent phrase can stay a coloured span in both languages.
              English and Indonesian put the emphasis in different places, and a
              single blob of text cannot do that without either recolouring the
              wrong clause or dropping the emphasis. */}
          <motion.h1
            variants={welcomeItem}
            className="mt-5 max-w-[22ch] text-balance text-[1.85rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[var(--text-primary)] sm:mt-6 sm:text-fluid-4xl lg:max-w-[18ch] lg:text-fluid-5xl lg:leading-[0.98]"
          >
            {t(ui.hero.headlineLead)}{' '}
            <span className="text-[var(--accent)]">{t(ui.hero.headlineAccent)}</span>{' '}
            {t(ui.hero.headlineTail)}
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
              {t(brand.subtitle)}
            </motion.p>

            <motion.div variants={welcomeItem} className="mt-5 flex flex-wrap items-center gap-2.5">
              <MagneticTap href="#contact" icon={ArrowUpRight}>
                {t(ui.hero.ctaPrimary)}
              </MagneticTap>
              <MagneticTap href="#manifesto" variant="secondary">
                {t(ui.hero.ctaSecondary)}
              </MagneticTap>
            </motion.div>

            {/* Engineering vocabulary, stated as constraints rather than claims. */}
            <motion.ul
              variants={welcomeItem}
              className="mt-fluid-lg grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)]"
            >
              {engineeringMarks.slice(0, 4).map((mark, index) => {
                const Icon = MARK_ICONS[index];
                return (
                  <li
                    key={mark.id}
                    className="flex items-center gap-2.5 bg-[var(--bg)] px-3.5 py-3 transition-colors duration-500 hover:bg-[var(--accent-soft)]"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" strokeWidth={1.8} />
                    <span className="font-mono text-[9.5px] uppercase leading-tight tracking-[0.1em] text-[var(--text-secondary)]">
                      {t(mark)}
                    </span>
                  </li>
                );
              })}
            </motion.ul>

            <motion.div
              variants={welcomeItem}
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--border)] pt-5"
            >
              {audience.map((item) => (
                <span key={item} className="swiss-index normal-case tracking-[0.12em]">
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* 35 — interactive scope diagnoser */}
          <motion.div
            variants={welcomeSequence}
            initial="hidden"
            animate="show"
            className="col-span-12 lg:col-span-4 xl:col-span-5"
          >
            <motion.div style={{ x: panelMagnetic.x, y: panelMagnetic.y }} {...panelMagnetic.handlers}>
              <ScopeDiagnoser />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Proof strip ───────────────────────────────────────────── */}
        <motion.div variants={welcomeSequence} initial="hidden" animate="show" className="mt-fluid-xl">
          <div className="flex items-center gap-3">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" strokeWidth={1.8} />
            <p className="swiss-index">{t(ui.hero.proofLabel)}</p>
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
            <SnapRail label={t(ui.hero.proofRailLabel)} className="mt-3">
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
      {/* `lang` participates so assistive tech and the CSS `:lang()` hooks both
          see the change; it is intentionally not rendered as text. */}
      <span lang={lang} className="sr-only" aria-hidden />
    </section>
  );
}

function StatBlock({ stat }: { stat: HeroStat }) {
  const { t } = useLanguage();

  return (
    <>
      <p className="swiss-index">{t(stat.label)}</p>
      <StatValue stat={stat} />
      <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">{t(stat.detail)}</p>
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
  const { t, lang } = useLanguage();

  // The `-STAGE` suffix is a word, and in Indonesian the correct suffix is
  // `-TAHAP`. Both are nouns, so they follow the active language rather than
  // being hardcoded into the data as an invariant string.
  const suffix = stat.suffix === '-STAGE' ? t(ui.hero.statSuffixStages) : stat.suffix;

  return (
    <p
      className="mt-2 font-display text-fluid-2xl font-semibold tracking-tight tabular text-[var(--text-primary)]"
      lang={lang}
    >
      <span ref={animated.ref}>{animated.value}</span>
      <span className="text-[var(--accent)]">{suffix}</span>
    </p>
  );
}
