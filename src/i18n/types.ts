/**
 * Bilingual content primitive.
 *
 * Every user-facing string in this project is authored as a pair rather than as
 * a bare literal. That is what makes "zero hybrid language" enforceable by
 * construction instead of by discipline: there is no way to add an Indonesian
 * sentence without also writing its English counterpart, and `t()` can never
 * fall through to an untranslated fallback because no fallback exists.
 *
 * Structural data — ids, icon components, numbers, URLs — stays untranslated on
 * purpose. Only prose crosses this boundary.
 */
export type Localized = {
  readonly id: string;
  readonly en: string;
};

/** Shorthand constructor. Keeps the data layer readable: `tr('Foo', 'Bar')`. */
export function tr(id: string, en: string): Localized {
  return { id, en };
}