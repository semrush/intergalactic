import type { Intergalactic } from '@semcore/core';
import { createBaseComponent, sstyled } from '@semcore/core';
import React from 'react';

import Animation from './Animation';
import type { NSAnimation } from './Animation.types';
import style from './style/keyframes.shadow.css';

function Transform(props: Intergalactic.InternalTypings.InferComponentProps<NSAnimation.Transform.Component>, ref: React.Ref<HTMLDivElement>) {
  const { transform = [], ...other } = props;

  return sstyled(style)(
    <Animation
      // `ref` is overriden by spread props.
      // @ts-expect-error
      ref={ref}
      {...other}
      transformStart={transform[0]}
      transformEnd={transform[1]}
      keyframes={[style['@transform-enter'], style['@transform-exit']]}
    />,
  );
}

Transform.displayName = 'Transform';

export default createBaseComponent<NSAnimation.Transform.Component>(Transform);
