import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, Target } from 'lucide-react';
import { brand, missions, sectionIndex, vision } from '../data/companyData';
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

  return (
    <Section
      id="about"
      index={sectionIndex.about.index}
      label={sectionIndex.about.label}
      title={
        <>
          Kami tidak menjual teknologi.{' '}
          <span className="text-[var(--text-muted)]">Kami memperbaiki operasi.</span>
        </>
      }
      description={`${brand.name} adalah mitra rekayasa sistem bagi UMKM dan bisnis lokal: diagnosis dulu, baru arsitektur, lalu kode — dengan hasil yang bisa diukur.`}
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
        <SnapRail label="Tentang LABSITE.ID" className="mt-fluid-lg">
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
  return (
    <article className="card card-hover flex h-full flex-col justify-between rounded-2xl p-6 sm:p-8">
      <div>
        <p className="swiss-index">Our Position</p>
        <h3 className="mt-4 max-w-[22ch] text-fluid-2xl font-semibold leading-tight tracking-tight text-[var(--text-primary)]">
          Engineer The Operation, Not The Demo
        </h3>
        <div className="mt-4 max-w-[62ch] space-y-3 text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
          <p>
            Sistem gagal bukan karena stack-nya salah, tetapi karena dibangun tanpa diagnosis.
            Urutan itu kami balik: hambatan operasional dipetakan dan diukur lebih dulu.
          </p>
          <p>
            Baru setelah angka masalahnya jelas, arsitektur dipilih — dan setiap keputusan
            arsitektur harus bisa ditunjuk ke hambatan yang mengatasinya.
          </p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-[var(--border)] pt-5">
        {[
          { term: 'Fokus', detail: 'UMKM & lokal' },
          { term: 'Pendekatan', detail: 'Diagnosis dulu' },
          { term: 'Hubungan', detail: 'Mitra panjang' },
        ].map((item) => (
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
  return (
    <article className="card flex h-full flex-col justify-between rounded-2xl border-[var(--accent)] bg-[var(--accent-soft)] p-6 sm:p-8">
      <div className="flex items-start justify-between">
        <IconBadge icon={Target} size="lg" />
        <span className="swiss-index swiss-index-strong">02</span>
      </div>
      <div className="mt-8">
        <p className="swiss-index swiss-index-strong">{vision.title}</p>
        <p className="mt-3 max-w-[46ch] text-pretty text-fluid-lg font-medium leading-snug text-[var(--text-primary)]">
          {vision.statement}
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
  return (
    <article className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="swiss-index">03</p>
          <h3 className="mt-2 text-fluid-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            Misi Kami
          </h3>
        </div>
        <span className="chip">{missions.length} prinsip kerja</span>
      </div>

      <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
        {missions.map((mission, index) => {
          const isOpen = open === index;
          const Icon = mission.icon;
          return (
            <div key={mission.title} className="bg-[var(--bg-elevated)]">
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
                      {mission.title}
                    </span>
                    {isOpen ? (
                      <Minus className="h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={2} />
                    ) : (
                      <Plus
                        className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-colors duration-300"
                        strokeWidth={2}
                      />
                    )}
                  </span>

                  {/* ponytail: `height: auto` stays on a duration curve.
                      Spring-interpolated auto-height re-measures every frame and
                      visibly stutters on long copy; swap to a spring only if a
                      measured-height hook ever lands. */}
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: EDITORIAL }}
                        className="block overflow-hidden"
                      >
                        <span className="mt-2.5 block max-w-[54ch] text-sm leading-relaxed text-[var(--text-secondary)]">
                          {mission.description}
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
