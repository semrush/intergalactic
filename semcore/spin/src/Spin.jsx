import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';

import style from './style/spin.shadow.css';

class RootSpin extends Component {
  static displayName = 'Spin';
  static style = style;
  static defaultProps = {
    size: 'm',
    theme: 'dark',
  };

  render() {
    const SSpin = Root;
    const { Children, styles, theme } = this.asProps;
    return sstyled(styles)(
      <SSpin render={Box} tag="svg" viewBox="0 0 24 24" use:theme={resolveColor(theme)}>
        <path d="M16.98 20.6256C17.5433 21.6013 18.8054 21.9477 19.6718 21.2274C21.567 19.6517 22.9447 17.5183 23.5911 15.1058C24.4148 12.0317 23.9836 8.75621 22.3923 6C20.801 3.24379 18.18 1.23261 15.1058 0.408891C12.6934 -0.237529 10.1569 -0.111098 7.84473 0.742337C6.78777 1.13246 6.45667 2.39867 7.02 3.37439V3.37439C7.58333 4.3501 8.83088 4.65471 9.91792 4.35856C11.2588 3.99325 12.6844 3.984 14.0498 4.34987C16.0788 4.89352 17.8087 6.2209 18.8589 8.04C19.9092 9.8591 20.1938 12.0209 19.6501 14.0498C19.2843 15.4153 18.5634 16.6453 17.5766 17.6239C16.7766 18.4172 16.4167 19.6499 16.98 20.6256V20.6256Z" />
        <Children />
      </SSpin>,
    );
  }
}

export default createComponent(RootSpin);
