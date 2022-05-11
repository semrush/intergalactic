import React from 'react';
import Switch from '@semcore/switch';

const Demo = () => {
  return (
    <Switch>
      <Switch.Addon>On</Switch.Addon>
      <Switch.Value defaultChecked={true} />
      <Switch.Addon>Off</Switch.Addon>
    </Switch>
  );
};

export default Demo;
