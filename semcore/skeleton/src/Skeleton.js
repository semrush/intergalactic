import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import uniqueIDEnhancement from '@semcore/utils/lib/uniqueID';

import style from './style/skeleton.shadow.css';

const MAP_COLOR_THEME = {
  dark: 'rgba(255,255,255,0.5)',
  invert: '#edeff0',
};

class Skeleton extends Component {
  static displayName = 'Skeleton';
  static style = style;
  static defaultProps = {
    width: '100%',
    height: '100%',
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
    const { Children, styles, duration, speed, hidden, uid, ...other } = this.asProps;

    if (hidden) return null;

    return sstyled(styles)(
      <SSkeleton render={Box} tag="svg" preserveAspectRatio="none" durationAnim={`${duration}ms`}>
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

function Text(props) {
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

export default createComponent(Skeleton, {
  Text,
});
