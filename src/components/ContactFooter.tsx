import { useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowUp, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { brand, contactInfo, engineeringMarks, navLinks, sectionIndex } from '../data/companyData';
import { ui } from '../i18n/ui';
import { useLanguage } from '../context/LanguageContext';
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

export default function ContactFooter() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [scopes, setScopes] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const { t, lang } = useLanguage();

  const toggleScope = (scope: string) => {
    setScopes((prev) => (prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]));
    setErrors((prev) => ({ ...prev, message: undefined }));
  };

  const update = (key: keyof Fields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  /**
   * Validation messages are resolved at call time, not captured in a module
   * constant. A constant would freeze the message in whatever language was
   * active when the module loaded, so flipping to English would leave the
   * Indonesian validation text on screen — the exact hybrid state this project
   * is not allowed to have.
   */
  const validate = (): Errors => {
    const found: Errors = {};
    if (fields.name.trim().length < 2) found.name = t(ui.contact.errorName);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) found.email = t(ui.contact.errorEmail);
    if (scopes.length === 0) found.message = t(ui.contact.errorScope);
    else if (fields.message.trim().length < 10) found.message = t(ui.contact.errorMessage);
    return found;
  };

  /**
   * Prefilled WhatsApp message.
   *
   * Built from live form state in the active language, so a visitor who has
   * already described their problem and switches to English gets an English
   * draft rather than an Indonesian one pasted into an English conversation.
   * `encodeURIComponent` on every interpolated value — these are user-typed
   * strings going into a URL.
   */
  const waDraft = () => {
    const scopeNames = scopes
      .map((id) => {
        const entry = ui.scopeTypes.find((s) => s.id === id);
        return entry ? t(entry) : id;
      })
      .join(', ');

    const body =
      lang === 'en'
        ? [
            `Name: ${fields.name || '-'}`,
            `Email: ${fields.email || '-'}`,
            `Focus: ${scopeNames || '-'}`,
            '',
            fields.message || '',
          ].join('\n')
        : [
            `Nama: ${fields.name || '-'}`,
            `Email: ${fields.email || '-'}`,
            `Fokus: ${scopeNames || '-'}`,
            '',
            fields.message || '',
          ].join('\n');

    return `https://wa.me/${contactInfo.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
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
            <h2 className="max-w-[17ch] text-balance text-fluid-5xl font-semibold leading-[0.95] tracking-tight text-[var(--text-primary)]">
              {t(ui.contact.title)}
            </h2>
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-[var(--text-secondary)] lg:text-right lg:pb-1">
              {t(ui.contact.description)}
            </p>
          </Reveal>

          <div className="mt-fluid-lg grid grid-cols-12 gap-x-gutter gap-y-fluid-lg">
            <Reveal className="col-span-12 lg:col-span-7">
              <form onSubmit={onSubmit} noValidate>
                <fieldset>
                  <legend className="swiss-index">{t(ui.contact.legendNeeds)}</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {ui.scopeTypes.map((type) => {
                      // Scope state keys on the Indonesian variant so a language
                      // switch cannot silently deselect what the visitor picked.
                      const key = type.id;
                      const isSelected = scopes.includes(key);
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleScope(key)}
                          aria-pressed={isSelected}
                          className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 ease-editorial ${
                            isSelected
                              ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]'
                              : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          {t(type)}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-fluid-lg grid gap-8 sm:grid-cols-2">
                  <Field label={t(ui.contact.labelName)} id="name" error={errors.name}>
                    <input
                      id="name"
                      autoComplete="name"
                      className="w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors duration-300 focus:border-[var(--accent)] focus:outline-none focus:ring-0"
                      placeholder={t(ui.contact.placeholderName)}
                      value={fields.name}
                      onChange={(event) => update('name')(event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                    />
                  </Field>
                  <Field label={t(ui.contact.labelEmail)} id="email" error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors duration-300 focus:border-[var(--accent)] focus:outline-none focus:ring-0"
                      placeholder={t(ui.contact.placeholderEmail)}
                      value={fields.email}
                      onChange={(event) => update('email')(event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                    />
                  </Field>
                </div>

                <div className="mt-10">
                  <Field label={t(ui.contact.labelMessage)} id="message" error={errors.message}>
                    <textarea
                      id="message"
                      rows={3}
                      className="w-full resize-none border-0 border-b border-[var(--border)] bg-transparent px-0 py-3 text-base leading-relaxed text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors duration-300 focus:border-[var(--accent)] focus:outline-none focus:ring-0"
                      placeholder={t(ui.contact.placeholderMessage)}
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
                    {status === 'sending' ? t(ui.contact.sending) : t(ui.contact.submit)}
                  </MagneticTap>
                  <a
                    href={waDraft()}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors duration-300 hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
                  >
                    WhatsApp
                    <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2} />
                  </a>
                  <p className="text-xs text-[var(--text-muted)]">{t(ui.contact.responseNote)}</p>
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
                        {t(ui.contact.sent)}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </form>
            </Reveal>

            <RevealGroup className="col-span-12 flex flex-col gap-4 lg:col-span-5">
              <RevealItem>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-8">
                  <p className="swiss-index">{t(ui.contact.directContact)}</p>
                  <ul className="mt-7 space-y-2">
                    <ContactRow
                      icon={Phone}
                      label={t(ui.contact.labelPhone)}
                      value={contactInfo.phone}
                      href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    />
                    <ContactRow
                      icon={Mail}
                      label={t(ui.contact.labelEmail)}
                      value={contactInfo.email}
                      href={`mailto:${contactInfo.email}`}
                    />
                    <ContactRow icon={MapPin} label={t(ui.contact.labelRegion)} value={t(contactInfo.address)} />
                  </ul>
                </div>
              </RevealItem>

              <RevealItem>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--accent-soft)] p-8">
                  <p className="swiss-index swiss-index-strong">{t(ui.contact.nextStepTitle)}</p>
                  <ol className="mt-5 space-y-4">
                    {ui.contact.nextSteps.map((line, index) => (
                      <li key={line.id} className="flex gap-4 text-sm text-[var(--text-primary)]">
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/30 font-mono text-[10px] text-[var(--accent)]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="leading-relaxed">{t(line)}</span>
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
                {t(brand.subtitle)}
              </p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                {t(brand.role)}
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
                {engineeringMarks.slice(0, 4).map((mark) => (
                  <li key={mark.id} className="swiss-index normal-case tracking-[0.1em]">
                    {t(mark)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 md:col-span-3">
              <p className="swiss-index">{t(ui.contact.footerNav)}</p>
              <ul className="mt-5 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--accent)]"
                    >
                      {t(link.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 md:col-span-4">
              <p className="swiss-index">{t(ui.contact.footerContact)}</p>
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
                <li>{t(contactInfo.address)}</li>
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
                <p className="mt-7 text-xs text-[var(--text-muted)]">{t(ui.contact.socialsSoon)}</p>
              )}
            </div>
          </div>

          <div className="mt-fluid-lg flex flex-col items-start justify-between gap-4 border-t border-[var(--border)] pt-7 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} {brand.name}. {t(ui.contact.copyright)}
            </p>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 swiss-index transition-colors duration-300 hover:text-[var(--accent)]"
            >
              {t(ui.contact.backToTop)}
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