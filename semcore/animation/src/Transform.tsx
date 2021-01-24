import React from 'react';
import { createBaseComponent, styled } from '@semcore/core';
import Animation, { IAnimationProps } from './Animation';

export interface ITransformProps extends IAnimationProps {
  /** Эффекты анимации
   * @default []
   */
  transform?: [string, string];
}

function Transform(props, ref) {
  const { transform = [], ...other } = props;

  const transformStartVar = transform[0];
  const transformEndVar = transform[1];

  return styled()`
    @keyframes enter {
      from {
        transform: ${transformStartVar};
      }
      to {
        transform: ${transformEndVar};
      }
    }
    @keyframes exit {
      from {
        transform: ${transformEndVar};
      }
      to {
        transform: ${transformStartVar};
      }
    }
  `(<Animation ref={ref} {...other} keyframes={[styled.styles.enter, styled.styles.exit]} />);
}

Transform.displayName = 'Transform';

export default createBaseComponent<ITransformProps>(Transform);
