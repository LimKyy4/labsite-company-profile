import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Localized } from '../i18n/types';

export type Lang = 'id' | 'en';

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Resolves a bilingual string pair against the active language. */
  t: (value: Localized) => string;
  /** `id` | `en`, for `lang=` attributes and font/typography switches. */
  htmlLang: string;
};

const STORAGE_KEY = 'labsite-lang';

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'id';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'id' || stored === 'en') return stored;
  } catch {
    /* private mode: fall through to the default */
  }
  return 'id';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* preference simply does not persist; the session value still applies */
    }
  }, []);

  // Keep the document language in sync so screen readers, hyphenation and
  // `lang=` sensitive CSS all follow the switch. Done here rather than in an
  // effect inside each component so it is a single write per change.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (v: Localized) => (lang === 'en' ? v.en : v.id),
      htmlLang: lang,
    }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}