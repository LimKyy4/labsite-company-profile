import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ui } from '../i18n/ui';
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

const LOCALE_BY_LANG: Record<Lang, string> = { id: 'id_ID', en: 'en_US' };

/**
 * Mirror the active language into the document head so the *served* metadata
 * follows the switch, not just the visible UI. The tags below are authored in
 * index.html with Indonesian defaults; on a switch this rewrites them in place
 * (ids are stable, so there is no orphan tag accumulation).
 */
function syncDocumentHead(lang: Lang) {
  const resolve = (value: Localized) => (lang === 'en' ? value.en : value.id);
  const locale = LOCALE_BY_LANG[lang];
  const node = document.documentElement;

  node.lang = lang;
  document.title = resolve(ui.seo.title);

  const setBy = (attr: 'name' | 'property', key: string, content: string) => {
    const el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (el) el.content = content;
  };

  setBy('name', 'description', resolve(ui.seo.description));
  setBy('property', 'og:title', resolve(ui.seo.title));
  setBy('property', 'og:description', resolve(ui.seo.description));
  setBy('property', 'og:locale', locale);
  setBy('property', 'og:locale:alternate', locale === 'id_ID' ? 'en_US' : 'id_ID');
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

  // Keep the document language AND the head metadata in sync so screen
  // readers, hyphenation, crawlers and social scrapers all follow the switch.
  // Done here rather than in an effect inside each component: a single write
  // per change, and `htmlLang` stays available to consumers for `lang=`
  // attributes elsewhere.
  useEffect(() => syncDocumentHead(lang), [lang]);

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