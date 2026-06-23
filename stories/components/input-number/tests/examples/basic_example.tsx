import InputNumber from '@semcore/ui/input-number';
import type { NSInputNumber } from '@semcore/ui/input-number';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type baseExampleType = NSInputNumber.Props & NSInputNumber.Value.Props & NSInputNumber.Controls.Props & { disabledValue?: boolean };
const Demo = (props: baseExampleType) => {
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

export const defaultProps: baseExampleType = {
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
