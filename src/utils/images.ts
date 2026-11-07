/**
 * Self-hosted stock photos (see scripts/self-host-images.mjs). Each photo exists as
 * /images/stock/<id>-<width>.webp in these widths.
 */
export const STOCK_WIDTHS = [160, 480, 960, 1440] as const;
export type StockWidth = (typeof STOCK_WIDTHS)[number];

export const stockImage = (id: string, width: StockWidth = 960) => `/images/stock/${id}-${width}.webp`;

/** srcset for responsive <img> tags, e.g. <img src={stockImage(id)} srcSet={stockSrcSet(id)} sizes="..."> */
export const stockSrcSet = (id: string) => STOCK_WIDTHS.map((w) => `${stockImage(id, w)} ${w}w`).join(', ');

/** Accepts a bare stock photo id, a site path or an absolute URL. */
export const resolveImage = (image: string, width: StockWidth = 960) =>
  image.startsWith('/') || image.startsWith('http') ? image : stockImage(image, width);
