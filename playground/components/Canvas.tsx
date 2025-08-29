import { Box } from '@semcore/base-components';
import type { PropsWithChildren } from 'react';
import React from 'react';

import styles from '../styles/styles.module.css';

interface ICanvasProps extends PropsWithChildren {}

function Canvas(props: ICanvasProps) {
  const { children } = props;

  return (
    <Box className={[styles.canvas, 'canvas-runtime'].join(' ')}>
      {children}
    </Box>
  );
}

export default Canvas;
