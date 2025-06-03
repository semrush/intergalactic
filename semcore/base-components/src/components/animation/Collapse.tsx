// @ts-nocheck
import React from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import Animation from './Animation';
import style from './style/keyframes.shadow.css';
import { useForkRef } from '@semcore/core/lib/utils/ref';
import useEnhancedEffect from '@semcore/core/lib/utils/use/useEnhancedEffect';

function Collapse(
  { onAnimationStart, onAnimationEnd, overflowHidden = true, defaultHeight = 'auto', ...props },
  ref,
) {
  const SCollapse = Animation;
  const overflowRef = React.useRef('initial');
  const innerRef = React.useRef(null);
  const forkedRef = useForkRef(innerRef, ref);

  useEnhancedEffect(() => {
    if (!innerRef.current) return;
    if (props.visible) innerRef.current.style.height = `${0}px`;
    if (!props.visible) innerRef.current.style.height = `${innerRef.current.scrollHeight}px`;
    if (props.visible) innerRef.current.style.animationFillMode = 'none';
    if (!props.visible) innerRef.current.style.animationFillMode = 'both';
  }, [props.visible]);

  useEnhancedEffect(() => {
    if (!innerRef.current) return;
    if (props.visible) innerRef.current.style.height = defaultHeight;
    if (!props.visible) innerRef.current.style.height = `${0}px`;
  }, []);

  const handleAnimationStart = React.useCallback(
    (event) => {
      if (event.currentTarget !== event.target) return;
      if (onAnimationStart) onAnimationStart(event);
      if (overflowHidden) {
        overflowRef.current = window.getComputedStyle(event.currentTarget).overflow;
        event.currentTarget.style.overflow = 'clip';
      }

      if (props.visible) event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
      if (!props.visible) event.currentTarget.style.height = `${0}px`;
    },
    [props.visible],
  );

  const visibleRef = React.useRef(props.visible);
  visibleRef.current = props.visible;
  const handleAnimationEnd = React.useCallback((event) => {
    if (event.currentTarget !== event.target) return;
    if (onAnimationEnd) onAnimationEnd(event);
    const element = event.currentTarget;

    setTimeout(() => {
      if (!element) return;
      if (visibleRef.current) element.style.height = defaultHeight;
      if (!visibleRef.current) element.style.height = `${0}px`;
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
