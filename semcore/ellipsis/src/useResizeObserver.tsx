import { RefObject, useLayoutEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export const useResizeObserver = (ref: RefObject<HTMLElement>) => {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const handleResize = (entries: ResizeObserverEntry[]) => {
    if (!Array.isArray(entries)) {
      return;
    }

    setWidth(entries[0].contentRect.width);
    setHeight(entries[0].contentRect.height);
  };

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const ro = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      handleResize(entries);
    });

    document.querySelectorAll('.observable').forEach((el) => {
      ro.observe(el);
    });

    return () => {
      ro.disconnect();
    };
  }, [ref]);

  return { width, height };
};
