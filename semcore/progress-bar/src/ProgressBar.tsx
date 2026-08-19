import { Box } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import resolveColorEnhance from '@semcore/core/lib/utils/enhances/resolveColorEnhance';
import React from 'react';

import type { NSProgressBar } from './ProgressBar.type';
import style from './style/progress-bar.shadow.css';

function isCustomTheme(theme?: string) {
  if (!theme) return false;

  return !['default', 'invert'].includes(theme);
}

class ProgressBarRoot extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSProgressBar.Component>,
  typeof ProgressBarRoot.enhance,
  {},
  {},
  {},
  NSProgressBar.DefaultProps
> {
  static displayName = 'ProgressBar';
  static style = style;
  static enhance = [resolveColorEnhance()] as const;
  static defaultProps = () => ({
    duration: 1000,
    size: 'm',
    theme: 'default',
    children: <ProgressBar.Value />,
  } as const);

  getValueProps() {
    const { value, duration, size, resolveColor } = this.asProps;
    return {
      value,
      duration,
      size,
      resolveColor,
    };
  }

  render() {
    const SProgressBar = Root;
    const { Children, styles, duration, theme, value, resolveColor } = this.asProps;
    const useTheme = isCustomTheme(theme) ? 'custom' : theme;

    return sstyled(styles)(
      <SProgressBar
        render={Box}
        use:theme={useTheme}
        use:animation={value === undefined}
        use:duration={`${duration}ms`}
        colorBg={resolveColor(theme)}
        role='progressbar'
        aria-valuenow={value}
      >
        <Children />
      </SProgressBar>,
    );
  }
}

function Value(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSProgressBar.Value.Component,
    typeof ProgressBarRoot,
    'Value'
  >,
) {
  const SValue = Root;
  const { styles, value, theme, duration, resolveColor } = props;
  const width = `${value}%`;

  return sstyled(styles)(
    <SValue
      render={Box}
      use:width={width}
      use:duration={`${duration}ms`}
      colorBg={resolveColor(theme)}
    />,
  );
}

/**
 * ProgressBar
 *
 * {@link https://developer.semrush.com/intergalactic/components/progress-bar/progress-bar-api/|API} | {@link https://developer.semrush.com/intergalactic/components/progress-bar/progress-bar-code/|Examples}
 */
const ProgressBar = createComponent<
  NSProgressBar.Component,
  typeof ProgressBarRoot
>(ProgressBarRoot, {
  Value,
});

export default ProgressBar;
