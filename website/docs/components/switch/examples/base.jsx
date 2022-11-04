import React from 'react';
import Switch from '@semcore/ui/switch';
import CheckM from '@semcore/ui/icon/Check/m';

const Demo = () => {
  return (
    <Switch size="l">
      <Switch.Addon>Disabled</Switch.Addon>
      <Switch.Value defaultChecked={true}>
        <CheckM />
      </Switch.Value>
      <Switch.Addon>Enabled</Switch.Addon>
    </Switch>
  );
};

export default Demo;
