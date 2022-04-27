import React from 'react';
import Checkbox from '@semcore/checkbox';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

export default PlaygroundGeneration(
  (createGroupWidgets) => {
    const { bool, radio, select, text, onChange } = createGroupWidgets('Checkbox');

    const size = radio({
      key: 'size',
      defaultValue: 'm',
      label: 'Size',
      options: ['m', 'l'],
    });

    const checked = bool({
      key: 'checked',
      defaultValue: false,
      label: 'Checked',
    });

    const indeterminate = bool({
      key: 'indeterminate',
      defaultValue: false,
      label: 'Indeterminate',
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
      <Checkbox size={size} state={state}>
        <Checkbox.Value
          disabled={disabled}
          checked={checked}
          indeterminate={indeterminate}
          onChange={(v) => onChange('checked', v)}
        />
        <Checkbox.Text>{children}</Checkbox.Text>
      </Checkbox>
    );
  },
  {
    filterProps: ['onChange'],
  },
);
