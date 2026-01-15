import canUseDOM from '@semcore/core/lib/utils/canUseDOM';
import useEnhancedEffect from '@semcore/core/lib/utils/use/useEnhancedEffect';
import React, { type RefObject } from 'react';

export const useResizeObserver = (
  ref: RefObject<HTMLElement>,
  hookOverride?: { width: number },
) => {
  const [width, setWidth] = React.useState<number>(0);

  const handleResize = React.useCallback((entries: ResizeObserverEntry[]) => {
    setWidth(entries[0].contentRect.width);
  }, []);

  useEnhancedEffect(() => {
    if (!ref.current) {
      return;
    }

    if (hookOverride) {
      return;
    }
    if (canUseDOM()) {
      const ro = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        handleResize(entries);
      });

      ro.observe(ref.current);

      return () => {
        ro.disconnect();
      };
    }
  }, [hookOverride, ref]);

  if (hookOverride) {
    return hookOverride;
  }
  return { width };
};
