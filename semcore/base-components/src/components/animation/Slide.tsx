import type { Intergalactic } from '@semcore/core';
import { createBaseComponent, sstyled } from '@semcore/core';
import React from 'react';

import Animation from './Animation';
import type { NSAnimation } from './Animation.types';
import style from './style/keyframes.shadow.css';

function Slide(props: Intergalactic.InternalTypings.InferComponentProps<NSAnimation.Slide.Component>, ref: React.Ref<HTMLDivElement>) {
  return sstyled(style)(
    <Animation
      // `ref` is overriden by spread props.
      // @ts-expect-error
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

export default createBaseComponent<NSAnimation.Slide.Component>(Slide);
