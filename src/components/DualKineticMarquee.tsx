import { Marquee } from './Marquee';
import { ui } from '../i18n/ui';
import { useLanguage } from '../context/LanguageContext';
import { techBadges } from '../data/companyData';

/**
 * Dual-lane kinetic badge marquee.
 *
 * Two rows of the same eight architectural constraints running in opposite
 * directions. The counter-rotation is doing real work, not decoration: two
 * lanes moving together read as a single flat band with a seam, whereas
 * opposing lanes make the wrap point visible as a change of direction, so the
 * eye never catches the join.
 *
 * `Marquee` supplies the seamless mechanism (two identical copies translating
 * -50%, transform-only so it stays on the compositor, paused on hover and
 * focus). This component only composes lanes and owns the border treatment.
 *
 * On the hover glow: it is a hairline colour shift plus a very low-alpha tint
 * of the accent, not a blur or a bloom. A real glow would need either a blur
 * layer or a saturated halo, and both read as neon on a cream page — which is
 * exactly the failure mode this project's design language avoids. The shift is
 * enough to make the strip feel live under the cursor.
 */
export default function DualKineticMarquee() {
  const { t } = useLanguage();

  // Same duration on both lanes. Different tempos desynchronise the two tracks,
  // so the reverse lane spends most of its cycle parked near its wrap point
  // where the item seam is briefly visible — which defeats the whole reason
  // for two lanes. Identical duration plus opposite direction keeps them
  // mirror images at every instant.
  const lane = (reverse: boolean) => (
    <Marquee
      duration={40}
      reverse={reverse}
      itemClassName="flex items-center gap-2.5 whitespace-nowrap font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-[var(--text-muted)] md:text-[11px]"
      gapClassName="gap-6"
      edgeClassName="pr-6"
      ariaLabel={t(ui.manifesto.badgeLaneAria)}
    >
      {techBadges.map((badge) => (
        <span
          key={badge.id}
          className="flex items-center gap-2.5 transition-colors duration-500 ease-editorial hover:text-[var(--text-primary)]"
        >
          <span>{t(badge)}</span>
          <span className="inline-block h-1 w-1 rotate-45 bg-[var(--accent)]" aria-hidden />
        </span>
      ))}
    </Marquee>
  );

  return (
    <div
      data-marquee-strip
      className="group relative mt-fluid-xl overflow-hidden border-y border-[var(--border)] transition-colors duration-500 ease-editorial hover:border-[var(--accent)]/45"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Hairline wash that lifts on hover. Two flat layers instead of one
          blurred one: an accent tint at 4% alpha is visible against cream
          without ever reading as a glow. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[var(--accent)] opacity-0 transition-opacity duration-500 ease-editorial group-hover:opacity-[0.04]"
      />
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--accent)] opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--accent)] opacity-0 transition-opacity duration-500 group-hover:opacity-40" />

      <div className="relative flex flex-col py-3">
        {lane(false)}
        {lane(true)}
      </div>
    </div>
  );
}