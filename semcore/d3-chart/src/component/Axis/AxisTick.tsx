import { Component, createComponent, Root, sstyled } from '@semcore/core';
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
    const STick = Root;

    const { styles } = this.asProps;
    const { isInteractive } = this.state;

    return sstyled(styles)(
      <STick
        render={Text}
        size={100}
        ref={this.tickRef}
        data-ui-name='Axis.Ticks'
        aria-hidden={isInteractive ? undefined : true}
      />,
    );
  }
}

export const AxisTick = createComponent<NSAxisTick.Component, typeof AxisTickComponent>(AxisTickComponent);
