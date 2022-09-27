import { RefObject, useState } from 'react';
import useEnhancedEffect from '@semcore/utils/src/use/useEnhancedEffect';

export const useResizeObserver = (ref: RefObject<HTMLElement>, custom) => {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const collectObs = [];

  const handleResize = (entries: ResizeObserverEntry[]) => {
    setSize({ width: entries[0].contentRect.width, height: entries[0].contentRect.height });
  };

  const subscribe = (cur) => {
    collectObs.push(cur);
    return collectObs;
  };

  useEnhancedEffect(() => {
    if (!ref.current) {
      return;
    }

    if (custom) {
      return;
    }

    const ro = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      handleResize(entries);
    });

    ro.observe(ref.current);

    return () => {
      ro.disconnect();
    };
  }, [ref]);

  return { size, subscribe };
};
