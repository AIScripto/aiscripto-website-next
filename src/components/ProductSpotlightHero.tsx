import type { Product } from '../data/products';
import type { ProductSpotlight } from '../data/productSpotlight';
import { resolveImage, stockSrcSet } from '../utils/images';
import SpotlightHero, { SpotlightPhoto, SpotlightScreenshot } from './SpotlightHero';

const isStockId = (s: string) => /^\d{10,}-[0-9a-f]{6,}$/.test(s);

/** Product page hero: the shared SpotlightHero with the product's own accent and art. */
export default function ProductSpotlightHero({ product, spotlight }: { product: Product; spotlight: ProductSpotlight }) {
  const demoUrl = product.demoUrl && /^https?:\/\//.test(product.demoUrl) ? product.demoUrl : null;
  const art = spotlight.art;

  return (
    <SpotlightHero
      heading={product.name}
      eyebrow={spotlight.eyebrow}
      badge={product.badge}
      titleLead={spotlight.titleLead}
      titleAccent={spotlight.titleAccent}
      lead={spotlight.lead}
      accent={spotlight.accent}
      accentInk={spotlight.accentInk}
      cards={spotlight.cards}
      primary={{ label: 'Book a consultation', to: `/contact?product=${product.id}&demo=true` }}
      secondary={demoUrl ? { label: 'Try a live demo', href: demoUrl, external: true } : { label: 'Learn more', href: '#product-details' }}
      media={
        art ? (
          <SpotlightPhoto
            src={resolveImage(art, 960)}
            srcSet={isStockId(art) ? stockSrcSet(art) : undefined}
            alt={spotlight.artAlt ?? `${product.shortName} in use`}
          />
        ) : (
          <SpotlightScreenshot src={product.image} alt={`${product.shortName} dashboard`} />
        )
      }
    />
  );
}
