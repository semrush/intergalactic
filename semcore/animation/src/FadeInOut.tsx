import React from 'react';
import { createBaseComponent, styled } from '@semcore/core';
import Animation, { IAnimationProps } from './Animation';

export interface IFadeInOutProps extends IAnimationProps {}

function FadeInOut(props, ref) {
  return styled()`
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
  `(<Animation ref={ref} {...props} keyframes={[styled.styles.enter, styled.styles.exit]} />);
}

FadeInOut.displayName = 'FadeInOut';

export default createBaseComponent<IFadeInOutProps>(FadeInOut);
