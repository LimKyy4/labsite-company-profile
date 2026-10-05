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
    const onScroll = () => setScrolled(window.scrollY > threshold);
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
    const handle = () => {
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
      setActive(current || ids[0] || '');
    };

    handle();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, [ids, offset]);

  return active;
}

export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
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

/** Same as useElementWidth but also exposes the raw node for scroll targets. */
export function useMeasuredTrack<T extends HTMLElement>(): {
  ref: (node: T | null) => void;
  width: number;
} {
  const [ref, width] = useElementWidth<T>();
  return { ref, width };
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
 */
export function useMagnetic(strength = 0.22): MagneticApi {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 240, damping: 22, mass: 0.6 });

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

/** Counts a numeric metric up when it scrolls into view. Respects reduced motion. */
export function useCountUp(target: number, durationMs = 1100): { ref: (node: HTMLElement | null) => void; value: number } {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);
  const frameRef = useRef<number | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      if (!node) return;

      if (reduced) {
        setValue(target);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) frameRef.current = requestAnimationFrame(tick);
          };
          frameRef.current = requestAnimationFrame(tick);
        },
        { threshold: 0.4 },
      );
      observer.observe(node);
    },
    [target, durationMs, reduced],
  );

  return { ref, value };
}
