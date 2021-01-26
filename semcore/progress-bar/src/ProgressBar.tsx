import React from 'react';
import createComponent, { Component, IFunctionProps, Merge, styled } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';
import logger from '@semcore/utils/lib/logger';

import style from './style/progress-bar.shadow.css';

export interface IProgressBarProps extends IBoxProps {
  /**
   * Progress bar theme
   * @default invert
   */
  theme?: 'dark' | 'invert' | string;
  /**
   * Progress bar size
   * @default m
   */
  size?: 's' | 'm' | 'l';
  /** Value as a percentage */
  value?: number;
  /** ДDuration of animation, ms
   * @default 1000
   */
  duration?: number;
  /** Sets an animated background
   * @deprecated v2.0.0 {@link IProgressBarProps.value}
   * */
  animation?: boolean;
}

export interface IValueProps extends IBoxProps {
  size?: 's' | 'm' | 'l';
  value?: number;
  duration?: number;
  theme?: string;
}

function isCustomTheme(theme) {
  return !['dark', 'invert'].includes(theme);
}

class ProgressBarRoot extends Component<IProgressBarProps> {
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
    const { Root: SProgressBar } = this;
    const { Children, styles, duration, size, theme, value, animation, ...other } = this.asProps;
    const speedValue = `${duration}ms`;
    const useTheme = isCustomTheme(theme) ? 'custom' : theme;
    const color = resolveColor(theme);

    logger.warn(
      animation !== undefined,
      "The 'animation' property is deprecated, use 'value'",
      other['data-ui-name'] || ProgressBarRoot.displayName,
    );

    return styled(styles)`
      SProgressBar[theme='custom'] {
        background-color: ${color};
      }
      SProgressBar[theme='custom'] {
        background-image: ${color};
      }
      SProgressBar[animation] {
        animation-duration: ${speedValue};
      }
    `(
      <SProgressBar
        render={Box}
        theme={useTheme}
        animation={animation === undefined ? !value : animation}
        size={size}
      >
        <Children />
      </SProgressBar>,
    );
  }
}

function Value(props: IFunctionProps<IValueProps>) {
  const { Root: SValue, styles, value, size, theme, duration } = props;
  const width = `${value}%`;
  const durationBackground = `${duration}ms`;
  const color = resolveColor(theme);

  return styled(styles)`
    SValue {
      width: ${width};
      animation-duration: ${durationBackground};
    }
    SValue[theme] {
      background-color: ${color};
      background-image: ${color};
    }
  `(<SValue render={Box} theme={theme} size={size} />);
}

const ProgressBar = createComponent<
  Merge<IProgressBarProps, React.HTMLAttributes<HTMLDivElement>>,
  {
    Value: Merge<IValueProps, React.HTMLAttributes<HTMLDivElement>>;
  }
>(ProgressBarRoot, {
  Value,
});

export default ProgressBar;

const Progress = React.forwardRef<
  unknown,
  Merge<IValueProps, React.HTMLAttributes<HTMLDivElement>>
>(function (props, ref) {
  logger.warn(
    true,
    "Component '<Progress/>' is deprecated, use '<ProgressBar.Value/>'",
    props['data-ui-name'] || ProgressBar.displayName,
  );
  return <ProgressBar.Value ref={ref} {...props} />;
});

const Bar = React.forwardRef<
  unknown,
  Merge<IProgressBarProps, React.HTMLAttributes<HTMLDivElement>>
>(function (props, ref) {
  logger.warn(
    true,
    "Component '<Bar/>' is deprecated, please use '<ProgressBar/>'",
    props['data-ui-name'] || ProgressBar.displayName,
  );
  return <ProgressBar ref={ref} {...props} />;
});

export { Bar, Progress };
