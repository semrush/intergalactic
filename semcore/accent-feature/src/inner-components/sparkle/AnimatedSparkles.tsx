import React from 'react';

import Sparkle from './Sparkle';

export type AnimatedSparklesProps = {
  count: number;
  curve?: number;
};

export function AnimatedSparkles(props: AnimatedSparklesProps & { show: boolean }) {
  return props.show && [...new Array(props.count)].map((_, index) => {
    return (
      <Sparkle key={index} index={index} num={props.count} curve={props.curve} />
    );
  });
}
