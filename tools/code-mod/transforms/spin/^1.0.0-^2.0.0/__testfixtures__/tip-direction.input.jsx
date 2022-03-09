import React from 'react';
import Spin from '@semcore/spin';

export default () => [
  <Spin tip="Loading..." size="xxs"/>,
  <Spin tip="Loading..." size="l"/>,
  <Spin tip="Loading..." size="xl"/>,
  <Spin tip="Loading..." size="xxs" direction="column"/>,
  <Spin tip="Loading..." size="l" direction="column"/>,
  <Spin tip="Loading..." size="xl" direction="column"/>,
];
