import React from 'react';
import InputNumber from '@semcore/input-number';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

const STATES = ['normal', 'invalid', 'valid'];
const SIZES = ['m', 'l', 'xl'];

const Preview = (preview) => {
  const { bool, select, radio, text, empty, onChange } = preview('InputNumber');

  const size = radio({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: SIZES,
  });

  const state = select({
    key: 'state',
    defaultValue: 'normal',
    label: 'State',
    options: STATES.map((value) => ({
      name: value,
      value,
    })),
  });

  const disabled = bool({
    key: 'disabled',
    defaultValue: false,
    label: 'Disabled',
  });

  const value = empty({ key: 'value', defaultValue: '' });
  const min = text({ key: 'min', defaultValue: 0, label: 'Min' });
  const max = text({ key: 'max', defaultValue: 100, label: 'Max' });
  const step = text({ key: 'step', defaultValue: 1, label: 'Step' });
  const showControls = bool({
    key: 'showControls',
    defaultValue: false,
    label: 'Show Controls',
  });

  return (
    <InputNumber size={size} state={state}>
      <InputNumber.Value
        min={Number(min)}
        max={Number(max)}
        step={Number(step)}
        disabled={disabled}
        value={value}
        onChange={(value) => onChange('value', value)}
      />
      <InputNumber.Controls showControls={showControls} />
    </InputNumber>
  );
};

export default PlaygroundGeneration(Preview, {
  filterProps: ['onChange', 'value'],
});
