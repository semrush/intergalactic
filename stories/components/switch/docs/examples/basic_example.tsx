import Switch from '@semcore/switch';
import React from 'react';

const Demo = () => {
  return (
    <Switch size='l' theme='success'>
      <Switch.Value defaultChecked={true} ml={0} />
      <Switch.Addon>Receive updates</Switch.Addon>
    </Switch>
  );
};

export default Demo;
