import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';
import logger from '@semcore/utils/lib/logger';

import style from './style/progress-bar.shadow.css';

function isCustomTheme(theme) {
  return !['dark', 'invert'].includes(theme);
}

class ProgressBarRoot extends Component {
  static displayName = 'ProgressBar';
  static style = style;
  static defaultProps = () => ({
    duration: 1000,
    size: 'm',
    theme: 'invert',
    children: <ProgressBar.Value />,
  });

  getValueProps() {
    const { value, duration, size } = this.asProps;
    return {
      value,
      duration,
      size,
    };
  }

  render() {
    const SProgressBar = Root;
    const { Children, styles, duration, theme, value } = this.asProps;
    const useTheme = isCustomTheme(theme) ? 'custom' : theme;

    return sstyled(styles)(
      <SProgressBar
        render={Box}
        use:theme={useTheme}
        use:animation={!value}
        use:duration={`${duration}ms`}
        сolorBg={resolveColor(theme)}
      >
        <Children />
      </SProgressBar>,
    );
  }
}

function Value(props) {
  const SValue = Root;
  const { styles, value, theme, duration } = props;
  const width = `${value}%`;

  return sstyled(styles)(
    <SValue
      render={Box}
      use:width={width}
      use:duration={`${duration}ms`}
      сolorBg={resolveColor(theme)}
    />,
  );
}

const ProgressBar = createComponent(ProgressBarRoot, {
  Value,
});

export default ProgressBar;
