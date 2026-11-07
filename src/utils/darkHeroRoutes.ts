import { productSpotlights } from '../data/productSpotlight';
import { serviceSpotlights } from '../data/serviceSpotlight';

/**
 * Routes whose hero is a dark stage in both themes (home hero and SpotlightHero pages).
 * The Navbar uses this to switch to its light-on-dark style while at the top of the page.
 */
export function hasDarkHero(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/' || path === '/products' || path === '/services') return true;
  const product = /^\/products\/([^/]+)$/.exec(path);
  if (product) return Boolean(productSpotlights[product[1]]);
  const service = /^\/services\/([^/]+)$/.exec(path);
  if (service) return Boolean(serviceSpotlights[service[1]]);
  return false;
}
