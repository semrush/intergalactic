import React, { HTMLAttributes } from 'react';
import createComponent, { Component, Root, sstyled } from '@semcore/core';

import { Box, IBoxProps } from '@semcore/flex-box';
import logger from '@semcore/utils/lib/logger';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

import style from './style/dot.shadow.css';

class Dot extends Component {
  static displayName = 'Dot';
  static style = style;
  static defaultProps = {
    size: 'm',
  };

  render() {
    const SDot = Root;
    let { Children, styles, size, invisible } = this.asProps;
    size = React.Children.toArray(getOriginChildren(Children)).length === 0 ? size : 'xl';

    logger.warn(
      invisible !== undefined,
      "The 'invisible' property is deprecated, use 'hidden'",
      this.asProps['data-ui-name'] || Dot.displayName,
    );

    return sstyled(styles)(
      <SDot render={Box} tag="span" use:size={size} hidden={invisible} />,
    );
  }
}

export default createComponent(Dot);
