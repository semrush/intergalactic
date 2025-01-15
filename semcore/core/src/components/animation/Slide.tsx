import React from 'react';
import { createBaseComponent } from '../../coreFactory';
import { sstyled } from '../../styled';
import Animation from './Animation';
import style from './style/keyframes.shadow.css';

function Slide(props: any, ref: React.Ref<HTMLElement>) {
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

export default createBaseComponent(Slide);
