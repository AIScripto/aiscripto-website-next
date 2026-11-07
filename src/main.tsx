import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Prerendered pages ship real HTML inside #root: hydrate it so React adopts the
// existing markup (no blank flash while route chunks load). The dev server and
// the SPA fallback ship an empty #root, so render from scratch there.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
