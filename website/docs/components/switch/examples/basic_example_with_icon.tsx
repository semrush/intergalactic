import React from 'react';
import Switch from 'intergalactic/switch';
import CheckM from 'intergalactic/icon/Check/m';

const Demo = () => {
  return (
    <Switch size='l' theme='success'>
      <Switch.Value defaultChecked={true} ml={0}>
        <CheckM />
      </Switch.Value>
      <Switch.Addon>Have a great day</Switch.Addon>
    </Switch>
  );
};

export default Demo;
