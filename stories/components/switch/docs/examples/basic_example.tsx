import Switch from '@semcore/ui/switch';
import type { SwitchProps, SwitchValueProps } from '@semcore/ui/switch';
import React from 'react';

type SwitchExampleProps = SwitchProps & SwitchValueProps;

const Demo = (props: SwitchExampleProps) => {
  return (
    <Switch size={props.size} theme={props.theme} disabled={props.disabled}>
      <Switch.Value defaultChecked={props.defaultChecked} ml={0} checked={props.checked} />
      <Switch.Addon>Receive updates</Switch.Addon>
    </Switch>
  );
};

export const defaultProps: SwitchExampleProps = {
  size: 'l',
  theme: 'success',
  disabled: undefined,
  checked: undefined,
  defaultChecked: true,
};

Demo.defaultProps = defaultProps;

export default Demo;
