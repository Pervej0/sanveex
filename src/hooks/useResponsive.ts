import { useEffect, useState, useRef } from 'react';

export type Breakpoints = {
  mobile: number;
  tablet: number;
};

export type UseResponsiveResult = {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export function useResponsive(
  breakpoints: Breakpoints = { mobile: 768, tablet: 992 },
  debounceMs = 100
): UseResponsiveResult {
  const [width, setWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : breakpoints.tablet
  );

  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const onResize = () => {
      if (debounceMs <= 0) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => setWidth(window.innerWidth));
        return;
      }

      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        setWidth(window.innerWidth);
        timerRef.current = null;
      }, debounceMs);
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [breakpoints.mobile, breakpoints.tablet, debounceMs]);

  const isMobile = width < breakpoints.mobile;
  const isTablet = width >= breakpoints.mobile && width < breakpoints.tablet;
  const isDesktop = width >= breakpoints.tablet;

  return { width, isMobile, isTablet, isDesktop };
}
