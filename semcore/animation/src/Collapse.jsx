import React, { useCallback, useState, useRef } from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import Animation from './Animation';
import style from './style/keyframes.shadow.css';

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
      // The timeout is needed because the overflow is first set, and then the node is removed via setState inside the animation
      setTimeout(() => {
        // The checking is needed because the node is being deleted
        if (e.currentTarget) {
          e.currentTarget.style.overflow = overflowRef.current;
        }
      }, 0);
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
      keyframes={[style['@collapse-enter'], style['@collapse-exit']]}
    />,
  );
}

Collapse.displayName = 'Collapse';

export default createBaseComponent(Collapse);
