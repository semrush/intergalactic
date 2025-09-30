import { useEffect, useRef } from 'react';

function findScrollableParentFor(element: HTMLElement): HTMLElement | null {
  if (element.parentElement === null) {
    return null;
  }

  const styles = window.getComputedStyle(element);
  const hasScroll = (element.offsetWidth - element.clientWidth) > 0 || (element.offsetHeight - element.clientHeight) > 0;

  const isOverflowed = styles.overflow !== 'visible' && styles.overflow !== 'hidden';

  if (isOverflowed && hasScroll) {
    return element;
  }

  return findScrollableParentFor(element.parentElement);
}

export function useScrollBarWidth(ref: React.RefObject<HTMLElement>, callback: (width: number) => void, vertical = true) {
  const af = useRef<number | null>(null);

  useEffect(() => {
    const calculateScrollBar = () => {
      if (!window.visualViewport) return;

      let width = vertical ? window.innerWidth - window.visualViewport.width : window.innerHeight - window.visualViewport.height;

      if (!width) {
        if (!ref.current) return;

        const scrollableParenElement = findScrollableParentFor(ref.current);

        if (!scrollableParenElement) return;

        width = vertical ? scrollableParenElement.offsetWidth - scrollableParenElement.clientWidth : scrollableParenElement.offsetHeight - scrollableParenElement.clientHeight;
      }

      callback(width);
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
  }, [ref.current]);
}
