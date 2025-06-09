import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import Switch from '@semcore/switch';
import React from 'react';

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
