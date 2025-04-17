import React from 'react';
import Switch from '@semcore/switch';

const Demo = () => {
  return (
    <Switch size='l' theme='success'>
      <Switch.Value defaultChecked={true} ml={0} />
      <Switch.Addon>Receive updates</Switch.Addon>
    </Switch>
  );
};

export default Demo;
