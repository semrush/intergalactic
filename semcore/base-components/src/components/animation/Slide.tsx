import { createBaseComponent, sstyled } from '@semcore/core';
import React from 'react';

import Animation from './Animation';
import type { SlideProps } from './Animation.types';
import style from './style/keyframes.shadow.css';

function Slide(props: SlideProps, ref: React.Ref<HTMLDivElement>) {
  return sstyled(style)(
    <Animation
      ref={ref}
      {...props}
      keyframes={[
        style[`@slide-${props.slideOrigin}-in`],
        style[`@slide-${props.slideOrigin}-out`],
      ]}
    />,
  );
}

Slide.displayName = 'Slide';

export default createBaseComponent<'div', SlideProps>(Slide);
