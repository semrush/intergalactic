import { Component, createComponent, sstyled } from '@semcore/core';
import { getFocusableIn } from '@semcore/core/lib/utils/focus-lock/getFocusableIn';
import { Text } from '@semcore/typography';
import * as React from 'react';

import styles from './axis.shadow.css';
import type { NSAxisTick } from './AxisTick.type';

class AxisTickComponent extends Component<NSAxisTick.Props, [], never, {}, NSAxisTick.State> {
  static style = styles;

  tickRef = React.createRef<HTMLSpanElement>();

  state: NSAxisTick.State = {
    isInteractive: false,
  };

  componentDidMount() {
    if (this.tickRef.current) {
      const hasFocusable = getFocusableIn(this.tickRef.current).length > 0;

      this.setState({ isInteractive: hasFocusable });
    }
  }

  render() {
    const STick = Text;

    const { valueFormatter, value, translate, styles } = this.asProps;
    const { isInteractive } = this.state;

    return sstyled(styles)(
      <STick size={100} ref={this.tickRef} style={{ transform: translate }} data-ui-name='Axis.Ticks' aria-hidden={isInteractive ? undefined : true}>
        {valueFormatter(value)}
      </STick>,
    );
  }
}

export const AxisTick = createComponent<NSAxisTick.Component, typeof AxisTickComponent>(AxisTickComponent);
