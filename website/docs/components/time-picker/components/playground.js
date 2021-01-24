import React from 'react';

import Timepicker from '@semcore/time-picker';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

const SIZES = ['m', 'l', 'xl'];
const STATES = ['normal', 'invalid', 'valid'];

const d = new Date();

export default PlaygroundGeneration(
  (createGroupWidgets) => {
    const { empty, bool, radio, select, onChange } = createGroupWidgets('Timepicker');

    const value = empty({
      key: 'value',
      defaultValue: `${d.getHours()}:${d.getMinutes()}`,
    });
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

    const is12Hour = bool({
      key: 'is12Hour',
      defaultValue: false,
      label: '12 Hour format',
    });

    return (
      <Timepicker
        size={size}
        state={state}
        disabled={disabled}
        is12Hour={is12Hour}
        value={value}
        onChange={(value) => onChange('value', value)}
      />
    );
  },
  {
    filterProps: ['onChange', 'value'],
  },
);
