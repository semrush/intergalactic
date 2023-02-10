import React from 'react';

type ReactFCProps<C extends React.FC> = C extends React.FC<infer Props> ? Props : {};
type ReactComponentProps<C extends React.ComponentClass> = C extends React.ComponentClass<infer Props>
  ? Props
  : never;

const easeInOutSine = (t: number) =>
  -(Math.cos(Math.PI * t) - 1) / 2;
const defaultFormatValue = (value: number) => value.toFixed(2);

export const AnimatedNumber = <Tag extends ((keyof JSX.IntrinsicElements) | React.ComponentClass | React.FC)>(props: {
  easing?: (t: number) => number;
  formatValue?: (value: number) => string;
  duration?: number;
  delay?: number;
  initValue?: number;
  value: number;
  tag?: Tag;
} & (Tag extends React.FC ? ReactFCProps<Tag> : Tag extends React.ComponentClass ? ReactComponentProps<Tag> : Tag extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[Tag] : {})
): React.ReactNode => {
  const ref = React.useRef(null);
  const Tag: any = props.tag ?? 'div';
  const formatValue = props.formatValue ?? defaultFormatValue;
  const easing = props.easing ?? easeInOutSine;
  const duration = props.duration ?? 300;
  const delay = props.delay ?? 0;
  const animationRef = React.useRef({ animationStart: -1, animationFrame: -1, fromValue: props.initValue ?? 0, toValue: props.value });
  const handleNextAnimationFrame = React.useCallback(() => {
    if (!ref.current) return;
    if (Date.now() - animationRef.current.animationStart > delay) {
      const valueBase = animationRef.current.fromValue;
      const valueDiff = (animationRef.current.toValue - animationRef.current.fromValue);
      const diffFraction = easing((Date.now() - animationRef.current.animationStart - delay) / (duration))
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
  React.useLayoutEffect(() => {
    ref.current.innerText = formatValue(animationRef.current.fromValue);
    animationRef.current.toValue = props.value;
    animationRef.current.animationStart = Date.now();
    handleNextAnimationFrame();
    return () => cancelAnimationFrame(animationRef.current.animationFrame)
  }, [handleNextAnimationFrame, props.value]);


  return <Tag ref={ref}>{formatValue(props.value)}</Tag>
};