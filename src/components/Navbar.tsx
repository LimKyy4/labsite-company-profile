import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react';
import { brand, navLinks, sectionIds, systemStatus } from '../data/companyData';
import { ui } from '../i18n/ui';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useHeaderScroll, useLockBodyScroll, useScrollSpy } from '../hooks';
import { EDITORIAL, SPRING } from './ui';

export default function Navbar() {
  const scrolled = useHeaderScroll(40);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(sectionIds);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  useLockBodyScroll(open);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EDITORIAL }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center px-3 pt-3 sm:px-4 sm:pt-4"
    >
      {/*
        Backdrop.

        Two layers, because one was not enough. A single full-bleed `bg-bg/85
        backdrop-blur-xl` let headline text scrolling underneath read *through*
        the header as a smear: the blur sampled the text mid-stroke, so the type
        appeared to sit on top of the nav rather than behind it.

        Layer 1 is a near-opaque sheet (94%) that kills the smear. Layer 2 adds
        the blur and the hairline. The result is a frosted panel that still
        shows a *suggestion* of what is below — which is the point of a floating
        capsule — without any glyph ever being legible through it.
      */}
      <AnimatePresence initial={false}>
        {scrolled || open ? (
          <motion.div
            key="nav-backdrop"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EDITORIAL }}
            className="pointer-events-none absolute inset-0 border-b border-[var(--border)] bg-[var(--bg)]"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {scrolled || open ? (
          <motion.div
            key="nav-blur"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EDITORIAL }}
            className="pointer-events-none absolute inset-0 bg-[var(--bg)]/55 backdrop-blur-xl"
          />
        ) : null}
      </AnimatePresence>

      {/* Operational strip. Sits above the nav pill rather than inside it so the
          long mono readout never fights the logo for horizontal room. */}
      <div className="pointer-events-auto mb-1.5 hidden w-full max-w-[84rem] items-center gap-3 px-1 lg:flex">
        <StatusReadout />
        <span className="ml-auto swiss-index swiss-index-nowrap">{t(brand.role)}</span>
      </div>

      <nav
        aria-label={t(ui.nav.aria)}
        /* `py-1` rather than `py-2`: the 44px theme button now sets the pill's
           content height, and py-2 on top of that added 16px of dead space above
           and below. The controls themselves carry the target size. */
        /* 320px is the tight width: 44px theme + 44px menu + the ID/EN pair
           already exceed the 320 - 16px of available pill width, so the wordmark
           is dropped rather than letting the capsule overflow. The brand is
           still in the footer, and `#top` is reachable from the drawer. */
        className={`pointer-events-auto flex w-full max-w-5xl items-center gap-1.5 rounded-full border px-2 py-1 transition-all duration-500 ease-editorial sm:gap-2 sm:px-3 xl:max-w-[84rem] ${
          scrolled || open
            ? 'border-[var(--border)] bg-[var(--bg)]/92 shadow-pill backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        {/* Below `xs` the 44px theme and menu buttons plus the ID/EN pair leave
            no room for a wordmark without overflowing the capsule. The logo
            mark alone survives: it is 28px and still reads as a mark, and the
            wordmark returns in full from 360px up. */}
        {/* `-my-1.5` extends the hit area to 44px vertically without adding visual
            height to the capsule; the logo mark itself stays 28px. */}
        <a
          href="#top"
          className="group -my-1.5 flex min-h-[var(--touch)] shrink-0 items-center gap-2 px-1 py-1.5 sm:gap-2.5 sm:pr-2"
        >
          <CircuitLogo />
          <span className="hidden flex-col leading-none min-[360px]:flex">
            <span className="font-display text-sm font-semibold tracking-tight sm:text-base">
              {brand.name}
            </span>
            {/* Mobile-only role line: the desktop readout lives in the strip
                above, and this keeps the wordmark from being just a logo. */}
            <span className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.18em] text-[var(--text-muted)] sm:hidden">
              {t(ui.nav.roleShort)}
            </span>
          </span>
        </a>

        {/*
          Five grouped categories instead of eight anchor names.

          At `lg` the previous eight 11px mono labels needed ~560px of label
          width plus eight 28px pills' padding — roughly 780px inside a pill
          that also had to hold the logo, the CTA and the theme button. It
          only fit by squeezing to 10px, at which point "MANIFESTO" and
          "ARSITEKTUR" sat 2px apart and read as one word.

          Grouping solves it structurally rather than typographically: five
          short labels fit at a comfortable size, and each one owns several
          sections, so nothing is lost — the mobile drawer and the footer still
          expose every section individually.
        */}
        <ul className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
          {navLinks.map((link) => {
            const isActive = link.targets.includes(active);
            return (
              <li key={link.id} className="min-w-0">
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block rounded-full px-2.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-300 xl:px-3.5 xl:text-[11px] xl:tracking-[0.14em] ${
                    isActive
                      ? 'text-[var(--accent-contrast)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[var(--accent)]"
                      transition={SPRING}
                    />
                  ) : null}
                  <span className="relative z-10 flex items-baseline gap-1 whitespace-nowrap">
                    <span className="text-[9px] opacity-55 xl:text-[9.5px]">{link.index}</span>
                    <span>{t(link.label)}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Controls. `shrink-0` on the group plus `min-w-0` on the list above
            means the nav list absorbs the pressure when space runs out —
            the capsule never grows past its container. */}
        <div className="ml-auto flex shrink-0 items-center gap-1.5 lg:ml-0 sm:gap-2">
          <LanguageSwitch />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <a
            href="#contact"
            className="hidden min-h-[var(--touch)] items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--accent-contrast)] transition-colors duration-300 hover:bg-[var(--accent-hover)] active:scale-[0.97] xl:gap-2 xl:px-5 xl:text-[11px] md:inline-flex"
          >
            {t(ui.nav.cta)}
            <ArrowRight className="icon-optical h-3.5 w-3.5" strokeWidth={2.2} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? t(ui.global.closeMenu) : t(ui.global.openMenu)}
            aria-expanded={open}
            aria-controls={open ? 'nav-drawer' : undefined}
            className="inline-flex h-[var(--touch)] w-[var(--touch)] shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-primary)] transition-colors duration-300 hover:border-[var(--accent)] active:scale-[0.97] lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="pill-drawer"
            id="nav-drawer"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={SPRING}
            className="pointer-events-auto absolute inset-x-3 top-[calc(100%+0.5rem)] origin-top overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg)]/97 shadow-pill backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center gap-2.5 border-b border-[var(--border)] px-4 py-3">
              <span className="status-pulse" aria-hidden />
              <span className="swiss-index swiss-index-nowrap">
                {t(systemStatus.state)} · {systemStatus.latency}
              </span>
            </div>

            {/* Every section is listed here, not just the five nav categories:
                the drawer is the only place a phone visitor can reach the
                mid-page sections, so collapsing them to five would remove
                real navigation. */}
            <DrawerLinks onNavigate={() => setOpen(false)} />

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex min-h-[var(--touch)] items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--accent-contrast)] active:scale-[0.98]"
            >
              {t(ui.nav.drawerCta)}
              <ArrowRight className="icon-optical h-3.5 w-3.5" strokeWidth={2.2} />
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

/** Flat list of every section, ordered, for the mobile drawer. */
const DRAWER_LINKS = [
  { id: 'about', label: 'Partner' },
  { id: 'focus', label: 'Prinsip' },
  { id: 'problems', label: 'Diagnosis' },
  { id: 'approach', label: 'Metode' },
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'solutions', label: 'Arsitektur' },
  { id: 'work', label: 'Kasus' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Kontak' },
] as const;

/**
 * Bilingual drawer labels. Kept local rather than in the data layer because
 * these are navigation chrome that must not drift when content is reordered.
 */
const DRAWER_LABELS: Record<string, { id: string; en: string }> = {
  about: { id: 'Partner', en: 'Partner' },
  focus: { id: 'Prinsip', en: 'Principle' },
  problems: { id: 'Diagnosis', en: 'Diagnosis' },
  approach: { id: 'Metode', en: 'Method' },
  manifesto: { id: 'Manifesto', en: 'Manifesto' },
  solutions: { id: 'Arsitektur', en: 'Architecture' },
  work: { id: 'Kasus', en: 'Cases' },
  faq: { id: 'FAQ', en: 'FAQ' },
  contact: { id: 'Kontak', en: 'Contact' },
};

function DrawerLinks({ onNavigate }: { onNavigate: () => void }) {
  const active = useScrollSpy(sectionIds);
  const { lang } = useLanguage();

  return (
    <ul>
      {DRAWER_LINKS.map((link, index) => {
        const label = DRAWER_LABELS[link.id];
        const isActive = active === link.id;
        return (
          <motion.li
            key={link.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...SPRING, delay: 0.025 * index }}
          >
            <a
              href={`#${link.id}`}
              onClick={onNavigate}
              className={`flex min-h-[var(--touch)] items-center justify-between border-b border-[var(--border)] px-4 py-3 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors active:bg-[var(--accent-soft)] ${
                isActive ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
              }`}
            >
              <span className="min-w-0 truncate">{lang === 'en' ? label.en : label.id}</span>
              <span className="swiss-index shrink-0 pl-3">{String(index + 1).padStart(2, '0')}</span>
            </a>
          </motion.li>
        );
      })}
    </ul>
  );
}

/**
 * `SYSTEM STATUS: ALL ENGINES OPERATIONAL (0ms LATENCY)`
 *
 * The latency figure is derived from the same `systemStatus` object the mobile
 * drawer reads, so there is exactly one source of truth for the readout and no
 * chance of the two drifting apart.
 */
function StatusReadout() {
  const { t } = useLanguage();

  return (
    <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
      <span className="status-pulse" aria-hidden />
      <span className="text-[var(--text-primary)]">{t(systemStatus.label)}:</span>
      <span>{t(systemStatus.state)}</span>
      <span className="text-[var(--text-muted)]">
        ({systemStatus.latency} {t(ui.nav.latency)})
      </span>
      <span className="text-[var(--text-muted)]">· {systemStatus.region}</span>
    </p>
  );
}

/**
 * ID | EN segmented control.
 *
 * `role="group"` with two `aria-pressed` buttons rather than a `radiogroup`:
 * a language switch is a pair of independent toggles in most AT conventions,
 * and radio semantics force arrow-key navigation that would be surprising here.
 * The active side carries both a colour change *and* the pressed state, so the
 * current language is never conveyed by hue alone.
 */
function LanguageSwitch() {
  const { lang, setLang } = useLanguage();
  const { t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t(ui.global.langSwitchLabel)}
      className="flex shrink-0 items-center rounded-full border border-[var(--border)] p-0.5"
    >
      {(['id', 'en'] as const).map((code) => {
        const isActive = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={isActive}
            lang={code}
            className={`relative -my-1 min-h-[var(--touch)] min-w-[var(--touch)] rounded-full px-1 py-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 xl:text-[10px] ${
              isActive
                ? 'text-[var(--accent-contrast)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {isActive ? (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-[var(--accent)]"
                transition={SPRING}
              />
            ) : null}
            <span className="relative z-10">{code}</span>
          </button>
        );
      })}
    </div>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: 'light' | 'dark'; onToggle: () => void }) {
  const isDark = theme === 'dark';
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? t(ui.global.themeToLight) : t(ui.global.themeToDark)}
      className="relative inline-flex h-[var(--touch)] w-[var(--touch)] shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-[0.97]"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.32, ease: EDITORIAL }}
          className="absolute"
        >
          {isDark ? <Sun className="h-4 w-4" strokeWidth={1.6} /> : <Moon className="h-4 w-4" strokeWidth={1.6} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/** LABSITE.ID circuit mark: two rounded nodes joined by an orthogonal trace. */
export function CircuitLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={`h-7 w-7 shrink-0 text-[var(--accent)] transition-transform duration-500 ease-editorial group-hover:-rotate-12 ${className}`}
    >
      <path
        d="M13 19v-4a2 2 0 0 1 2-2h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="10.5" cy="21.5" r="3.25" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="21.5" cy="10.5" r="3.25" fill="currentColor" />
      <circle cx="21.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="0.9" opacity="0.3" />
    </svg>
  );
}