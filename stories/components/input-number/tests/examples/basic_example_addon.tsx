import InputNumber from '@semcore/ui/input-number';
import type { NSInputNumber } from '@semcore/ui/input-number';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type baseExampleAddonType = NSInputNumber.Props & NSInputNumber.Value.Props & NSInputNumber.Controls.Props & { disabledValue?: boolean };
const Demo = (props: baseExampleAddonType) => {
  return (
    <>
      <Text tag='label' htmlFor='basic-example'>
        Numeric input
      </Text>
      <InputNumber
        size={props.size}
        state={props.state}
        disabled={props.disabled}
        locale={props.locale}
      >
        <InputNumber.Addon pr={1}>
          <Text color='text-secondary' id='prefix-l'>
            Permanent text:
          </Text>
        </InputNumber.Addon>
        <InputNumber.Value
          disabled={props.disabledValue}
          max={props.max}
          min={props.min}
          step={props.step}
          value={props.value}
          readOnly={props.readOnly}
          placeholder={props.placeholder}
          id='basic-example'
        />

        <InputNumber.Controls showControls={props.showControls} />
      </InputNumber>
    </>
  );
};

export const defaultProps: baseExampleAddonType = {
  size: 'm',
  state: 'normal',
  locale: undefined,
  disabled: undefined,
  disabledValue: false,
  max: undefined,
  min: undefined,
  step: undefined,
  value: undefined,
  showControls: false,
  placeholder: undefined,
  readOnly: undefined,

};

Demo.defaultProps = defaultProps;

export default Demo;
