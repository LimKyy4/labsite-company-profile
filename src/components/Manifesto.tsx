import { motion } from 'framer-motion';
import { Check, Quote } from 'lucide-react';
import { manifesto, sectionIndex } from '../data/companyData';
import { ui } from '../i18n/ui';
import { useLanguage } from '../context/LanguageContext';
import DualKineticMarquee from './DualKineticMarquee';
import { EDITORIAL, Hairline, Reveal, RevealGroup, RevealItem, StickyIndex } from './ui';

/**
 * `[ 03 // CODE_MANIFESTO ]`
 *
 * Deliberately inverted in BOTH themes: this is the section that has to land as
 * a statement rather than as content, so it owns its own dark surface instead
 * of inheriting whichever theme the visitor happens to be in.
 */
export default function Manifesto() {
  const { t } = useLanguage();

  return (
    // NB: no `overflow-hidden` here. It would make this section its own
    // scrollport, and a sticky descendant then resolves `top` against that
    // box instead of the viewport — the StickyIndex below gets shoved down by
    // exactly --index-top and lands on top of the heading. The marquee clips
    // itself, so the section has no reason to clip.
    <section id="manifesto" className="surface-invert relative py-section">
      <Hairline className="absolute inset-x-0 top-0" />

      <div className="shell">
        <StickyIndex index={sectionIndex.manifesto.index} label={sectionIndex.manifesto.label} />

        <div className="mt-fluid-md grid grid-cols-12 items-end gap-x-gutter gap-y-fluid-md">
          <div className="col-span-12 lg:col-span-7">
            <Reveal delay={0.05}>
              <p className="swiss-index swiss-index-strong flex items-center gap-2">
                <Quote className="h-3 w-3" strokeWidth={2} />
                {t(ui.manifesto.eyebrow)}
              </p>
              <h2 className="mt-fluid-sm max-w-[15ch] text-balance font-editorial text-fluid-5xl font-bold leading-[1.02] tracking-tight text-[var(--text-primary)]">
                {t(ui.manifesto.title)}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="col-span-12 lg:col-span-5">
            <p className="max-w-[46ch] text-pretty text-fluid-base leading-relaxed text-[var(--text-secondary)] lg:pb-1">
              {t(ui.manifesto.description)}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-fluid-xl grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">
          {manifesto.map((pillar, index) => (
            <RevealItem key={pillar.id} className="h-full">
              <ManifestoCard pillar={pillar} index={index} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* Dual-lane kinetic badges — the engineering vocabulary, endlessly
          reasserted while the manifesto is on screen. */}
      <DualKineticMarquee />
    </section>
  );
}

function ManifestoCard({
  pillar,
  index,
}: {
  pillar: (typeof manifesto)[number];
  index: number;
}) {
  const Icon = pillar.icon;
  const { t } = useLanguage();

  return (
    <article className="group relative flex h-full flex-col bg-[var(--bg-elevated)] p-6 transition-colors duration-500 ease-editorial hover:bg-[var(--accent-soft)] sm:p-7 lg:p-8">
      {/* Index numeral sits behind the icon: editorial depth without a second
          layout row, and it costs no vertical space on a phone. */}
      <span
        className="pointer-events-none absolute right-5 top-4 font-display text-[3.25rem] font-bold leading-none tracking-tight text-[var(--text-muted)] opacity-[0.14]"
        aria-hidden
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative flex items-center gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--accent)]/40 bg-[var(--accent-soft)] text-[var(--accent)]">
          <Icon className="h-5 w-5" strokeWidth={1.6} />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
          {t(pillar.tagline)}
        </span>
      </div>

      <h3 className="relative mt-5 font-display text-fluid-xl font-semibold tracking-tight text-[var(--text-primary)]">
        {t(pillar.title)}
      </h3>

      <p className="relative mb-7 mt-3 max-w-[42ch] text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
        {t(pillar.body)}
      </p>

      <ul className="relative mt-auto flex flex-wrap gap-2 border-t border-[var(--border)] pt-5">
        {pillar.proof.map((item) => (
          <li key={item.id} className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
            <Check className="h-3 w-3 text-[var(--accent)]" strokeWidth={2.4} />
            {t(item)}
          </li>
        ))}
      </ul>

      {/* Sweeping hairline: reads as the section drawing its own rule. */}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, ease: EDITORIAL }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--accent)]"
      />
    </article>
  );
}
