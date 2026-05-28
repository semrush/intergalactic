import type { Intergalactic } from '@semcore/core';
import { createBaseComponent, sstyled } from '@semcore/core';
import React from 'react';

import Animation from './Animation';
import type { TransformProps } from './Animation.types';
import style from './style/keyframes.shadow.css';

function Transform(props: TransformProps, ref: React.Ref<HTMLDivElement>) {
  const { transform = [], ...other } = props;

  return sstyled(style)(
    <Animation
      ref={ref}
      {...other}
      transformStart={transform[0]}
      transformEnd={transform[1]}
      keyframes={[style['@transform-enter'], style['@transform-exit']]}
    />,
  );
}

Transform.displayName = 'Transform';

type TransformComponent = Intergalactic.Component<'div', TransformProps>;
export default createBaseComponent<TransformComponent>(Transform);
