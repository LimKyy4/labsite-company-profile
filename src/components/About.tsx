import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, Target } from 'lucide-react';
import { brand, missions, sectionIndex, vision } from '../data/companyData';
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
  SPRING_TAP,
} from './ui';

export default function About() {
  const wide = useMediaQuery('(min-width: 1024px)');
  const [open, setOpen] = useState<number | null>(0);
  const { t } = useLanguage();

  return (
    <Section
      id="about"
      index={sectionIndex.about.index}
      label={sectionIndex.about.label}
      title={
        <>
          {t(ui.about.titleLead)} <span className="text-[var(--text-muted)]">{t(ui.about.titleTail)}</span>
        </>
      }
      description={`${brand.name}${t(ui.about.description)}`}
    >
      {wide ? (
        <RevealGroup className="mt-fluid-lg grid grid-cols-12 gap-4">
          <RevealItem className="col-span-12 lg:col-span-7">
            <PositionCard />
          </RevealItem>
          <RevealItem className="col-span-12 lg:col-span-5">
            <VisionCard />
          </RevealItem>
          <RevealItem className="col-span-12">
            <MissionCard open={open} onToggle={setOpen} />
          </RevealItem>
        </RevealGroup>
      ) : (
        <SnapRail label={t(ui.about.railLabel)} className="mt-fluid-lg">
          <div className="rail-slide">
            <PositionCard />
          </div>
          <div className="rail-slide">
            <VisionCard />
          </div>
          <div className="rail-slide">
            <MissionCard open={open} onToggle={setOpen} />
          </div>
        </SnapRail>
      )}
    </Section>
  );
}

function PositionCard() {
  const { t } = useLanguage();

  const facts = [
    { term: t(ui.about.positionFocus), detail: t(ui.about.positionFocusValue) },
    { term: t(ui.about.positionApproach), detail: t(ui.about.positionApproachValue) },
    { term: t(ui.about.positionRelation), detail: t(ui.about.positionRelationValue) },
  ];

  return (
    <article className="card card-hover flex h-full flex-col justify-between rounded-2xl p-6 sm:p-8">
      <div>
        <p className="swiss-index">{t(ui.about.positionEyebrow)}</p>
        <h3 className="mt-4 max-w-[22ch] text-fluid-2xl font-semibold leading-tight tracking-tight text-[var(--text-primary)]">
          {t(ui.about.positionHeading)}
        </h3>
        <div className="mt-4 max-w-[62ch] space-y-3 text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
          <p>{t(ui.about.positionBody1)}</p>
          <p>{t(ui.about.positionBody2)}</p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-[var(--border)] pt-5">
        {facts.map((item) => (
          <div key={item.term}>
            <dt className="swiss-index">{item.term}</dt>
            <dd className="mt-1.5 text-xs font-medium leading-snug text-[var(--text-primary)]">
              {item.detail}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function VisionCard() {
  const { t } = useLanguage();

  return (
    <article className="card flex h-full flex-col justify-between rounded-2xl border-[var(--accent)] bg-[var(--accent-soft)] p-6 sm:p-8">
      <div className="flex items-start justify-between">
        <IconBadge icon={Target} size="lg" />
        <span className="swiss-index swiss-index-strong">02</span>
      </div>
      <div className="mt-8">
        <p className="swiss-index swiss-index-strong">{t(vision.title)}</p>
        <p className="mt-3 max-w-[46ch] text-pretty text-fluid-lg font-medium leading-snug text-[var(--text-primary)]">
          {t(vision.statement)}
        </p>
      </div>
    </article>
  );
}

function MissionCard({
  open,
  onToggle,
}: {
  open: number | null;
  onToggle: (index: number | null) => void;
}) {
  const { t, lang } = useLanguage();

  return (
    <article className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="swiss-index">03</p>
          <h3 className="mt-2 text-fluid-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            {t(ui.about.missionTitle)}
          </h3>
        </div>
        <span className="chip">
          {missions.length}
          {t(ui.about.missionChip)}
        </span>
      </div>

      <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
        {missions.map((mission, index) => {
          const isOpen = open === index;
          const Icon = mission.icon;
          return (
            <div key={mission.id} className="bg-[var(--bg-elevated)]">
              <motion.button
                type="button"
                onClick={() => onToggle(isOpen ? null : index)}
                aria-expanded={isOpen}
                whileTap={{ scale: 0.99 }}
                transition={SPRING_TAP}
                className="flex w-full items-start gap-3 p-5 text-left transition-colors duration-300 hover:bg-[var(--accent-soft)]"
              >
                <IconBadge icon={Icon} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-3">
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        isOpen ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
                      }`}
                    >
                      {t(mission.title)}
                    </span>
                    {isOpen ? (
                      <Minus className="icon-optical h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={2} />
                    ) : (
                      <Plus
                        className="icon-optical h-4 w-4 shrink-0 text-[var(--text-muted)] transition-colors duration-300"
                        strokeWidth={2}
                      />
                    )}
                  </span>

                  {/* ponytail: `height: auto` stays on a duration curve.
                      Spring-interpolated auto-height re-measures every frame and
                      visibly stutters on long copy; swap to a spring only if a
                      measured-height hook ever lands. Keyed by language so a
                      locale switch re-runs the expansion with the new copy
                      rather than leaving a stale height. */}
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.span
                        key={`${mission.id}-${lang}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.34, ease: EDITORIAL }}
                        className="block overflow-hidden"
                      >
                        <span className="mt-2.5 block max-w-[54ch] text-sm leading-relaxed text-[var(--text-secondary)]">
                          {t(mission.description)}
                        </span>
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </span>
              </motion.button>
            </div>
          );
        })}
      </div>
    </article>
  );
}