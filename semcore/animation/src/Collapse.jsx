import React, { useCallback, useState, useRef } from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import Animation from './Animation';

const style = sstyled.css`
  @keyframes enter {
    from {
      overflow: hidden;
      height: 0;
    }
    to {
      height: var(--height);
    }
  }

  @keyframes exit {
    from {
      height: var(--height);
    }
    to {
      height: 0;
    }
  }
`;

function Collapse({ onAnimationStart, onAnimationEnd, overflowHidden = true, ...props }, ref) {
  const SCollapse = Animation;
  const [height, setHeightVar] = useState('auto');
  const overflowRef = useRef('initial');

  const handlerAnimationStart = useCallback((e) => {
    if (e.currentTarget !== e.target) return;
    if (onAnimationStart) onAnimationStart(e);
    if (overflowHidden) {
      overflowRef.current = window.getComputedStyle(e.currentTarget).overflow;
      e.currentTarget.style.overflow = 'hidden';
    }
    setHeightVar(e.currentTarget.scrollHeight + 'px');
  }, []);

  const handlerAnimationEnd = useCallback((e) => {
    if (e.currentTarget !== e.target) return;
    if (onAnimationEnd) onAnimationEnd(e);
    if (overflowHidden) {
      e.currentTarget.style.overflow = overflowRef.current;
    }
    setHeightVar('auto');
  }, []);

  return sstyled(style)(
    <SCollapse
      ref={ref}
      {...props}
      onAnimationStart={handlerAnimationStart}
      onAnimationEnd={handlerAnimationEnd}
      height={height}
      keyframes={[style['@enter'], style['@exit']]}
    />,
  );
}

Collapse.displayName = 'Collapse';

export default createBaseComponent(Collapse);
