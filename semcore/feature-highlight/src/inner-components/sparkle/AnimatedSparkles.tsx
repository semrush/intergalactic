import React from 'react';

import Sparkle from './Sparkle';

export type AnimatedSparklesProps = {
  count?: number;
  curve?: number;
  top?: string;
  left?: string;
};

export function AnimatedSparkles(props: AnimatedSparklesProps & { show: boolean }) {
  const { count, curve, show, top, left } = props;

  return show && count !== undefined && [...new Array(count)].map((_, index) => {
    return (
      <Sparkle key={index} index={index} num={count} curve={curve} top={top} left={left} />
    );
  });
}
