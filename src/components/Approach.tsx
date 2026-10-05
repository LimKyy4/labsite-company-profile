import { useRef, useState, type ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2, Package } from 'lucide-react';
import { approach } from '../data/companyData';
import { useElementWidth, useReducedMotion } from '../hooks';
import { Hairline, IconBadge, Reveal, SPRING, SwissIndex } from './ui';

export default function Approach() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const [trackRef, trackWidth] = useElementWidth<HTMLDivElement>();

  // Pin the section, then translate the track by exactly the overflow distance.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const distance = Math.max(trackWidth - 100, 0);
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.6 });

  const current = approach[active];

  return (
    <section ref={sectionRef} id="approach" className="surface relative">
      <Hairline className="absolute inset-x-0 top-0" />

      {/* Desktop: pinned horizontal travel. Mobile / reduced-motion: static stack. */}
      <div className={reduced ? '' : 'relative lg:h-[320vh]'}>
        <div className={reduced ? '' : 'lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:flex-col lg:justify-center'}>
          <div className="shell">
            <Reveal>
              <SwissIndex index="03" label="OUR APPROACH" />
            </Reveal>
            <Reveal delay={0.05} className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-2xl text-balance text-fluid-5xl font-semibold leading-[0.95] text-[var(--text-primary)]">
                Enam tahap, satu kelanjutan.
              </h2>
              <p className="max-w-sm text-pretty text-sm leading-relaxed text-[var(--text-secondary)] lg:text-right">
                Setiap tahap punya keluaran yang jelas dan disetujui sebelum lanjut, sehingga tidak
                ada yang dibangun dengan asumsi.
              </p>
            </Reveal>
          </div>

          {/* Progress rail */}
          <div className="shell mt-12 lg:mt-14">
            <div className="h-px w-full bg-[var(--border)]">
              <motion.div
                className="h-px origin-left bg-[var(--accent)]"
                style={reduced ? { scaleX: 0 } : { scaleX: scrollYProgress }}
              />
            </div>
          </div>

          <div className={reduced ? 'shell mt-10' : 'mt-10 overflow-hidden'}>
            <motion.div
              ref={trackRef}
              style={reduced ? undefined : { x }}
              className="flex gap-4 px-gutter will-change-transform"
            >
              {approach.map((stage, index) => {
                const Icon = stage.icon;
                const isActive = index === active;
                return (
                  <StageCard
                    key={stage.id}
                    index={index}
                    icon={<IconBadge icon={Icon} size="lg" />}
                    step={stage.step}
                    name={stage.name}
                    duration={stage.duration}
                    description={stage.description}
                    deliverable={stage.deliverable}
                    active={isActive}
                    compact={reduced}
                    onActivate={() => setActive(index)}
                    onHover={setActive}
                  />
                );
              })}
            </motion.div>
          </div>

          {/* Detail panel */}
          <div className="shell mt-10">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32 }}
              className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] lg:grid-cols-3"
            >
              <div className="bg-[var(--bg-elevated)] p-8 lg:col-span-2">
                <div className="flex items-center gap-4">
                  <span className="font-display text-fluid-3xl font-semibold tabular text-[var(--text-muted)] opacity-50">
                    {current.step}
                  </span>
                  <div>
                    <p className="swiss-index">{current.duration}</p>
                    <h3 className="mt-1 font-display text-fluid-xl font-semibold tracking-tight text-[var(--text-primary)]">
                      {current.name}
                    </h3>
                  </div>
                </div>
                <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-[var(--text-secondary)]">
                  {current.description}
                </p>
              </div>

              <div className="bg-[var(--accent-soft)] p-8">
                <p className="swiss-index swiss-index-strong flex items-center gap-2">
                  <Package className="h-3 w-3" strokeWidth={2} />
                  Deliverable
                </p>
                <p className="mt-3 max-w-[46ch] text-pretty leading-relaxed text-[var(--text-primary)]">
                  {current.deliverable}
                </p>
                <p className="mt-6 flex items-start gap-2 border-t border-[var(--border)] pt-5 text-xs leading-relaxed text-[var(--text-secondary)]">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" strokeWidth={2} />
                  Disetujui bersama sebelum masuk ke tahap berikutnya.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageCard({
  index,
  icon,
  step,
  name,
  duration,
  description,
  deliverable,
  active,
  compact,
  onActivate,
  onHover,
}: {
  index: number;
  icon: ReactNode;
  step: string;
  name: string;
  duration: string;
  description: string;
  deliverable: string;
  active: boolean;
  compact: boolean;
  onActivate: () => void;
  onHover: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={onActivate}
      onMouseEnter={() => onHover(index)}
      onFocus={() => onHover(index)}
      aria-current={active}
      className={`group card relative flex flex-col text-left transition-all duration-300 ease-editorial hover:border-[var(--accent)] ${
        compact ? 'w-full flex-col' : 'w-[19rem] shrink-0 sm:w-[24rem]'
      } ${active ? 'border-[var(--accent)] shadow-lift' : ''}`}
    >
      <div className="flex items-center justify-between">
        {icon}
        <span className="swiss-index tabular">
          {step} · {duration}
        </span>
      </div>

      <h3
        className={`mt-7 font-display text-xl font-semibold transition-colors duration-300 ${
          active ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
        }`}
      >
        {name}
      </h3>
      <p className="mt-2.5 max-w-[44ch] text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>

      <div className="mt-6 border-t border-[var(--border)] pt-4">
        <p className="swiss-index">Deliverable</p>
        <p className="mt-2 max-w-[44ch] text-xs leading-relaxed text-[var(--text-secondary)]">{deliverable}</p>
      </div>

      {active ? (
        <motion.span
          layoutId="stage-marker"
          className="absolute inset-x-6 -bottom-px h-px bg-[var(--accent)]"
          transition={SPRING}
        />
      ) : null}
    </button>
  );
}
