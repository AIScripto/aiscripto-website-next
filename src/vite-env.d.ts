/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL?: string;
    readonly VITE_API_BASE_URL_STAGING?: string;
    readonly VITE_WHATSAPP_NUMBER?: string;
    readonly VITE_WHATSAPP_MESSAGE?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface Window {
    /** Google Analytics (gtag.js), loaded lazily from index.html. */
    gtag?: (...args: unknown[]) => void;
  }
}

export {};
