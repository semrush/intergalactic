import React, { useCallback, useEffect, useRef } from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import Animation from './Animation';
import style from './style/keyframes.shadow.css';
import { useForkRef } from '@semcore/utils/lib/ref';

function Collapse({ onAnimationStart, onAnimationEnd, overflowHidden = true, ...props }, ref) {
  const SCollapse = Animation;
  const overflowRef = useRef('initial');
  const innerRef = useRef(null);
  const forkedRef = useForkRef(innerRef, ref);

  useEffect(() => {
    if (!innerRef.current) return;
    innerRef.current.style.height = 'auto';
  }, []);

  const handleAnimationStart = useCallback(
    (event) => {
      if (event.currentTarget !== event.target) return;
      if (onAnimationStart) onAnimationStart(event);
      if (overflowHidden) {
        overflowRef.current = window.getComputedStyle(event.currentTarget).overflow;
        event.currentTarget.style.overflow = 'hidden';
      }

      const element = event.currentTarget;

      if (props.visible) element.style.height = 0 + 'px';
      else element.style.height = element.scrollHeight + 'px';
      setTimeout(() => {
        if (props.visible) element.style.height = element.scrollHeight + 'px';
        else element.style.height = 0 + 'px';
      }, 0);
    },
    [props.visible],
  );

  const handleAnimationEnd = useCallback((event) => {
    if (event.currentTarget !== event.target) return;
    if (onAnimationEnd) onAnimationEnd(event);
    const element = event.currentTarget;

    setTimeout(() => {
      if (!element) return;
      element.style.height = 'auto';
      if (overflowHidden) {
        element.style.overflow = overflowRef.current;
      }
    }, 0);
  }, []);

  return sstyled(style)(
    <SCollapse
      ref={forkedRef}
      {...props}
      onAnimationStart={handleAnimationStart}
      onAnimationEnd={handleAnimationEnd}
      keyframes={[style['@collapse-enter'], style['@collapse-exit']]}
      transition-based
    />,
  );
}

Collapse.displayName = 'Collapse';

export default createBaseComponent(Collapse);
