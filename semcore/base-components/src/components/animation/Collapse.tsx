import { sstyled, createBaseComponent, type Intergalactic } from '@semcore/core';
import { useForkRef } from '@semcore/core/lib/utils/ref';
import useEnhancedEffect from '@semcore/core/lib/utils/use/useEnhancedEffect';
import React from 'react';

import Animation from './Animation';
import type { NSAnimation } from './Animation.types';
import style from './style/keyframes.shadow.css';

function Collapse(
  props: Intergalactic.InternalTypings.InferComponentProps<NSAnimation.Collapse.Component>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { onAnimationStart, onAnimationEnd, overflowHidden = true, defaultHeight = 'auto', ...restProps } = props;
  const SCollapse = Animation;
  const overflowRef = React.useRef('initial');
  const innerRef = React.useRef<HTMLDivElement>(null);
  const forkedRef = useForkRef(innerRef, ref);

  useEnhancedEffect(() => {
    if (!innerRef.current) return;
    if (restProps.visible) innerRef.current.style.height = `${0}px`;
    if (!restProps.visible) innerRef.current.style.height = `${innerRef.current.scrollHeight}px`;
    if (restProps.visible) innerRef.current.style.animationFillMode = 'none';
    if (!restProps.visible) innerRef.current.style.animationFillMode = 'both';
  }, [restProps.visible]);

  useEnhancedEffect(() => {
    if (!innerRef.current) return;
    if (restProps.visible) innerRef.current.style.height = defaultHeight;
    if (!restProps.visible) innerRef.current.style.height = `${0}px`;
  }, []);

  const handleAnimationStart = React.useCallback(
    (event: React.AnimationEvent<HTMLDivElement>) => {
      if (event.currentTarget !== event.target) return;
      if (onAnimationStart) onAnimationStart(event);
      if (overflowHidden) {
        overflowRef.current = window.getComputedStyle(event.currentTarget).overflow;
        event.currentTarget.style.overflow = 'clip';
      }

      if (restProps.visible) event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
      if (!restProps.visible) event.currentTarget.style.height = `${0}px`;
    },
    [restProps.visible],
  );

  const visibleRef = React.useRef(restProps.visible);
  visibleRef.current = restProps.visible;
  const handleAnimationEnd = React.useCallback((event: React.AnimationEvent<HTMLDivElement>) => {
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
      // `ref` is overriden by spread props.
      // @ts-expect-error
      ref={forkedRef}
      {...restProps}
      onAnimationStart={handleAnimationStart}
      onAnimationEnd={handleAnimationEnd}
      keyframes={[style['@collapse-enter'], style['@collapse-exit']]}
      transition-based
    />,
  );
}

Collapse.displayName = 'Collapse';

export default createBaseComponent<NSAnimation.Collapse.Component>(Collapse);
