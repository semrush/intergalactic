import React from 'react';
import Switch from '@semcore/switch';

export default () => [
  <Switch id="test"><Switch.Value /></Switch>,
  <Switch style={{display: "block"}}><Switch.Value /></Switch>,
  <Switch><Switch.Value other="test" /></Switch>,
]
