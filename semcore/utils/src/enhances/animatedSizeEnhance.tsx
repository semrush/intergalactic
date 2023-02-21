/* eslint-disable */
import React, { useEffect } from 'react';
import { useForkRef } from '../ref';

export interface IWithAnimatedSizeEnhanceProps {
  animationsDisabled?: boolean;
}

let uniqueId = 0;

function animatedSizeEnhance({
  animateProps = [],
  onChangeOf = [],
}: {
  animateProps: ('wdith' | 'height')[];
  onChangeOf: string[];
}) {
  return (props) => {
    const { ref, __animatedEnhanceInstanceId, duration, ...other } = props;
    const nodeRef = React.createRef<HTMLElement>();
    const lastSizesRef = React.useRef<number[]>([]);
    const prevPropsRef = React.useRef(props);
    const animatedSizeInstanceIdRef = React.useRef(uniqueId++);

    prevPropsRef.current = props;

    React.useLayoutEffect(() => {
      if (props.animationsDisabled) return;
      if (
        __animatedEnhanceInstanceId !== undefined &&
        __animatedEnhanceInstanceId !== animatedSizeInstanceIdRef.current
      )
        return;
      if (!nodeRef.current) {
        return;
      }
      if (lastSizesRef.current.every((value) => value === undefined)) {
        for (let i = 0; i < animateProps.length; i++) {
          lastSizesRef.current[i] = nodeRef.current.getBoundingClientRect()[animateProps[i]];
        }
        return;
      }

      const sizes: number[] = [];
      for (let i = 0; i < animateProps.length; i++) {
        sizes[i] = nodeRef.current.getBoundingClientRect()[animateProps[i]];
        if (Math.abs(lastSizesRef.current[i] - sizes[i]) < 3) {
          lastSizesRef.current[i] = sizes[i];
          sizes[i] = undefined;
        }
      }
      if (sizes.every((value) => value === undefined)) return;

      nodeRef.current.style.transition = 'none';
      for (let i = 0; i < animateProps.length; i++) {
        nodeRef.current.style[animateProps[i]] = lastSizesRef.current[i] + 'px';
      }
      let timeout = -1;
      const handleTransitionEnd = () => {
        clearTimeout(timeout);
        if (!nodeRef.current) return;
        nodeRef.current.style.transition = null;
        for (let i = 0; i < animateProps.length; i++) {
          nodeRef.current.style[animateProps[i]] = null;
        }
        nodeRef.current.removeEventListener('transitionend', handleTransitionEnd);
        nodeRef.current.removeEventListener('transitioncancel', handleTransitionEnd);
      };
      const animationFrame = requestAnimationFrame(() => {
        if (!nodeRef.current) return;
        nodeRef.current.addEventListener('transitionend', handleTransitionEnd);
        nodeRef.current.addEventListener('transitioncancel', handleTransitionEnd);
        nodeRef.current.style.transition = `${duration}ms all ease-in-out`;
        for (let i = 0; i < animateProps.length; i++) {
          lastSizesRef.current[i] = sizes[i];
          nodeRef.current.style[animateProps[i]] = sizes[i] + 'px';
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
