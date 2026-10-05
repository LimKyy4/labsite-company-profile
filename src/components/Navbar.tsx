import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { brand, navLinks } from '../data/companyData';
import { useTheme } from '../context/ThemeContext';
import { useHeaderScroll, useLockBodyScroll, useScrollSpy } from '../hooks';
import { EDITORIAL, SPRING } from './ui';

const SECTION_IDS = navLinks.map((link) => link.id);

export default function Navbar() {
  const scrolled = useHeaderScroll(40);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SECTION_IDS);
  const { theme, toggleTheme } = useTheme();

  useLockBodyScroll(open);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EDITORIAL }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6"
    >
      <nav
        aria-label="Navigasi utama"
        className={`pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-500 ease-editorial sm:px-4 xl:max-w-[84rem] ${
          scrolled || open
            ? 'border-[var(--border)] bg-[var(--bg)]/80 shadow-pill backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#top" className="group flex shrink-0 items-center gap-2.5 pl-1 pr-2">
          <CircuitLogo />
          <span className="font-display text-sm font-semibold tracking-tight sm:text-base">
            {brand.name}
          </span>
        </a>

        <ul className="hidden items-center lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block rounded-full px-4 py-2 text-[13px] transition-colors duration-300 ${
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
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <a
            href="#contact"
            className="hidden rounded-full bg-[var(--accent)] px-5 py-2 text-[13px] font-semibold text-[var(--accent-contrast)] transition-colors duration-300 hover:bg-[var(--accent-hover)] sm:inline-block"
          >
            Konsultasi
          </a>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-primary)] transition-colors duration-300 hover:border-[var(--accent)] lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="pill-drawer"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={SPRING}
            className="pointer-events-auto absolute inset-x-4 top-[calc(100%+0.5rem)] origin-top overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg)]/95 p-2 shadow-pill backdrop-blur-xl lg:hidden"
          >
            <ul>
              {navLinks.map((link, index) => {
                const isActive = active === link.id;
                return (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...SPRING, delay: 0.03 * index }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between border-b border-[var(--border)] px-4 py-3.5 text-sm transition-colors ${
                        isActive ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
                      }`}
                    >
                      {link.label}
                      <span className="swiss-index">{String(index + 1).padStart(2, '0')}</span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-[var(--accent)] px-5 py-3 text-center text-sm font-semibold text-[var(--accent-contrast)]"
            >
              Konsultasi
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: 'light' | 'dark'; onToggle: () => void }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
      className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={theme}
          initial={{ rotate: -100, scale: 0.3, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 100, scale: 0.3, opacity: 0 }}
          transition={{ duration: 0.38, ease: EDITORIAL }}
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
