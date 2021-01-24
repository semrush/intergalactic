import React from 'react';
import TabLine from '@semcore/tab-line';

export default () => [
  <TabLine theme="default">
    <TabLine.Item>1</TabLine.Item>
    <TabLine.Item>2</TabLine.Item>
    <TabLine.Item>3</TabLine.Item>
  </TabLine>,
  <TabLine theme="invert">
    <TabLine.Item>1</TabLine.Item>
    <TabLine.Item>2</TabLine.Item>
    <TabLine.Item>3</TabLine.Item>
  </TabLine>,
];
