import { cn } from '../utils/cn';

export interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
  lazy?: boolean;
  variant?: 'auto' | 'white' | 'dark' | 'light';
}

/**
 * Theme-aware logo. By default (`variant="auto"`), both light and dark variants are
 * rendered and CSS (`dark:`) toggles visibility so the correct asset displays on
 * first paint without a hydration mismatch.
 *
 * Pass `variant="white"` or `variant="dark"` when mounted over a forced dark hero
 * canvas to guarantee maximum contrast regardless of system or theme mode.
 */
export default function Logo({
  className,
  width = 140,
  height = 48,
  alt = 'AIScripto',
  lazy = false,
  variant = 'auto',
}: LogoProps) {
  const shared = {
    width,
    height,
    loading: lazy ? ('lazy' as const) : undefined,
    decoding: 'async' as const,
  };

  if (variant === 'white' || variant === 'dark') {
    return <img src="/images/footer-logo.png" alt={alt} className={className} {...shared} />;
  }

  if (variant === 'light') {
    return <img src="/images/logo.png" alt={alt} className={className} {...shared} />;
  }

  return (
    <>
      <img src="/images/logo.png" alt={alt} className={cn(className, 'dark:hidden')} {...shared} />
      <img src="/images/footer-logo.png" alt={alt} className={cn(className, 'hidden dark:block')} {...shared} />
    </>
  );
}
