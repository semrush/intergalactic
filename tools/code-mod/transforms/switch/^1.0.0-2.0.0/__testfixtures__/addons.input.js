import React from 'react';
import Switch from '@semcore/switch';

export default () => [
  <Switch before={<Icon test="test" test2={() => 'test2'} />} after={'whatever u want'}/>,
  <Switch after="Test"/>,
  <Switch before={<Icon />}/>,
  <Switch><Icon /></Switch>,
  <Switch/>,
];
