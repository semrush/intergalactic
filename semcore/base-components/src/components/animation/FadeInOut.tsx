import { sstyled, createBaseComponent, type Intergalactic } from '@semcore/core';
import React from 'react';

import Animation from './Animation';
import type { FadeInOutProps } from './Animation.types';
import style from './style/keyframes.shadow.css';

function FadeInOut(props: FadeInOutProps, ref: React.Ref<HTMLDivElement>) {
  return sstyled(style)(
    <Animation
      ref={ref}
      {...props}
      keyframes={[style['@fade-in-out-enter'], style['@fade-in-out-exit']]}
    />,
  );
}

FadeInOut.displayName = 'FadeInOut';

type FadeInOutComponent = Intergalactic.Component<'div', FadeInOutProps>;

export default createBaseComponent<FadeInOutComponent>(FadeInOut);
