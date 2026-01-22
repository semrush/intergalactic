import Switch from '@semcore/ui/switch';
import type { SwitchProps, SwitchValueProps } from '@semcore/ui/switch';
import React from 'react';

type SwitchExampleProps = SwitchProps & SwitchValueProps;

const Demo = (props: SwitchExampleProps) => {
  return (
    <Switch size={props.size} disabled={props.disabled}>
      <Switch.Value theme={props.theme} checked={props.checked}>$</Switch.Value>
    </Switch>
  );
};

export const defaultProps: SwitchExampleProps = {
  size: 'l',
  theme: 'success',
  disabled: false,
  checked: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
