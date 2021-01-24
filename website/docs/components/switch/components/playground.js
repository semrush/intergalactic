import React from 'react';
import Switch from '@semcore/switch';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

export default PlaygroundGeneration(
  (createGroupWidgets) => {
    const { bool, select, radio, text, onChange } = createGroupWidgets('Switch');

    const size = radio({
      key: 'size',
      defaultValue: 'm',
      label: 'Size',
      options: ['m', 'l', 'xl'],
    });

    const theme = select({
      key: 'theme',
      defaultValue: 'info',
      label: 'Theme',
      options: ['info', 'success'].map((v) => ({ value: v, name: v })),
    });

    const checked = bool({
      key: 'checked',
      defaultValue: false,
      label: 'Checked',
    });

    const icon = bool({ key: 'children', defaultValue: false, label: 'Icon' });

    const disabled = bool({
      key: 'disabled',
      defaultValue: false,
      label: 'Disabled',
    });

    const before = text({
      key: 'before',
      label: 'Before',
      defaultValue: 'off',
    });

    const after = text({
      key: 'after',
      label: 'After',
      defaultValue: 'on',
    });

    return (
      <Switch theme={theme} size={size}>
        {before && <Switch.Addon>{before}</Switch.Addon>}
        <Switch.Value
          disabled={disabled}
          checked={checked}
          onChange={(value) => onChange('checked', value)}
        >
          {icon && '$'}
        </Switch.Value>
        {after && <Switch.Addon>{after}</Switch.Addon>}
      </Switch>
    );
  },
  {
    filterProps: ['onCheckedChange'],
  },
);
