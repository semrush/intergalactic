import { Flex } from '@semcore/ui/base-components';
import Checkbox from '@semcore/ui/checkbox';
import type { NSCheckbox } from '@semcore/ui/checkbox';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type CheckboxExampleProps = NSCheckbox.Props & { color?: 'string'; autoFocus: boolean };
const Demo = (props: CheckboxExampleProps) => {
  const [checked, setChecked] = React.useState<boolean>(Boolean(props.checked));

  React.useEffect(() => {
    setChecked(Boolean(props.checked));
  }, [props.checked]);

  const handleChange: NonNullable<NSCheckbox.Value.Props['onChange']> = React.useCallback(
    (value, e) => {
      console.log('[Checkbox.Value onChange] expected: (checked: boolean, event: SyntheticEvent)');
      console.log('[Checkbox.Value onChange] received:', {
        checked: value,
        checkedType: typeof value,
        event: e,
      });
      setChecked(value);
    },
    [],
  );

  return (
    <Flex m={5} data-test-id='checkbox'>
      <Flex gap={2} direction='column' m={5}>
        <Text size={100}>default</Text>
        <Checkbox
          size={props.size}
          disabled={props.disabled}
          theme={props.theme}
          state={props.state}
          indeterminate={props.indeterminate}
          checked={checked}
        >
          <Checkbox.Value autoFocus={props.autoFocus} onChange={handleChange} />
          <Checkbox.Text color={props.color}>This isLabel</Checkbox.Text>
        </Checkbox>
      </Flex>
    </Flex>
  );
};

export const defaultExampleProps: CheckboxExampleProps = {
  size: 'm',
  color: undefined,
  state: 'normal',
  theme: undefined,
  checked: undefined,
  disabled: undefined,
  indeterminate: undefined,
  autoFocus: false,
};

Demo.defaultProps = defaultExampleProps;
export default Demo;
