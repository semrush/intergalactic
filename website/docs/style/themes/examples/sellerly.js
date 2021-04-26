import React from 'react';
import Button from '@semcore/button';
import { sstyled } from '@semcore/core';

const styles = sstyled.css`
  SButton[theme='primary-info'] {
    background-color: #5c4cdc;
    color: #fff;

    &:active,
    &[active] {
      background-color: #3628a2;
    }
    &:hover {
      background-color: #3c2db6;
    }
  }
`;

const Demo = () => (
  <Button use="primary" theme="info" styles={styles}>
    Theme Button
  </Button>
);
export default Demo;
