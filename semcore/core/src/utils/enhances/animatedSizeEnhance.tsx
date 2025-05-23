import React from 'react';
import { useForkRef } from '../ref';
import useEnhancedEffect from '../use/useEnhancedEffect';
import { UnknownProperties } from '../../core-types/UnknownProperties';

/** @deprecated */
export interface IWithAnimatedSizeEnhanceProps
  extends WithAnimatedSizeEnhanceProps,
    UnknownProperties {}
export type WithAnimatedSizeEnhanceProps = {
  animationsDisabled?: boolean;
};

let uniqueId = 0;

function animatedSizeEnhance({
  animateProps = [],
  onChangeOf = [],
}: {
  animateProps: ('width' | 'height')[];
  onChangeOf: string[];
}) {
  return (props: any) => {
    const { ref, __animatedEnhanceInstanceId, duration, ...other } = props;
    const nodeRef = React.createRef<HTMLElement>();
    const lastSizesRef = React.useRef<(number | undefined)[]>([]);
    const prevPropsRef = React.useRef(props);
    const animatedSizeInstanceIdRef = React.useRef(uniqueId++);

    prevPropsRef.current = props;

    useEnhancedEffect(() => {
      if (props.animationsDisabled) return;
      if (
        __animatedEnhanceInstanceId !== undefined &&
        __animatedEnhanceInstanceId !== animatedSizeInstanceIdRef.current
      )
        return;
      if (!nodeRef.current) {
        return;
      }
      const node = nodeRef.current;
      if (lastSizesRef.current.every((value) => value === undefined)) {
        for (let i = 0; i < animateProps.length; i++) {
          lastSizesRef.current[i] = node.getBoundingClientRect()[animateProps[i]];
        }
        return;
      }

      const sizes: (number | undefined)[] = [];
      for (let i = 0; i < animateProps.length; i++) {
        sizes[i] = node.getBoundingClientRect()[animateProps[i]];
        if (
          Math.abs(lastSizesRef.current[i]! - sizes[i]!) < 3 ||
          node.style.getPropertyValue(animateProps[i]).endsWith('%')
        ) {
          lastSizesRef.current[i] = sizes[i];
          sizes[i] = undefined;
        }
      }
      if (sizes.every((value) => value === undefined)) return;

      node.style.transition = 'none';
      for (let i = 0; i < animateProps.length; i++) {
        node.style[animateProps[i]] = `${lastSizesRef.current[i]}px`;
      }
      let timeout = -1;
      const handleTransitionEnd = () => {
        clearTimeout(timeout);
        if (!node) return;
        node.style.transition = null as any;
        for (let i = 0; i < animateProps.length; i++) {
          node.style[animateProps[i]] = null as any;
        }
        node.removeEventListener('transitionend', handleTransitionEnd);
        node.removeEventListener('transitioncancel', handleTransitionEnd);
      };
      const animationFrame = requestAnimationFrame(() => {
        if (!node) return;
        node.addEventListener('transitionend', handleTransitionEnd);
        node.addEventListener('transitioncancel', handleTransitionEnd);
        node.style.transition = `${duration}ms all ease-in-out`;
        for (let i = 0; i < animateProps.length; i++) {
          lastSizesRef.current[i] = sizes[i];
          node.style[animateProps[i]] = `${sizes[i]}px`;
        }
      });
      timeout = setTimeout(handleTransitionEnd, 500) as any;
      return () => {
        cancelAnimationFrame(animationFrame);
        handleTransitionEnd();
      };
    }, [
      __animatedEnhanceInstanceId,
      props.animationsDisabled,
      duration,
      ...onChangeOf.map((propName) => props[propName]),
    ]);

    return {
      ref: useForkRef(ref, nodeRef),
      __animatedEnhanceInstanceId: __animatedEnhanceInstanceId ?? animatedSizeInstanceIdRef.current,
      ...other,
    };
  };
}

export default animatedSizeEnhance;
