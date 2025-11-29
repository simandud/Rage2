import { useState, useEffect } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * Custom hook to track scroll position
 */
export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY
      });
    };

    // Set initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}

/**
 * Hook to check if user has scrolled past a certain point
 */
export function useScrolledPast(threshold: number = 100): boolean {
  const { y } = useScrollPosition();
  return y > threshold;
}
