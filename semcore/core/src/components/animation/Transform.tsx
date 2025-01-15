import React from 'react';
import { createBaseComponent } from '../../coreFactory';
import { sstyled } from '../../styled';
import Animation from './Animation';
import style from './style/keyframes.shadow.css';

function Transform(props: any, ref: React.Ref<HTMLElement>) {
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

export default createBaseComponent(Transform);
