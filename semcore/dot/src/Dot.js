import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';

import { Box } from '@semcore/flex-box';
import { Animation } from '@semcore/animation';
import logger from '@semcore/utils/lib/logger';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

import style from './style/dot.shadow.css';

const styleDot = sstyled.css`
  @keyframes enter {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes exit {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0);
    }
  }
`;

class Dot extends Component {
  static displayName = 'Dot';
  static style = style;
  static defaultProps = {
    size: 'm',
    duration: 300,
  };

  render() {
    const SDot = Root;
    const SAnimation = Animation;

    let { Children, styles, size, invisible, hidden, duration, up } = this.asProps;
    size = React.Children.toArray(getOriginChildren(Children)).length === 0 ? size : 'xl';
    const visible = typeof invisible === 'undefined' ? !hidden : !invisible;

    logger.warn(
      invisible !== undefined,
      "The 'invisible' property is deprecated, use 'hidden'",
      this.asProps['data-ui-name'] || Dot.displayName,
    );

    return sstyled(styles)(
      <>
        {up ? (
          <SAnimation
            visible={visible}
            duration={duration}
            keyframes={[styleDot['@enter'], styleDot['@exit']]}
          >
            <SDot render={Box} tag="span" use:size={size} />
          </SAnimation>
        ) : (
          <Animation
            visible={visible}
            duration={duration}
            keyframes={[styleDot['@enter'], styleDot['@exit']]}
          >
            <SDot render={Box} tag="span" use:size={size} />
          </Animation>
        )}
      </>,
    );
  }
}

export default createComponent(Dot);
