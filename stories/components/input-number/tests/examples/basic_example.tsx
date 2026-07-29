import InputNumber from '@semcore/ui/input-number';
import type { NSInputNumber } from '@semcore/ui/input-number';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type BaseExampleType =
  & NSInputNumber.Props
  & NSInputNumber.Value.Props<NSInputNumber.ValueNumber>
  & NSInputNumber.Controls.Props
  & { disabledValue?: boolean; logChanges?: boolean };

// Decimal precision derived from `step`, mirroring InputNumber's internal `stepPrecision`.
const getStepPrecision = (step?: number) => {
  const [, decimals] = step?.toString().split('.') ?? [];
  return decimals?.length ?? 0;
};

const Demo = (props: BaseExampleType) => {
  const stepPrecision = getStepPrecision(props.step);
  const [lastValue, setLastValue] = React.useState<NSInputNumber.ValueNumber>(null);

  const handleChange = (value: NSInputNumber.ValueNumber, _event?: React.SyntheticEvent<HTMLInputElement>) => {
    setLastValue(value);

    if (props.logChanges) {
      console.log('[InputNumber] onChange:', value, '| step precision:', stepPrecision);
    }
  };

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
        <InputNumber.Value<NSInputNumber.ValueNumber>
          disabled={props.disabledValue}
          max={props.max}
          min={props.min}
          step={props.step}
          value={props.value}
          readOnly={props.readOnly}
          placeholder={props.placeholder}
          onChange={handleChange}
          id='basic-example'
        />
        <InputNumber.Controls showControls={props.showControls} />
      </InputNumber>
      {props.logChanges && (
        <Text tag='div' size={200} mt={2} color='text-secondary'>
          Decimal step precision:
          {' '}
          {stepPrecision}
          {lastValue !== null && (
            <>
              {' '}
              · last onChange value:
              {' '}
              {lastValue}
            </>
          )}
        </Text>
      )}
    </>
  );
};

export const defaultProps: BaseExampleType = {
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
  logChanges: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
