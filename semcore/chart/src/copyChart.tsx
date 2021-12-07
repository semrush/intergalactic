import React from 'react';
import { sstyled } from '@semcore/core';
import copyComponent from './copy';

import styles from './style/chart.shadow.css';

export default function copyChart<T extends React.ComponentClass>(SChart: T): T {
  return copyComponent(SChart, {
    defaultProps: {
      margin: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      },
    },
    render() {
      const { className, forwardedRef, children, ...other } = this.props;
      return sstyled(styles)(
        <SChart {...other} ref={forwardedRef} className={className}>
          <defs>
            <pattern
              id="diagonalGradient"
              patternUnits="userSpaceOnUse"
              width="10"
              height="10"
              patternTransform="rotate(-45)"
            >
              <line x1="5" y="0" x2="5" y2="10" stroke="#000" strokeWidth="1" />
            </pattern>
          </defs>
          {children}
        </SChart>,
      );
    },
  });
}
