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
   * Validation messages resolve at call time, not from a module constant. A
   * constant would freeze the message in whatever language was active when the
   * module loaded, so switching to English would leave Indonesian validation
   * text on screen — the exact hybrid state this project must not have.
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
   * Prefilled WhatsApp message, built from live form state in the active
   * language — a visitor who already described their problem and switched to
   * English gets an English draft, not Indonesian pasted into an English
   * conversation. Every interpolated value is user-typed and goes into a URL,
   * hence `encodeURIComponent`.
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
    // Submission is currently a local simulation; the live deployment swaps this
    // for the real LABSITE.ID form endpoint (or an email service like Resend/Formspree).
    await new Promise((resolve) => setTimeout(resolve, 900));

    /*
     * Clean reset.
     *
     * Errors are cleared explicitly, not left to the field-level `update`
     * helper: after a successful submit the form is empty, so leaving a stale
     * error in state would re-display "name must be at least 2 characters"
     * under a field that is now visibly blank. `status` returns to `idle` only
     * on the next submit — the success banner owns the area until then.
     */
    setStatus('sent');
    setFields(EMPTY);
    setScopes([]);
    setErrors({});
  };

  return (
    <>
      <section id="contact" className="surface-invert relative py-section">
        <Hairline className="absolute inset-x-0 top-0" />

        <div className="shell">
          <StickyIndex index={sectionIndex.contact.index} label={sectionIndex.contact.label} />
          <Reveal
            delay={0.05}
            className="mt-fluid-md flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <h2 className="max-w-[20ch] text-balance text-fluid-5xl font-semibold leading-[0.95] tracking-tight text-[var(--text-primary)]">
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
                      // Scope state keys on the Indonesian variant, so a language
                      // switch cannot silently deselect what was picked.
                      const key = type.id;
                      const isSelected = scopes.includes(key);
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleScope(key)}
                          aria-pressed={isSelected}
                          className={`flex min-h-[var(--touch)] items-center rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 ease-editorial active:scale-[0.97] ${
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
                      name="name"
                      autoComplete="name"
                      className="w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors duration-300 focus:border-[var(--accent)] focus:outline-none focus:ring-0"
                      placeholder={t(ui.contact.placeholderName)}
                      value={fields.name}
                      onChange={(event) => update('name')(event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                  </Field>
                  <Field label={t(ui.contact.labelEmail)} id="email" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors duration-300 focus:border-[var(--accent)] focus:outline-none focus:ring-0"
                      placeholder={t(ui.contact.placeholderEmail)}
                      value={fields.email}
                      onChange={(event) => update('email')(event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                  </Field>
                </div>

                <div className="mt-10">
                  <Field label={t(ui.contact.labelMessage)} id="message" error={errors.message}>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className="w-full resize-none border-0 border-b border-[var(--border)] bg-transparent px-0 py-3 text-base leading-relaxed text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors duration-300 focus:border-[var(--accent)] focus:outline-none focus:ring-0"
                      placeholder={t(ui.contact.placeholderMessage)}
                      value={fields.message}
                      onChange={(event) => update('message')(event.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                  </Field>
                </div>

                <div className="mt-fluid-lg flex flex-wrap items-center gap-5">
                  <MagneticTap
                    as="button"
                    type="submit"
                    icon={status === 'sending' ? Loader2 : Send}
                    iconClassName={status === 'sending' ? 'h-4 w-4 animate-spin' : 'icon-optical h-4 w-4'}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? t(ui.contact.sending) : t(ui.contact.submit)}
                  </MagneticTap>
                  <a
                    href={waDraft()}
                    target="_blank"
                    rel="noreferrer"
                    className="group -my-1 inline-flex min-h-[var(--touch)] items-center gap-1.5 py-1 text-xs text-[var(--text-secondary)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors duration-300 hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
                  >
                    WhatsApp
                    <ArrowUp
                      className="icon-optical h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
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
                        <CheckCircle2 className="icon-optical h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={2} />
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
                  <ul className="mt-5 space-y-1">
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
              <ul className="mt-4 flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="flex min-h-[var(--touch)] items-center font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--accent)]"
                    >
                      {t(link.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 md:col-span-4">
              <p className="swiss-index">{t(ui.contact.footerContact)}</p>
              <ul className="mt-4 flex flex-col text-sm text-[var(--text-secondary)]">
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex min-h-[var(--touch)] items-center transition-colors duration-300 hover:text-[var(--accent)]"
                  >
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex min-h-[var(--touch)] items-center">{contactInfo.phone}</li>
                <li className="flex min-h-[var(--touch)] items-center">{t(contactInfo.address)}</li>
              </ul>

              {contactInfo.socials.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {contactInfo.socials.map(({ label, url, icon: SocialIcon }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="inline-flex h-[var(--touch)] w-[var(--touch)] items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-[0.97]"
                    >
                      <SocialIcon className="icon-optical h-4 w-4" strokeWidth={1.6} />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-xs text-[var(--text-muted)]">{t(ui.contact.socialsSoon)}</p>
              )}
            </div>
          </div>

          <div className="mt-fluid-lg flex flex-col items-start justify-between gap-4 border-t border-[var(--border)] pt-7 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} {brand.name}. {t(ui.contact.copyright)}
            </p>
            <a
              href="#top"
              className="group -my-1 inline-flex min-h-[var(--touch)] items-center gap-2 py-1 swiss-index transition-colors duration-300 hover:text-[var(--accent)]"
            >
              {t(ui.contact.backToTop)}
              <ArrowUp
                className="icon-optical h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

/**
 * Field wrapper with a reserved error lane.
 *
 * The error animates in *after* validation fails, meaning it is inserted into a
 * flow that has already been measured — every field that gains an error pushes
 * the rest of the form down one line, and because the submit button sits below
 * all three fields, the visitor's target moves while they are aiming at it.
 *
 * A fixed-minimum lane per field, always present, removes the shift entirely:
 * the space is claimed at first paint and the message only fades into it.
 * `min-h` rather than `h` so a two-line English message still cannot clip.
 */
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
      <div className="mt-2.5 min-h-[1.375rem]">
        <AnimatePresence initial={false}>
          {error ? (
            <motion.p
              id={`${id}-error`}
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EDITORIAL }}
              className="flex items-center gap-1.5 text-xs leading-relaxed text-[#E08A78]"
            >
              <AlertCircle className="icon-optical h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              {error}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
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
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--accent)]">
        <Icon className="icon-optical h-4 w-4" strokeWidth={1.6} />
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
          className="flex min-h-[var(--touch)] items-center gap-4 rounded-xl px-2 py-2.5 transition-colors duration-300 hover:bg-[var(--accent-soft)] active:scale-[0.99]"
        >
          {body}
        </a>
      ) : (
        <div className="flex min-h-[var(--touch)] items-center gap-4 px-2 py-2.5">{body}</div>
      )}
    </li>
  );
}