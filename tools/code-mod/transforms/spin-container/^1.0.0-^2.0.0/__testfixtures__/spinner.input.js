import React from 'react';
import SpinContainer from '@semcore/spin-container';
import Spin from '@semcore/spin';

export default () => [
  <SpinContainer spinner={<Spin size="xxl"/>} />,
  <SpinContainer spinner={<Spin size="xl"/>} other="test" />,
];
