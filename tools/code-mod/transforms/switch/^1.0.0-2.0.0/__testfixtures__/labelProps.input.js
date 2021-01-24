import React from 'react';
import Switch from '@semcore/switch';

export default () => [
  <Switch labelProps={{id: "test"}}/>,
  <Switch labelProps={{style: {display: "block"}}}/>,
  <Switch other="test"/>,
]
