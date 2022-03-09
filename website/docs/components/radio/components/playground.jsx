import React from 'react';
import Radio from '@semcore/radio';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

export default PlaygroundGeneration(
  (createGroupWidgets) => {
    const { bool, radio, select, text, onChange } = createGroupWidgets('Radio');

    const size = radio({
      key: 'size',
      defaultValue: 'm',
      label: 'Size',
      options: ['m', 'l', 'xl'],
    });

    const checked = bool({
      key: 'checked',
      defaultValue: false,
      label: 'Checked',
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
      <Radio size={size} state={state}>
        <Radio.Value disabled={disabled} checked={checked} />
        <Radio.Text>{children}</Radio.Text>
      </Radio>
    );
  },
  {
    filterProps: ['onChange'],
  },
);
