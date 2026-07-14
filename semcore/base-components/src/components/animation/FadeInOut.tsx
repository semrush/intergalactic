import { sstyled, createBaseComponent, type Intergalactic } from '@semcore/core';
import React from 'react';

import Animation from './Animation';
import type { NSAnimation } from './Animation.types';
import style from './style/keyframes.shadow.css';

function FadeInOut(props: Intergalactic.InternalTypings.InferComponentProps<NSAnimation.FadeInOut.Component>, ref: React.Ref<HTMLDivElement>) {
  return sstyled(style)(
    <Animation
      // `ref` is overriden by spread props.
      // @ts-expect-error
      ref={ref}
      {...props}
      keyframes={[style['@fade-in-out-enter'], style['@fade-in-out-exit']]}
    />,
  );
}

FadeInOut.displayName = 'FadeInOut';

export default createBaseComponent<NSAnimation.FadeInOut.Component>(FadeInOut);
