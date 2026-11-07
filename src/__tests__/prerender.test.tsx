// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render } from '../entry-server';

/**
 * Server-side render of key routes: real content, correct canonical, indexable.
 * Hydration of the built HTML is covered by hydration.test.tsx (runs after build).
 */

beforeAll(() => {
  class IO { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } }
  (globalThis as unknown as { IntersectionObserver: typeof IO }).IntersectionObserver ??= IO;
  window.matchMedia ??= ((query: string) => ({
    matches: false, media: query, onchange: null,
    addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
});

const ROUTES = ['/', '/services/erp', '/products/nexus-agent', '/contact', '/events', '/blog'];

describe('prerendered pages', () => {
  it.each(ROUTES)('%s renders real content and head data on the server', async (url) => {
    const { html, head } = await render(url);
    expect(html).toMatch(/<h1[\s>]/);
    expect(head?.title).toBeTruthy();
    expect(head?.canonical).toBe(`https://www.aiscripto.com${url === '/' ? '/' : url}`);
    expect(head?.noIndex).toBe(false);
  });

  it('renders the 404 page as noindex', async () => {
    const { head } = await render('/definitely-not-a-page');
    expect(head?.noIndex).toBe(true);
  });
});
