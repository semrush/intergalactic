import { useEffect, useState, useRef } from 'react';

export function useScrollBarWidth(vertical = true): number {
  const [scrollBarWidth, setScrollBarWidth] = useState(0);
  const af = useRef<number | null>(null);

  useEffect(() => {
    const calculateScrollBar = () => {
      if (!window.visualViewport) return;

      if (!vertical) {
        setScrollBarWidth(window.innerHeight - window.visualViewport.height);
        return;
      }

      setScrollBarWidth(window.innerWidth - window.visualViewport.width);
    };

    const handleResize = () => {
      // to handle resize 1 time per frame
      if (af.current !== null) return;

      af.current = requestAnimationFrame(() => {
        calculateScrollBar();
        af.current = null;
      });
    };

    calculateScrollBar();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (af.current !== null) cancelAnimationFrame(af.current);
    };
  }, []);

  return scrollBarWidth;
}
