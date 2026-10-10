import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const listener = () => setMatches(mq.matches);
    setMatches(mq.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** True once the page has scrolled past `threshold`. Drives the pill nav state. */
export function useHeaderScroll(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Guard the write: this runs on every scroll frame and the value almost
      // never changes, so an unconditional setState is ~60 wasted renders per
      // second of scrolling past the hero.
      setScrolled((prev) => {
        const next = window.scrollY > threshold;
        return prev === next ? prev : next;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Returns the id of the section currently occupying the viewport.
 * Picks the section whose top has passed the offset, falling back to the
 * first section while still above them all.
 */
export function useScrollSpy(ids: readonly string[], offset = 140): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    let frame = 0;

    /**
     * Reads every tracked section's rect on each call, so it must not run more
     * often than once per frame. `getBoundingClientRect` on ten sections is
     * cheap in isolation but forces layout, and an unthrottled scroll handler
     * can fire several times per frame during momentum scrolling on trackpads —
     * which is what produces the "the whole nav jitters while I flick" feel.
     */
    const handle = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        let current = '';
        let best = -Infinity;
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top - offset;
          if (top <= 0 && top > best) {
            best = top;
            current = id;
          }
        }
        // Only write state on an actual change. Setting the same string still
        // schedules a React render, and this fires on every scroll frame.
        setActive((prev) => {
          const next = current || ids[0] || '';
          return prev === next ? prev : next;
        });
      });
    };

    handle();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, [ids, offset]);

  return active;
}

export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    /*
     * Hiding body overflow removes the scrollbar, which reflows the whole page
     * one scrollbar-width to the right — a full-page layout shift the instant a
     * drawer opens on desktop. Reserving the same width as padding holds the
     * content box exactly where it was.
     */
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [locked]);
}

export function useEscapeKey(enabled: boolean, onEscape: () => void): void {
  useEffect(() => {
    if (!enabled) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscape();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enabled, onEscape]);
}

/**
 * Measures an element and keeps the value in sync with ResizeObserver.
 * The pinned horizontal stepper needs the track's true scrollable width to
 * translate by an exact pixel distance rather than a guessed percentage.
 */
export function useElementWidth<T extends HTMLElement>(): [
  (node: T | null) => void,
  number,
] {
  const [width, setWidth] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  const ref = useCallback((node: T | null) => {
    observerRef.current?.disconnect();
    if (!node) {
      observerRef.current = null;
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(node);
    observerRef.current = observer;
    setWidth(node.getBoundingClientRect().width);
  }, []);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return [ref, width];
}

type MagneticApi = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  handlers: {
    onMouseMove: (event: ReactMouseEvent<HTMLElement>) => void;
    onMouseLeave: () => void;
  };
};

/**
 * Subtle magnetic lean toward the cursor. Auto-disabled for coarse pointers
 * (touch) and for users who asked for reduced motion.
 *
 * Springs match the page-wide SPRING budget (220/24). The magnetic is already
 * a small movement, so an under-damped spring here is what produced the
 * "nervous button" feel — the element kept moving after the cursor had left.
 */
export function useMagnetic(strength = 0.22): MagneticApi {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.85 });
  const sy = useSpring(y, { stiffness: 220, damping: 24, mass: 0.85 });

  const coarse = useMediaQuery('(hover: none)');
  const reduced = useReducedMotion();
  const enabled = !coarse && !reduced;

  return {
    x: enabled ? sx : x,
    y: enabled ? sy : y,
    handlers: {
      onMouseMove: (event) => {
        if (!enabled) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * strength);
        y.set((event.clientY - rect.top - rect.height / 2) * strength);
      },
      onMouseLeave: () => {
        x.set(0);
        y.set(0);
      },
    },
  };
}

/**
 * Counts a numeric metric up when it scrolls into view. Respects reduced motion.
 *
 * Lifecycle notes, since both the observer and the rAF loop are easy to leak:
 *
 *  · The `IntersectionObserver` is disconnected the moment it fires, so it never
 *    outlives the element it watches.
 *  · `frameRef` is cancelled on re-attach AND on unmount. Without the unmount
 *    branch a stat that scrolled into view just before navigation keeps its rAF
 *    loop running against a detached node, calling `setState` on an unmounted
 *    component for the remaining ~1s of the animation.
 *  · `document.hidden` suspends the tick and resumes from the original start
 *    time, so a backgrounded tab does not fast-forward the count on return.
 */
export function useCountUp(target: number, durationMs = 1100): { ref: (node: HTMLElement | null) => void; value: number } {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);
  const frameRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const stop = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    observerRef.current?.disconnect();
    observerRef.current = null;
  }, []);

  // Unmount safety net. `stop` is stable, so this runs exactly once.
  useEffect(() => stop, [stop]);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      stop();
      if (!node) return;

      if (reduced) {
        setValue(target);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          observerRef.current = null;

          const start = performance.now();
          const tick = (now: number) => {
            // A backgrounded tab stops the loop entirely; on return the
            // elapsed time is measured from the original start, so the count
            // finishes where it would have rather than jumping.
            if (document.hidden) {
              frameRef.current = requestAnimationFrame(tick);
              return;
            }
            const progress = Math.min((now - start) / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) {
              frameRef.current = requestAnimationFrame(tick);
            } else {
              frameRef.current = null;
            }
          };
          frameRef.current = requestAnimationFrame(tick);
        },
        { threshold: 0.4 },
      );
      observer.observe(node);
      observerRef.current = observer;
    },
    [target, durationMs, reduced, stop],
  );

  return { ref, value };
}
