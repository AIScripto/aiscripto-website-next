import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Palette, Check, Sparkles } from 'lucide-react';
import { useTheme, ACCENT_OPTIONS, AccentTheme } from '../hooks/useTheme';
import { cn } from '../utils/cn';

interface ThemeSwitcherProps {
  className?: string;
  variant?: 'compact' | 'full';
  isOverDark?: boolean;
}

export default function ThemeSwitcher({
  className,
  variant: _variant = 'compact',
  isOverDark = false,
}: ThemeSwitcherProps) {
  const { theme, toggleTheme, setThemeMode, accent, setAccent } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const activeOption = ACCENT_OPTIONS.find((opt) => opt.id === accent) ?? ACCENT_OPTIONS[0];

  return (
    <div ref={containerRef} className={cn('relative inline-flex items-center gap-1', className)}>
      {/* Quick Light / Dark Mode Toggle Button */}
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "p-2 rounded-full transition-all duration-300",
          isOverDark
            ? "text-white/90 hover:text-white hover:bg-white/10"
            : "p-2 rounded-full hover:bg-muted text-foreground"
        )}
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" aria-hidden="true" />
        ) : (
          <Moon className={cn("w-4 h-4 transition-transform", isOverDark ? "text-cyan-300 hover:-rotate-12" : "text-slate-700 hover:-rotate-12")} aria-hidden="true" />
        )}
      </button>

      {/* Palette Customizer Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'p-2 rounded-full transition-all duration-300 flex items-center gap-1.5',
          open
            ? 'bg-primary/20 text-primary'
            : isOverDark
            ? 'text-white/90 hover:text-white hover:bg-white/10'
            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
        )}
        aria-label="Customize accent color theme"
        aria-haspopup="dialog"
        aria-expanded={open}
        title={`Theme Palette: ${activeOption.name}`}
      >
        <Palette className="w-4 h-4" aria-hidden="true" />
        <span
          className={cn(
            "w-2.5 h-2.5 rounded-full border shadow-xs transition-colors",
            isOverDark ? "border-white/50" : "border-background"
          )}
          style={{ backgroundColor: activeOption.primaryColor }}
          aria-hidden="true"
        />
      </button>

      {/* Comprehensive Theme Studio Popover */}
      {open && (
        <div
          role="dialog"
          aria-label="Color Theme Options"
          className="absolute right-0 top-full mt-2 w-72 p-3.5 rounded-3xl bg-card/95 backdrop-blur-xl border border-border shadow-2xl z-50 animate-fade-down"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-border/70">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              <span className="text-xs font-bold text-foreground tracking-tight">Theme Studio</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
              {activeOption.name}
            </span>
          </div>

          {/* Segmented Light / Dark Switcher */}
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-muted/60 border border-border/60 mb-3 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setThemeMode('light')}
              className={cn(
                'flex items-center justify-center gap-1.5 py-1.5 rounded-xl transition-all',
                theme === 'light'
                  ? 'bg-card text-foreground shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
              <span>Light Mode</span>
            </button>
            <button
              type="button"
              onClick={() => setThemeMode('dark')}
              className={cn(
                'flex items-center justify-center gap-1.5 py-1.5 rounded-xl transition-all',
                theme === 'dark'
                  ? 'bg-card text-foreground shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
              <span>Dark Mode</span>
            </button>
          </div>

          {/* Color Palettes Section */}
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1">
            Accent Palettes ({ACCENT_OPTIONS.length})
          </div>

          <div className="max-h-64 overflow-y-auto space-y-1 pr-0.5 scrollbar-thin">
            {ACCENT_OPTIONS.map((opt) => {
              const isSelected = accent === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setAccent(opt.id as AccentTheme);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs transition-all',
                    isSelected
                      ? 'bg-primary/10 text-primary font-bold border border-primary/25 shadow-xs'
                      : 'hover:bg-muted text-foreground border border-transparent'
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Dual Color Swatch Dot */}
                    <span className="relative flex h-4 w-4 rounded-full overflow-hidden border border-border shrink-0 shadow-xs">
                      <span className="w-1/2 h-full" style={{ backgroundColor: opt.primaryColor }} />
                      <span className="w-1/2 h-full" style={{ backgroundColor: opt.secondaryColor }} />
                    </span>

                    <div className="truncate">
                      <div className="font-semibold truncate leading-tight">{opt.name}</div>
                      <div className="text-xs text-muted-foreground font-mono truncate">{opt.tagline}</div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-primary shrink-0 ml-2" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-border/60 text-xs text-muted-foreground text-center font-mono">
            Mode: <span className="font-bold capitalize text-foreground">{theme}</span> • Saved to local preferences
          </div>
        </div>
      )}
    </div>
  );
}
