import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { faqs, sectionIndex } from '../data/companyData';
import { ui } from '../i18n/ui';
import { useLanguage } from '../context/LanguageContext';
import { RevealGroup, RevealItem, Section, EDITORIAL, SPRING_TAP } from './ui';

/**
 * `[ A4 // ENGAGEMENT_FAQ ]`
 *
 * Sits between the case studies and the contact form on purpose. It answers the
 * four questions that actually decide whether someone fills in a form —
 * cost, lock-in, timeline, support — and answering them before the form removes
 * the "I will ask later" path entirely.
 *
 * Native `<details>`-free accordion: `AnimatePresence` with measured height
 * animation, which reads better than the default clip and keeps only one panel
 * open at a time so the section never becomes a wall of text on mobile.
 */
export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);
  const { t, lang } = useLanguage();

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <Section
      id="faq"
      index={sectionIndex.faq.index}
      label={sectionIndex.faq.label}
      title={t(ui.faqTitle)}
      description={t(ui.faqDescription)}
      headingClassName="grid grid-cols-12 items-end gap-x-gutter gap-y-4"
    >
      <RevealGroup className="mt-fluid-lg grid grid-cols-12 gap-x-gutter gap-y-3">
        {faqs.map((item, index) => {
          const isOpen = openId === item.id;
          return (
            <RevealItem key={item.id} className="col-span-12 lg:col-span-6">
              <FaqRow
                number={String(index + 1).padStart(2, '0')}
                question={t(item.question)}
                answer={t(item.answer)}
                open={isOpen}
                onToggle={() => toggle(item.id)}
                localeKey={lang}
              />
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}

function FaqRow({
  number,
  question,
  answer,
  open,
  onToggle,
  localeKey,
}: {
  number: string;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  /** Re-keys the height animation so a locale switch re-measures the answer. */
  localeKey: string;
}) {
  return (
    <div
      className={`card h-full rounded-2xl transition-colors duration-300 ${
        open ? 'border-[var(--accent)]' : ''
      }`}
    >
      <motion.button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${number}`}
        id={`faq-trigger-${number}`}
        whileTap={{ scale: 0.99 }}
        transition={SPRING_TAP}
        className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
      >
        <span className="mt-0.5 font-display text-lg font-semibold tabular text-[var(--text-muted)] opacity-50">
          {number}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={`block font-display text-base font-semibold leading-snug transition-colors duration-300 ${
              open ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
            }`}
          >
            {question}
          </span>
        </span>
        <span
          aria-hidden
          className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            open
              ? 'border-[var(--accent)] text-[var(--accent)]'
              : 'border-[var(--border)] text-[var(--text-muted)]'
          }`}
        >
          {open ? <Minus className="h-3.5 w-3.5" strokeWidth={2} /> : <Plus className="h-3.5 w-3.5" strokeWidth={2} />}
        </span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key={`panel-${number}-${localeKey}`}
            id={`faq-panel-${number}`}
            role="region"
            aria-labelledby={`faq-trigger-${number}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            /* Duration curve, not a spring: spring-interpolating `auto` height
               re-measures the panel every frame and stutters visibly on longer
               answers. */
            transition={{ duration: 0.34, ease: EDITORIAL }}
            className="overflow-hidden"
          >
            <p className="max-w-[62ch] px-5 pb-6 pl-[3.25rem] text-sm leading-relaxed text-[var(--text-secondary)] sm:px-6 sm:pl-[3.75rem]">
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}