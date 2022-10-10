import { RefObject, useCallback, useState } from 'react';
import useEnhancedEffect from '@semcore/utils/lib/use/useEnhancedEffect';

export const useResizeObserver = (
  ref: RefObject<HTMLElement>,
  hookOverride?: { width: number },
) => {
  const [width, setWidth] = useState<number>(0);

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    setWidth(entries[0].contentRect.width);
  }, []);

  useEnhancedEffect(() => {
    if (!ref.current) {
      return;
    }

    if (hookOverride) {
      return;
    }

    const ro = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      handleResize(entries);
    });

    ro.observe(ref.current);

    return () => {
      ro.disconnect();
    };
  }, [hookOverride]);

  if (hookOverride) {
    return hookOverride;
  }
  return { width };
};
