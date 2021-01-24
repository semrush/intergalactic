import React, { HTMLAttributes } from 'react';
import createComponent, { Component, Merge, styled } from '@semcore/core';

import { Box, IBoxProps } from '@semcore/flex-box';
import logger from '@semcore/utils/lib/logger';
import getOriginChildren from '@semcore/utils/lib/getOriginChildren';

import style from './style/dot.shadow.css';

export interface IDotProps extends IBoxProps {
  /** Size of the dot
   * @default m
   */
  size?: 'xl' | 'l' | 'm';
  /** Property for placing the Dot in the upper right corner of the component
   * @default false
   * */
  up?: boolean;
  /** The property for Dot visibility control */
  hidden?: boolean;
  /**
   * @ignore
   *  */
  invisible?: boolean;
}

class Dot extends Component<IDotProps> {
  static displayName = 'Dot';
  static style = style;
  static defaultProps = {
    size: 'm',
  };

  render() {
    const { Root: SDot } = this;
    let { Children, styles, size, up, hidden, invisible, ...other } = this.asProps;
    size = React.Children.toArray(getOriginChildren(Children)).length === 0 ? size : 'xl';

    logger.warn(
      invisible !== undefined,
      "Свойство 'invisible' является устаревшим, используйте 'hidden'",
      other['data-ui-name'] || Dot.displayName,
    );

    return styled(styles)(
      <SDot render={Box} tag="span" size={size} up={up} hidden={hidden || invisible} />,
    );
  }
}

export default createComponent<Merge<IDotProps, HTMLAttributes<HTMLSpanElement>>>(Dot);
