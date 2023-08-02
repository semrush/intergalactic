import React from 'react';
import Tag from '@semcore/ui/tag';
import EditM from '@semcore/ui/icon/Edit/m';
import PlaygroundGeneration from '@components/PlaygroundGeneration';

export default PlaygroundGeneration((createGroupWidgets) => {
  const { bool, radio, text, select } = createGroupWidgets('Tag');

  const size = radio({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: ['m', 'l', 'xl'],
  });

  const COLORS = [
    'gray-500',
    'blue-500',
    'green-500',
    'salad-500',
    'orange-500',
    'yellow-500',
    'red-500',
    'pink-500',
    'violet-500',
  ];

  const color = select({
    key: 'color',
    defaultValue: 'gray-500',
    label: 'Color',
    options: COLORS.map((value) => ({
      name: value,
      value,
    })),
  });

  const theme = select({
    key: 'theme',
    defaultValue: 'primary',
    label: 'Theme',
    options: ['primary', 'secondary', 'additional'].map((value) => ({
      name: value,
      value,
    })),
  });

  const beforeIcon = bool({
    key: 'before Icon',
    defaultValue: false,
    label: 'AddonLeft',
  });

  const imageIcon = bool({
    key: 'image Icon',
    defaultValue: false,
    label: 'Image Addon',
  });

  const closeIcon = bool({
    key: 'close Icon',
    defaultValue: false,
    label: 'Close Icon',
  });

  const interactive = bool({
    key: 'interactive',
    defaultValue: false,
    label: 'Interactive',
  });

  const active = bool({
    key: 'active',
    defaultValue: false,
    label: 'Active',
  });

  const disabled = bool({
    key: 'disabled',
    defaultValue: false,
    label: 'Disabled',
  });

  return (
    <Tag
      interactive={interactive}
      active={active}
      theme={theme}
      color={color}
      size={size}
      disabled={disabled}
    >
      {beforeIcon && (
        <Tag.Addon>
          <EditM />
        </Tag.Addon>
      )}

      {imageIcon && (
        <Tag.Circle>
          <img src='https://picsum.photos/id/1025/28/28' alt='tag circle' />
        </Tag.Circle>
      )}
      <Tag.Text>Tag text</Tag.Text>
      {closeIcon && <Tag.Close />}
    </Tag>
  );
});
