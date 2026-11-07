import React, { createContext, startTransition, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export type ThemeMode = 'dark' | 'light';
export type AccentTheme = 'teal' | 'cobalt' | 'violet' | 'emerald' | 'amber' | 'rose' | 'slate' | 'indigo';

export interface AccentOption {
  id: AccentTheme;
  name: string;
  tagline: string;
  domain: string;
  primaryColor: string;
  secondaryColor: string;
}

export const ACCENT_OPTIONS: AccentOption[] = [
  {
    id: 'teal',
    name: 'Electric Teal',
    tagline: 'Signature Enterprise',
    domain: 'Core Platform',
    primaryColor: '#0d9488',
    secondaryColor: '#0ea5e9',
  },
  {
    id: 'cobalt',
    name: 'Cyber Cobalt',
    tagline: 'Cloud Scale & AI Systems',
    domain: 'Hyperscale Cloud',
    primaryColor: '#2563eb',
    secondaryColor: '#38bdf8',
  },
  {
    id: 'violet',
    name: 'Neural Violet',
    tagline: 'Cognitive AI & Deep Learning',
    domain: 'Neural Models',
    primaryColor: '#7c3aed',
    secondaryColor: '#d946ef',
  },
  {
    id: 'emerald',
    name: 'Quantum Emerald',
    tagline: 'FinTech & Sovereign Security',
    domain: 'Ledger & Audit',
    primaryColor: '#059669',
    secondaryColor: '#34d399',
  },
  {
    id: 'amber',
    name: 'Solar Amber',
    tagline: 'High-Velocity Operations',
    domain: 'Live Telemetry',
    primaryColor: '#d97706',
    secondaryColor: '#f59e0b',
  },
  {
    id: 'rose',
    name: 'Crimson Pulse',
    tagline: 'SecOps & Threat Intel',
    domain: 'Cyber Defense',
    primaryColor: '#e11d48',
    secondaryColor: '#fb7185',
  },
  {
    id: 'slate',
    name: 'Stealth Obsidian',
    tagline: 'Minimalist Engineering',
    domain: 'Linear Tech',
    primaryColor: '#334155',
    secondaryColor: '#94a3b8',
  },
  {
    id: 'indigo',
    name: 'Deep Indigo',
    tagline: 'Developer Ecosystem',
    domain: 'APIs & Services',
    primaryColor: '#4f46e5',
    secondaryColor: '#818cf8',
  },
];

const VALID_ACCENTS = new Set<string>(ACCENT_OPTIONS.map((o) => o.id));

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  accent: AccentTheme;
  setAccent: (accent: AccentTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start as 'dark' — the theme pages are prerendered in — so hydration matches
  // the server HTML. The inline script in index.html sets the <html> class from saved preference.
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [accent, setAccentState] = useState<AccentTheme>('teal');
  const hasAppliedInitial = useRef(false);

  useEffect(() => {
    // The inline script in index.html already chose the theme (explicit choice, else system
    // setting) and the accent; mirror what it put on <html> so React state matches.
    const root = window.document.documentElement;
    let savedTheme: string | null = root.classList.contains('light') ? 'light' : null;
    let savedAccent: string | null = root.getAttribute('data-accent');
    try {
      if (!savedTheme && localStorage.getItem('theme_explicit') === 'true') {
        savedTheme = localStorage.getItem('theme');
      }
      savedAccent = savedAccent || localStorage.getItem('accent_theme');
    } catch {
      // Storage blocked (private mode): keep default
    }

    if (savedTheme === 'light') {
      startTransition(() => setTheme('light'));
    }
    if (savedAccent && VALID_ACCENTS.has(savedAccent)) {
      startTransition(() => setAccentState(savedAccent as AccentTheme));
    }
  }, []);

  useEffect(() => {
    if (!hasAppliedInitial.current) {
      hasAppliedInitial.current = true;
      return;
    }
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const hasAppliedInitialAccent = useRef(false);
  useEffect(() => {
    // Skip the first run: it would briefly reset the saved accent to the 'teal' default
    // before the restore above lands (one-frame flicker).
    if (!hasAppliedInitialAccent.current) {
      hasAppliedInitialAccent.current = true;
      return;
    }
    const root = window.document.documentElement;
    root.setAttribute('data-accent', accent);
    try {
      localStorage.setItem('accent_theme', accent);
    } catch {
      // ignore
    }
  }, [accent]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('theme_explicit', 'true');
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setTheme(mode);
    try {
      localStorage.setItem('theme_explicit', 'true');
    } catch {
      // ignore
    }
  }, []);

  const setAccent = useCallback((newAccent: AccentTheme) => {
    setAccentState(newAccent);
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme, setThemeMode, accent, setAccent }),
    [theme, toggleTheme, setThemeMode, accent, setAccent]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
