import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import Switch from '@semcore/switch';
import type { SwitchProps, SwitchValueProps } from '@semcore/switch';
import React from 'react';

type SwitchExampleProps = SwitchProps & SwitchValueProps;

const Demo = (props: SwitchExampleProps) => {
  const [value, setValue] = React.useState(true);
  return (
    <Switch size={props.size} theme={props.theme}>
      <Switch.Value checked={value} onChange={setValue} disabled={props.disabled}>
        {value ? <CheckM /> : <CloseM />}
      </Switch.Value>
      <Switch.Addon>Autosave</Switch.Addon>
    </Switch>
  );
};

export const defaultProps: SwitchExampleProps = {
  size: 'l',
  theme: 'success',
  disabled: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
