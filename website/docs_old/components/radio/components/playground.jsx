import React from 'react';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

export default PlaygroundGeneration(
  (createGroupWidgets) => {
    const { bool, radio, select, text } = createGroupWidgets('Radio');

    const size = radio({
      key: 'size',
      defaultValue: 'm',
      label: 'Size',
      options: ['m', 'l'],
    });

    const state = select({
      key: 'state',
      defaultValue: 'normal',
      label: 'State',
      options: ['normal', 'invalid'].map((value) => ({
        name: value,
        value,
      })),
    });

    const disabled = bool({
      key: 'disabled',
      defaultValue: false,
      label: 'Disabled',
    });

    const children = text({
      key: 'children',
      defaultValue: 'Label text',
      label: 'Children',
    });

    return (
      <RadioGroup size={size} state={state} disabled={disabled}>
        <Radio mb={3} value={'1'} label={'Value 1'} />
        <Radio mb={3} value={'2'} label={children} />
      </RadioGroup>
    );
  },
  {
    filterProps: ['onChange'],
  },
);
