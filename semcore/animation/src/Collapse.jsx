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

  const handlerAnimationStart = useCallback(
    (e) => {
      if (e.currentTarget !== e.target) return;
      if (onAnimationStart) onAnimationStart(e);
      if (overflowHidden) {
        overflowRef.current = window.getComputedStyle(e.currentTarget).overflow;
        e.currentTarget.style.overflow = 'hidden';
      }

      const el = e.currentTarget;

      if (props.visible) el.style.height = 0 + 'px';
      else el.style.height = el.scrollHeight + 'px';
      setTimeout(() => {
        if (props.visible) el.style.height = el.scrollHeight + 'px';
        else el.style.height = 0 + 'px';
      }, 0);
    },
    [props.visible],
  );

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

    const el = e.currentTarget;
    setTimeout(() => {
      el.style.height = 'auto';
    }, 0);
  }, []);

  return sstyled(style)(
    <SCollapse
      ref={forkedRef}
      {...props}
      onAnimationStart={handlerAnimationStart}
      onAnimationEnd={handlerAnimationEnd}
      keyframes={[style['@collapse-enter'], style['@collapse-exit']]}
    />,
  );
}

Collapse.displayName = 'Collapse';

export default createBaseComponent(Collapse);
