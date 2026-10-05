import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, Target } from 'lucide-react';
import { brand, missions, vision } from '../data/companyData';
import { EDITORIAL, IconBadge, RevealGroup, RevealItem, Section } from './ui';

export default function About() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section
      id="about"
      index="01"
      label="ABOUT US"
      title={
        <>
          Kami tidak menjual teknologi.{' '}
          <span className="text-[var(--text-muted)]">Kami menyelesaikan masalah.</span>
        </>
      }
      description={`${brand.name} adalah mitra teknologi bagi UMKM dan bisnis lokal yang membutuhkan perubahan nyata, bukan sekadar aplikasi baru.`}
    >
      <RevealGroup className="mt-14 grid grid-cols-12 gap-4">
        <RevealItem className="col-span-12 lg:col-span-7">
          <article className="card card-hover flex h-full flex-col justify-between rounded-2xl p-8 sm:p-10">
            <div>
              <p className="swiss-index">Our Position</p>
              <h3 className="mt-5 max-w-[22ch] text-fluid-2xl font-semibold leading-tight tracking-tight text-[var(--text-primary)]">
                Solve Problems, Not Sell Technology
              </h3>
              <div className="mt-6 max-w-[62ch] space-y-4 text-pretty leading-relaxed text-[var(--text-secondary)]">
                <p>
                  Banyak bisnis gagal mengadopsi teknologi bukan karena teknologinya salah, tetapi
                  karena teknologi itu dibangun tanpa diagnosis. Kami membalik urutan itu.
                </p>
                <p>
                  Hambatan bisnis dipetakan lebih dulu, lalu sistem digital dipilih sebagai alat
                  untuk menyelesaikannya — bukan sebaliknya.
                </p>
              </div>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--border)] pt-8 sm:grid-cols-3">
              {[
                { term: 'Fokus', detail: 'UMKM & bisnis lokal' },
                { term: 'Pendekatan', detail: 'Diagnosis lebih dulu' },
                { term: 'Hubungan', detail: 'Mitra jangka panjang' },
              ].map((item) => (
                <div key={item.term}>
                  <dt className="swiss-index">{item.term}</dt>
                  <dd className="mt-2 text-sm font-medium text-[var(--text-primary)]">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </article>
        </RevealItem>

        <RevealItem className="col-span-12 lg:col-span-5">
          <article className="card flex h-full flex-col justify-between rounded-2xl border-[var(--accent)] bg-[var(--accent-soft)] p-8 sm:p-10">
            <div className="flex items-start justify-between">
              <IconBadge icon={Target} size="lg" />
              <span className="swiss-index swiss-index-strong">02</span>
            </div>
            <div>
              <p className="mt-10 swiss-index swiss-index-strong">{vision.title}</p>
              <p className="mt-4 max-w-[46ch] text-pretty text-fluid-lg font-medium leading-snug text-[var(--text-primary)]">
                {vision.statement}
              </p>
            </div>
          </article>
        </RevealItem>

        <RevealItem className="col-span-12">
          <article className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-8 sm:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="swiss-index">03</p>
                <h3 className="mt-3 text-fluid-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                  Misi Kami
                </h3>
              </div>
              <span className="chip">{missions.length} prinsip kerja</span>
            </div>

            <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-2">
              {missions.map((mission, index) => {
                const isOpen = open === index;
                const Icon = mission.icon;
                return (
                  <div key={mission.title} className="bg-[var(--bg-elevated)]">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start gap-4 p-6 text-left transition-colors duration-300 hover:bg-[var(--accent-soft)] sm:p-7"
                    >
                      <IconBadge icon={Icon} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-4">
                          <span
                            className={`font-medium transition-colors duration-300 ${
                              isOpen ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
                            }`}
                          >
                            {mission.title}
                          </span>
                          {isOpen ? (
                            <Minus className="h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={2} />
                          ) : (
                            <Plus
                              className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--accent)]"
                              strokeWidth={2}
                            />
                          )}
                        </span>

                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.span
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.36, ease: EDITORIAL }}
                              className="block overflow-hidden"
                            >
                              <span className="mt-3 block max-w-[54ch] text-sm leading-relaxed text-[var(--text-secondary)]">
                                {mission.description}
                              </span>
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </article>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
