import React from 'react';
import createComponent, { Component, IFunctionProps, Merge, sstyled, Root } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import logger from '@semcore/utils/lib/logger';
import uniqueIDEnhancement, { IUniqueIDProps } from '@semcore/utils/lib/uniqueID';

import style from './style/skeleton.shadow.css';

export interface ISkeletonTextProps extends IBoxProps {
  /**
   * Number of items to be returned
   * @default 1
   */
  amount?: string | number;
}

export interface ISkeletonProps extends IBoxProps, IUniqueIDProps {
  /**
   *  Skeleton visibility control property
   */
  hidden?: boolean;
  /**
   * Animation speed in ms
   * @default 2000
   */
  duration?: string | number;
  /**
   * Skeleton theme
   * @default invert
   */
  theme?: 'dark' | 'invert';
  /** Skeleton visibility control property
   * @deprecated v2.0.0 {@link ISkeletonProps.hidden}
   * */
  visible?: boolean;
  /** Animation speed in ms
   * @deprecated v2.0.0 {@link ISkeletonProps.duration}
   * */
  speed?: string | number;
}

const MAP_COLOR_THEME = {
  dark: 'rgba(255,255,255,0.5)',
  invert: '#edeff0',
};

export interface ISkeletonCtx {
  gradientUrl: 'string';
}

class Skeleton extends Component<ISkeletonProps> {
  static displayName = 'Skeleton';
  static style = style;
  static defaultProps = {
    width: '100%',
    height: 100,
    theme: 'invert',
    duration: 2000,
  };
  static enhance = [uniqueIDEnhancement()];

  setContext() {
    const { theme } = this.asProps;
    return {
      gradientUrl: MAP_COLOR_THEME[theme],
    };
  }

  render() {
    const SSkeleton = Root;
    const { Children, styles, duration, speed, hidden, visible, uid, ...other } = this.asProps;

    logger.warn(
      visible !== undefined,
      "'visible' property is deprecated, use 'hidden'",
      other['data-ui-name'] || Skeleton.displayName,
    );

    logger.warn(
      speed !== undefined,
      "'speed' property is deprecated, use 'duration'",
      other['data-ui-name'] || Skeleton.displayName,
    );

    if (visible === false) return null;
    if (hidden) return null;

    return sstyled(styles)(
      <SSkeleton
        render={Box}
        tag="svg"
        preserveAspectRatio="none"
        durationAnim={`${duration || speed}ms`}
      >
        <defs>
          <mask id={uid}>
            <Children />
          </mask>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" mask={`url(#${uid})`} />
      </SSkeleton>,
    );
  }
}

function Text(props: IFunctionProps<ISkeletonTextProps, ISkeletonCtx>) {
  const SText = Box;
  const { amount, y, x, styles, forwardRef, ...other } = props;
  const amountLine = Number(amount);

  const renderRect = (props) => {
    return sstyled(styles)(<SText tag="rect" rx="4" ry="4" height="8" {...props} />);
  };

  return (
    <React.Fragment>
      {[...Array(amountLine)].map((el, index) =>
        renderRect({
          key: index,
          y: y || 20 * index,
          x,
          ref: forwardRef,
          ...other,
        }),
      )}
    </React.Fragment>
  );
}
Text.defaultProps = {
  x: 0,
  y: 0,
  amount: 1,
  width: '100%',
};

export default createComponent<
  Merge<ISkeletonProps, React.SVGAttributes<SVGElement>>,
  {
    Text: Merge<ISkeletonTextProps, React.SVGAttributes<any>>;
  },
  ISkeletonCtx
>(Skeleton, {
  Text,
});
