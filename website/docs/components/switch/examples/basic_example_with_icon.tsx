import React from 'react';
import Switch from 'intergalactic/switch';
import CheckM from 'intergalactic/icon/Check/m';
import CloseM from 'intergalactic/icon/Close/m';

const Demo = () => {
  const [value, setValue] = React.useState(true);
  return (
    <Switch size='l' theme='success'>
      <Switch.Value checked={value} onChange={setValue}>
        {value ? <CheckM /> : <CloseM />}
      </Switch.Value>
      <Switch.Addon>Autosave</Switch.Addon>
    </Switch>
  );
};

export default Demo;
