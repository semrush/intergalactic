import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import logger from '@semcore/utils/lib/logger';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

import { Animation } from '@semcore/animation';
import { Box } from '@semcore/flex-box';
import Portal from '@semcore/portal';
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
    keyframes: [styleDot['@enter'], styleDot['@exit']],
  };
  static enhance = [uniqueIDEnhancement()];

  render() {
    const SDot = Root;
    const SA11yAlert = 'div';

    let {
      Children,
      styles,
      size,
      hidden,
      duration,
      keyframes,
      uid,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    } = this.asProps;
    const hasChildren = React.Children.toArray(getOriginChildren(Children)).length !== 0;
    size = hasChildren ? 'xl' : size;

    const hasLabel = Boolean(ariaLabel || ariaLabelledBy);

    logger.warn(
      !hasLabel,
      "'aria-label' or 'aria-labelledby' are required for Dot component",
      this.asProps['data-ui-name'] || Dot.displayName,
    );

    return sstyled(styles)(
      <SDot
        render={Animation}
        tag="span"
        use:size={size}
        visible={!hidden}
        duration={duration}
        keyframes={keyframes}
        id={`igc-${uid}-dot`}
      >
        <Children />
        {!hidden && (
          <Portal>
            <SA11yAlert
              render={Box}
              role={hasLabel && !hidden ? 'alert' : undefined}
              aria-live={hasLabel && !hidden ? 'polite' : undefined}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              aria-flowto={`igc-${uid}-dot`}
            >
              <Children />
            </SA11yAlert>
          </Portal>
        )}
      </SDot>,
    );
  }
}

export default createComponent(Dot);
