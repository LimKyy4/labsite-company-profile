import { useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowUp, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import {
  brand,
  contactInfo,
  engineeringMarks,
  navLinks,
  problemTypes,
  sectionIndex,
} from '../data/companyData';
import {
  EDITORIAL,
  Hairline,
  MagneticTap,
  Reveal,
  RevealGroup,
  RevealItem,
  SPRING,
  StickyIndex,
} from './ui';

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: '', email: '', message: '' };

function validate(fields: Fields, scopes: string[]): Errors {
  const errors: Errors = {};
  if (fields.name.trim().length < 2) errors.name = 'Nama minimal 2 karakter.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim()))
    errors.email = 'Format email belum benar.';
  if (scopes.length === 0) errors.message = 'Pilih minimal satu fokus kebutuhan.';
  else if (fields.message.trim().length < 10) errors.message = 'Ceritakan masalahnya minimal 10 karakter.';
  return errors;
}

export default function ContactFooter() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [scopes, setScopes] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const toggleScope = (scope: string) => {
    setScopes((prev) => (prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]));
    setErrors((prev) => ({ ...prev, message: undefined }));
  };

  const update = (key: keyof Fields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(fields, scopes);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    // TODO: wire to the real LABSITE.ID endpoint (or an email service like Resend/Formspree).
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus('sent');
    setFields(EMPTY);
    setScopes([]);
  };

  return (
    <>
      <section id="contact" className="surface-invert relative py-section">
        <Hairline className="absolute inset-x-0 top-0" />

        <div className="shell">
          <StickyIndex index={sectionIndex.contact.index} label={sectionIndex.contact.label} />
          <Reveal delay={0.05} className="mt-fluid-md flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-[16ch] text-balance text-fluid-5xl font-semibold leading-[0.95] tracking-tight text-[var(--text-primary)]">
              Ceritakan sistemnya. Kami petakan jalurnya.
            </h2>
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-[var(--text-secondary)] lg:text-right">
              Konsultasi awal tidak dipungut biaya. Tidak ada rekomendasi sebelum masalah Anda
              terpetakan.
            </p>
          </Reveal>

          <div className="mt-fluid-lg grid grid-cols-12 gap-x-gutter gap-y-fluid-lg">
            <Reveal className="col-span-12 lg:col-span-7">
              <form onSubmit={onSubmit} noValidate>
                <fieldset>
                  <legend className="swiss-index">Fokus kebutuhan Anda</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {problemTypes.map((type) => {
                      const isSelected = scopes.includes(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleScope(type)}
                          aria-pressed={isSelected}
                          className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 ease-editorial ${
                            isSelected
                              ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]'
                              : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-fluid-lg grid gap-8 sm:grid-cols-2">
                  <Field label="Nama" id="name" error={errors.name}>
                    <input
                      id="name"
                      className="w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors duration-300 focus:border-[var(--accent)] focus:outline-none focus:ring-0"
                      placeholder="Nama Anda"
                      value={fields.name}
                      onChange={(event) => update('name')(event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                    />
                  </Field>
                  <Field label="Email" id="email" error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      className="w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors duration-300 focus:border-[var(--accent)] focus:outline-none focus:ring-0"
                      placeholder="nama@bisnis.com"
                      value={fields.email}
                      onChange={(event) => update('email')(event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                    />
                  </Field>
                </div>

                <div className="mt-10">
                  <Field label="Masalah bisnis Anda" id="message" error={errors.message}>
                    <textarea
                      id="message"
                      rows={3}
                      className="w-full resize-none border-0 border-b border-[var(--border)] bg-transparent px-0 py-3 text-base leading-relaxed text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors duration-300 focus:border-[var(--accent)] focus:outline-none focus:ring-0"
                      placeholder="Ceritakan kondisi bisnis saat ini dan apa yang menghambatnya."
                      value={fields.message}
                      onChange={(event) => update('message')(event.target.value)}
                      aria-invalid={Boolean(errors.message)}
                    />
                  </Field>
                </div>

                <div className="mt-fluid-lg flex flex-wrap items-center gap-5">
                  <MagneticTap
                    as="button"
                    type="submit"
                    icon={status === 'sending' ? Loader2 : Send}
                    iconClassName={status === 'sending' ? 'h-4 w-4 animate-spin' : undefined}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Mengirim' : 'Kirim Permintaan'}
                  </MagneticTap>
                  <p className="text-xs text-[var(--text-muted)]">
                    Menjawab 1x24 jam kerja · tanpa biaya konsultasi awal
                  </p>
                </div>

                <AnimatePresence>
                  {status === 'sent' ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={SPRING}
                      className="overflow-hidden"
                    >
                      <p className="mt-8 flex items-center gap-3 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-5 py-4 text-sm text-[var(--text-primary)]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={2} />
                        Pesan terkirim. Tim kami akan menghubungi Anda dalam 1x24 jam kerja.
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </form>
            </Reveal>

            <RevealGroup className="col-span-12 flex flex-col gap-4 lg:col-span-5">
              <RevealItem>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-8">
                  <p className="swiss-index">Kontak langsung</p>
                  <ul className="mt-7 space-y-2">
                    <ContactRow
                      icon={Phone}
                      label="Telepon"
                      value={contactInfo.phone}
                      href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    />
                    <ContactRow
                      icon={Mail}
                      label="Email"
                      value={contactInfo.email}
                      href={`mailto:${contactInfo.email}`}
                    />
                    <ContactRow icon={MapPin} label="Wilayah" value={contactInfo.address} />
                  </ul>
                </div>
              </RevealItem>

              <RevealItem>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--accent-soft)] p-8">
                  <p className="swiss-index swiss-index-strong">Langkah berikutnya</p>
                  <ol className="mt-5 space-y-4">
                    {[
                      'Kami membaca deskripsi hambatan yang Anda bawa.',
                      'Kami jadwalkan sesi diagnosis singkat — 30 menit.',
                      'Kami susun roadmap sistem, modul, dan estimasi kerja.',
                    ].map((line, index) => (
                      <li key={line} className="flex gap-4 text-sm text-[var(--text-primary)]">
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/30 font-mono text-[10px] text-[var(--accent)]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="leading-relaxed">{line}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </section>

      <footer className="surface-invert border-t border-[var(--border)]">
        <div className="shell py-10 lg:py-14">
          <div className="grid grid-cols-12 gap-x-gutter gap-y-9">
            <div className="col-span-12 md:col-span-5">
              <p className="font-display text-fluid-xl font-semibold tracking-tight text-[var(--text-primary)]">
                {brand.name}
              </p>
              <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
                {brand.subtitle}
              </p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                {brand.role}
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
                {engineeringMarks.map((mark) => (
                  <li key={mark} className="swiss-index normal-case tracking-[0.1em]">
                    {mark}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 md:col-span-3">
              <p className="swiss-index">Navigasi</p>
              <ul className="mt-5 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--accent)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 md:col-span-4">
              <p className="swiss-index">Kontak</p>
              <ul className="mt-5 space-y-2.5 text-sm text-[var(--text-secondary)]">
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="transition-colors duration-300 hover:text-[var(--accent)]"
                  >
                    {contactInfo.email}
                  </a>
                </li>
                <li>{contactInfo.phone}</li>
                <li>{contactInfo.address}</li>
              </ul>

              {contactInfo.socials.length ? (
                <div className="mt-7 flex flex-wrap gap-2">
                  {contactInfo.socials.map(({ label, url, icon: SocialIcon }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      <SocialIcon className="h-4 w-4" strokeWidth={1.6} />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="mt-7 text-xs text-[var(--text-muted)]">
                  Tautan sosial media resmi segera hadir.
                </p>
              )}
            </div>
          </div>

          <div className="mt-fluid-lg flex flex-col items-start justify-between gap-4 border-t border-[var(--border)] pt-7 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} {brand.name}. Seluruh hak cipta dilindungi.
            </p>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 swiss-index transition-colors duration-300 hover:text-[var(--accent)]"
            >
              Kembali ke atas
              <ArrowUp
                className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="swiss-index block" htmlFor={id}>
        {label}
      </label>
      <div className="mt-2">{children}</div>
      <AnimatePresence>
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EDITORIAL }}
            className="mt-2.5 flex items-center gap-1.5 text-xs text-[#E08A78]"
          >
            <AlertCircle className="h-3.5 w-3.5" strokeWidth={2} />
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <>
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--accent)]">
        <Icon className="h-4 w-4" strokeWidth={1.6} />
      </span>
      <span className="min-w-0">
        <span className="block swiss-index">{label}</span>
        <span className="mt-1 block truncate text-sm text-[var(--text-primary)]">{value}</span>
      </span>
    </>
  );

  return (
    <li>
      {href ? (
        <a
          href={href}
          className="flex items-center gap-4 rounded-xl px-2 py-2.5 transition-colors duration-300 hover:bg-[var(--accent-soft)]"
        >
          {body}
        </a>
      ) : (
        <div className="flex items-center gap-4 px-2 py-2.5">{body}</div>
      )}
    </li>
  );
}
