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
    const { Children, styles, duration, size, theme, value, animation, ...other } = this.asProps;
    const useTheme = isCustomTheme(theme) ? 'custom' : theme;
    const color = resolveColor(theme);

    logger.warn(
      animation !== undefined,
      "The 'animation' property is deprecated, use 'value'",
      other['data-ui-name'] || ProgressBarRoot.displayName,
    );

    return sstyled(styles)(
      <SProgressBar
        render={Box}
        use:theme={useTheme}
        use:animation={animation === undefined ? !value : animation}
        use:duration={`${duration}ms`}
        backgroundColor={color}
      >
        <Children />
      </SProgressBar>,
    );
  }
}

function Value(props) {
  const SValue = Root;
  const { styles, value, size, theme, duration } = props;
  const width = `${value}%`;
  const color = resolveColor(theme);

  return sstyled(styles)(
    <SValue
      render={Box}
      use:width={width}
      use:duration={`${duration}ms`}
      backgroundColor={color}
    />,
  );
}

const ProgressBar = createComponent(ProgressBarRoot, {
  Value,
});

export default ProgressBar;

const Progress = React.forwardRef(function(props, ref) {
  logger.warn(
    true,
    "Component '<Progress/>' is deprecated, use '<ProgressBar.Value/>'",
    props['data-ui-name'] || ProgressBar.displayName,
  );
  return <ProgressBar.Value ref={ref} {...props} />;
});

const Bar = React.forwardRef(function(props, ref) {
  logger.warn(
    true,
    "Component '<Bar/>' is deprecated, please use '<ProgressBar/>'",
    props['data-ui-name'] || ProgressBar.displayName,
  );
  return <ProgressBar ref={ref} {...props} />;
});

export { Bar, Progress };
