import React from 'react';
import { useCssVariable } from '@semcore/core/lib/utils/useCssVariable';
import useEnhancedEffect from '@semcore/core/lib/utils/use/useEnhancedEffect';
import { Intergalactic } from '@semcore/core';
import { AnimatedNumberBaseProps } from './index';

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const defaultFormatValue = (value: number) => value.toFixed(2);

export const AnimatedNumber = ((props) => {
  const ref = React.useRef<HTMLElement>(null);
  const defaultDurationStr = useCssVariable('--intergalactic-duration-counter', '200', ref);
  const defaultDuration = React.useMemo(
    () => parseInt(defaultDurationStr, 10),
    [defaultDurationStr],
  );
  const {
    easing = easeInOutSine,
    formatValue = defaultFormatValue,
    duration = defaultDuration,
    delay = 0,
    initValue = 0,
    value,
    ...restProps
  } = props;
  const Tag: any = props.tag ?? 'div';
  const animationRef = React.useRef({
    animationStart: -1,
    animationFrame: -1,
    fromValue: initValue,
    toValue: value,
  });
  const handleNextAnimationFrame = React.useCallback(() => {
    if (!ref.current) return;
    if (Date.now() - animationRef.current.animationStart > delay) {
      const valueBase = animationRef.current.fromValue;
      const valueDiff = animationRef.current.toValue - animationRef.current.fromValue;
      const diffFraction = easing(
        (Date.now() - animationRef.current.animationStart - delay) / duration,
      );
      const value = valueBase + valueDiff * diffFraction;
      ref.current.innerText = formatValue(value);
    }
    if (Date.now() - animationRef.current.animationStart - delay >= duration) {
      ref.current.innerText = formatValue(animationRef.current.toValue);
      animationRef.current.fromValue = animationRef.current.toValue;
      return;
    }
    animationRef.current.animationFrame = requestAnimationFrame(handleNextAnimationFrame);
  }, [easing, formatValue, duration, delay]);
  useEnhancedEffect(() => {
    ref.current!.innerText = formatValue(animationRef.current.fromValue);
    animationRef.current.toValue = value;
    animationRef.current.animationStart = Date.now();
    handleNextAnimationFrame();
    return () => cancelAnimationFrame(animationRef.current.animationFrame);
  }, [handleNextAnimationFrame, value]);

  return (
    <Tag ref={ref} {...restProps}>
      {formatValue(value)}
    </Tag>
  );
}) as Intergalactic.Component<'div', AnimatedNumberBaseProps>;
