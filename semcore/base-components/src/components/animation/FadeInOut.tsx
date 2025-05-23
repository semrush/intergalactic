import React from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import Animation from './Animation';
import style from './style/keyframes.shadow.css';

function FadeInOut(props: any, ref: React.Ref<HTMLElement>) {
  return sstyled(style)(
    <Animation
      ref={ref}
      {...props}
      keyframes={[style['@fade-in-out-enter'], style['@fade-in-out-exit']]}
    />,
  );
}

FadeInOut.displayName = 'FadeInOut';

export default createBaseComponent(FadeInOut);
