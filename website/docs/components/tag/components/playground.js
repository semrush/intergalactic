import React from 'react';
import Tag from '@semcore/tag';
import EditXS from '@semcore/icon/lib/Edit/xs';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

const THEMES = {
  primary: ['muted', 'warning', 'invert'],
  secondary: ['muted', 'invert'],
  custom: [],
};

export default PlaygroundGeneration((createGroupWidgets) => {
  const { bool, radio, text, select } = createGroupWidgets('Tag');

  const size = radio({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: ['xl', 'l', 'm', 's'],
  });

  const use = radio({
    key: 'use',
    defaultValue: 'secondary',
    label: 'Use',
    options: Object.values(Object.keys(THEMES)),
  });

  let theme = null;
  let color = null;

  if (use === 'custom') {
    theme = text({
      key: 'theme',
      defaultValue: '',
      label: 'Theme',
    });
    color = text({
      key: 'color',
      defaultValue: '',
      label: 'Color',
    });
  } else {
    theme = select({
      key: 'theme',
      defaultValue: 'muted',
      label: 'Theme',
      options: THEMES[use].map((value) => ({
        name: value,
        value,
      })),
    });
  }

  let imageIcon = bool({
    key: 'image Icon',
    defaultValue: false,
    label: 'Image Icon',
  });

  let beforeIcon = bool({
    key: 'before Icon',
    defaultValue: false,
    label: 'Before Icon',
  });

  const closeIcon = bool({
    key: 'close Icon',
    defaultValue: false,
    label: 'Close Icon',
  });

  const disabled = bool({
    key: 'disabled',
    defaultValue: false,
    label: 'Disabled',
  });
  const active = bool({
    key: 'active',
    defaultValue: false,
    label: 'Active',
  });
  const interactive = bool({
    key: 'interactive',
    defaultValue: false,
    label: 'Interactive',
  });

  return (
    <Tag
      interactive={interactive}
      active={active}
      theme={theme}
      use={use}
      color={color}
      size={size}
      disabled={disabled}
    >
      {beforeIcon && (
        <Tag.Addon>
          <EditXS />
        </Tag.Addon>
      )}

      {imageIcon && (
        <Tag.Circle>
          <img src="https://picsum.photos/id/1025/28/28" />
        </Tag.Circle>
      )}
      <Tag.Text>Tag text</Tag.Text>
      {closeIcon && <Tag.Close />}
    </Tag>
  );
});
