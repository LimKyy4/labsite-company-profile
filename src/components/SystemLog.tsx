import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { systemLogs } from '../data/companyData';
import { ui } from '../i18n/ui';
import { useLanguage } from '../context/LanguageContext';
import { useMediaQuery, useReducedMotion } from '../hooks';
import { EDITORIAL } from './ui';

const ROTATE_MS = 5200;

/**
 * Live engineering log stream.
 *
 * Reads as an instrument panel rather than marketing: mono tag, rotating
 * telemetry line, dismissible. Three constraints shaped it:
 *
 * 1. It stays silent until the hero has scrolled away. A fixed bottom-corner
 *    panel that is already sitting on top of the hero's diagnoser controls is
 *    not atmosphere, it is a bug — the visitor's first interaction is choosing
 *    a problem, and the toast was covering half those buttons.
 * 2. It pauses on hover/focus and on tab blur, and is disabled outright under
 *    reduced motion. An auto-advancing notification is precisely what that
 *    setting asks us to withhold.
 * 3. It is not a live region. Unsolicited announcements every five seconds
 *    would talk over whatever the visitor is actually reading.
 *
 * Dismissal keys off the Indonesian text hash rather than the array index, so a
 * dismissed line stays dismissed in English too. Keying on the index would
 * resurrect dismissed entries the moment the locale changed.
 */
export default function SystemLog() {
  const reduced = useReducedMotion();
  const roomy = useMediaQuery('(min-width: 640px)');
  const { t, lang } = useLanguage();
  const [dismissed, setDismissed] = useState<readonly number[]>([]);
  const [cursor, setCursor] = useState(0);
  const [paused, setPaused] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const check = () => {
      if (window.scrollY > window.innerHeight * 0.85) setArmed(true);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  useEffect(() => {
    if (reduced || !armed) return undefined;

    const timer = window.setInterval(() => {
      if (paused || document.hidden) return;
      setCursor((prev) => (prev + 1) % systemLogs.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [reduced, armed, paused]);

  if (reduced || !armed) return null;

  const current = systemLogs[cursor % systemLogs.length];
  const previous = systemLogs[(cursor - 1 + systemLogs.length) % systemLogs.length];
  // Only the newest line is live; on a roomy screen the one above it is kept
  // as history so the corner reads like a tail, not a banner.
  const queue = roomy && previous.text.id !== current.text.id ? [previous, current] : [current];
  const shown = queue.filter((entry) => !dismissed.includes(hash(entry.text.id)));

  return (
    <div
      className="pointer-events-none fixed inset-x-3 bottom-3 z-40 flex flex-col items-start gap-2 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:items-end"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        {shown.map((entry) => (
          <motion.div
            key={`${hash(entry.text.id)}-${lang}`}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.99 }}
            transition={{ duration: 0.32, ease: EDITORIAL }}
            className="pointer-events-auto flex w-full max-w-[min(21rem,calc(100vw-1.5rem))] items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/95 px-3.5 py-2.5 shadow-pill backdrop-blur-md sm:w-auto"
          >
            <span className="status-pulse mt-1" aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[9px] uppercase leading-none tracking-[0.2em] text-[var(--accent)]">
                {entry.tag}
              </span>
              <span className="mt-1.5 block font-mono text-[10.5px] leading-snug text-[var(--text-secondary)]">
                {t(entry.text)}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setDismissed((prev) => [...prev, hash(entry.text.id)])}
              aria-label={`${t(ui.systemLog.dismiss)}: ${t(entry.text)}`}
              className="-mr-1 -mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text-primary)]"
            >
              <X className="h-3 w-3" strokeWidth={2} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/** Stable key from the Indonesian log text — the array is short and never reordered. */
function hash(text: string): number {
  let value = 0;
  for (let i = 0; i < text.length; i += 1) {
    value = (value * 31 + text.charCodeAt(i)) | 0;
  }
  return value;
}