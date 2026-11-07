// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from '../App';

/**
 * The prerendered HTML in dist/ must hydrate cleanly. A mismatch makes React discard
 * the server HTML and re-render the page (a visible flash, and wasted work).
 *
 * Uses the real build output, so it only runs after `npm run build` (CI does this);
 * it is skipped when dist/ is absent.
 */

const dist = path.join(process.cwd(), 'dist');
const ROUTES: [string, string][] = [
  ['/', 'index.html'],
  ['/services/erp', 'services/erp.html'],
  ['/products/nexus-agent', 'products/nexus-agent.html'],
  ['/contact', 'contact.html'],
  ['/events', 'events.html'],
  ['/blog', 'blog.html'],
  ['/industries/healthcare', 'industries/healthcare.html'],
];
const hasBuild = fs.existsSync(path.join(dist, 'contact.html'));

beforeAll(() => {
  class IO { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } }
  (globalThis as unknown as { IntersectionObserver: typeof IO }).IntersectionObserver ??= IO;
  window.matchMedia ??= ((query: string) => ({
    matches: false, media: query, onchange: null,
    addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
});

const THEMES = ['dark (default)', 'light (saved preference)'] as const;
const CASES = THEMES.flatMap((theme) => ROUTES.map(([url, file]) => [url, file, theme] as const));

describe.skipIf(!hasBuild)('hydration of prerendered pages', () => {
  it.each(CASES)('%s hydrates without mismatches (%s, theme: %s)', async (url, file, theme) => {
    localStorage.clear();
    if (theme.startsWith('light')) {
      localStorage.setItem('theme_explicit', 'true');
      localStorage.setItem('theme', 'light');
    }

    const doc = new DOMParser().parseFromString(fs.readFileSync(path.join(dist, file), 'utf8'), 'text/html');
    const rootHtml = doc.getElementById('root')!.innerHTML;
    expect(rootHtml).toMatch(/<h1[\s>]/);

    window.history.replaceState({}, '', url);
    document.body.innerHTML = `<div id="root">${rootHtml}</div>`;
    const container = document.getElementById('root')!;

    const errors: string[] = [];
    const consoleError = vi.spyOn(console, 'error').mockImplementation((...args) => {
      const msg = String(args[0]);
      if (/hydrat/i.test(msg)) errors.push(msg.slice(0, 300));
    });

    let root: ReturnType<typeof hydrateRoot> | undefined;
    await act(async () => {
      root = hydrateRoot(container, <App />, {
        onRecoverableError: (error) => errors.push(String((error as Error)?.message ?? error).slice(0, 300)),
      });
      await new Promise((r) => setTimeout(r, 100)); // let lazy route chunks resolve
    });

    consoleError.mockRestore();
    expect(errors).toEqual([]);
    expect(container.querySelector('h1')).not.toBeNull();
    act(() => root?.unmount());
  });
});
