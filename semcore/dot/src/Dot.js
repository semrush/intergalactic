import React from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';

import { Animation } from '@semcore/animation';
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

  render() {
    const SDot = Root;

    let { Children, styles, size, hidden, duration, keyframes } = this.asProps;
    size = React.Children.toArray(getOriginChildren(Children)).length === 0 ? size : 'xl';

    return sstyled(styles)(
      <SDot
        render={Animation}
        tag="span"
        use:size={size}
        visible={!hidden}
        duration={duration}
        keyframes={keyframes}
      />,
    );
  }
}

export default createComponent(Dot);
