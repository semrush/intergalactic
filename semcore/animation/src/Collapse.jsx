import React, { useCallback, useEffect, useRef } from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import Animation from './Animation';
import style from './style/keyframes.shadow.css';
import { useForkRef } from '@semcore/utils/lib/ref';
import useEnhancedEffect from '@semcore/utils/lib/use/useEnhancedEffect';

function Collapse({ onAnimationStart, onAnimationEnd, overflowHidden = true, ...props }, ref) {
  const SCollapse = Animation;
  const overflowRef = useRef('initial');
  const innerRef = useRef(null);
  const forkedRef = useForkRef(innerRef, ref);

  useEffect(() => {
    if (!innerRef.current) return;
    if (props.visible) innerRef.current.style.height = 'auto';
    if (!props.visible) innerRef.current.style.height = 0 + 'px';
  }, []);
  useEnhancedEffect(() => {
    if (!innerRef.current) return;
    if (props.visible) innerRef.current.style.height = 0 + 'px';
    if (!props.visible) innerRef.current.style.height = innerRef.current.scrollHeight + 'px';
  }, [props.visible]);

  const handleAnimationStart = useCallback(
    (event) => {
      if (event.currentTarget !== event.target) return;
      if (onAnimationStart) onAnimationStart(event);
      if (overflowHidden) {
        overflowRef.current = window.getComputedStyle(event.currentTarget).overflow;
        event.currentTarget.style.overflow = 'hidden';
      }

      if (props.visible) event.currentTarget.style.height = event.currentTarget.scrollHeight + 'px';
      if (!props.visible) event.currentTarget.style.height = 0 + 'px';
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
