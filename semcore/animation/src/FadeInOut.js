import React from 'react';
import { createBaseComponent, sstyled } from '@semcore/core';
import Animation from './Animation';

const style = sstyled.css`
  @keyframes enter {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes exit {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

function FadeInOut(props, ref) {
  return sstyled(style)(
    <Animation ref={ref} {...props} keyframes={[style['@enter'], style['@exit']]} />,
  );
}

FadeInOut.displayName = 'FadeInOut';

export default createBaseComponent(FadeInOut);
