import CheckM from '@semcore/ui/icon/Check/m';
import CloseM from '@semcore/ui/icon/Close/m';
import Switch from '@semcore/ui/switch';
import type { SwitchProps, SwitchValueProps } from '@semcore/ui/switch';
import React from 'react';

type SwitchExampleProps = SwitchProps & SwitchValueProps;

const Demo = (props: SwitchExampleProps) => {
  const [value, setValue] = React.useState(true);
  return (
    <Switch size={props.size} theme={props.theme} disabled={props.disabled}>
      <Switch.Value checked={value} onChange={setValue}>
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
