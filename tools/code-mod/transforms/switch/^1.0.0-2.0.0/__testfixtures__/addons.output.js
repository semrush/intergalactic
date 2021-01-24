import React from 'react';
import Switch from '@semcore/switch';

export default () => [
  <Switch>
    <Switch.Addon><Icon test="test" test2={() => 'test2'} /></Switch.Addon>
    <Switch.Value />
    <Switch.Addon>whatever u want</Switch.Addon>
  </Switch>,
  <Switch>
    <Switch.Value />
    <Switch.Addon>{"Test"}</Switch.Addon>
  </Switch>,
  <Switch>
    <Switch.Addon><Icon /></Switch.Addon>
    <Switch.Value />
  </Switch>,
  <Switch><Switch.Value><Icon /></Switch.Value></Switch>,
  <Switch><Switch.Value /></Switch>,
];
