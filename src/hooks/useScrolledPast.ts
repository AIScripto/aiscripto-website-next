import { useEffect, useState } from 'react';

/**
 * True once the page has scrolled more than `offset` pixels.
 * Starts false on the server and on first client render (hydration-safe).
 */
export function useScrolledPast(offset = 480): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const update = () => setPast(window.scrollY > offset);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [offset]);
  return past;
}

/**
 * Classes that keep a floating button out of the way on phones until the visitor
 * scrolls past the hero, so it never covers the first-screen calls to action.
 * Desktop (sm and up) is unaffected.
 */
export const mobileRevealClasses = (revealed: boolean) =>
  revealed ? '' : 'max-sm:opacity-0 max-sm:translate-y-4 max-sm:pointer-events-none';
