import React from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import Animation from './Animation';

const style = sstyled.css`
  @keyframes enter {
    from {
      transform: var(--transformStart);
    }
    to {
      transform: var(--transformEnd);
    }
  }
  @keyframes exit {
    from {
      transform: var(--transformEnd);
    }
    to {
      transform: var(--transformStart);
    }
  }
`;

function Transform(props, ref) {
  const { transform = [], ...other } = props;

  return sstyled(style)(
    <Animation
      ref={ref}
      {...other}
      transformStart={transform[0]}
      transformEnd={transform[1]}
      keyframes={[style['@enter'], style['@exit']]}
    />,
  );
}

Transform.displayName = 'Transform';

export default createBaseComponent(Transform);
