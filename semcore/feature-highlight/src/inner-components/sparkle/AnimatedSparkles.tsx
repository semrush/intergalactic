import React from 'react';

import type { NSAnimatedSparklesFH } from './AnimatedSparkles.type';
import Sparkle from './Sparkle';

export function AnimatedSparkles(props: NSAnimatedSparklesFH.Props & { show: boolean }) {
  const { count, curve, show, top, left } = props;

  return show && count !== undefined && [...new Array(count)].map((_, index) => {
    return (
      <Sparkle key={index} index={index} num={count} curve={curve} top={top} left={left} />
    );
  });
}
