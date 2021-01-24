import React from 'react';

import TextareaReact from '@semcore/textarea';
import PlaygroundGeneration from 'components/PlaygroundGeneration';

const SIZES = ['m', 'l', 'xl'];
const STATES = ['normal', 'invalid', 'valid'];
const RESIZE = ['none', 'vertical', 'horizontal', 'both'];

export default PlaygroundGeneration((createGroupWidgets) => {
  const { bool, radio, select } = createGroupWidgets('Textarea');

  const min = select({
    key: 'min',
    defaultValue: 2,
    label: 'Min rows',
    options: [...Array(10)].map((_, i) => ({
      name: i + 1,
      value: i + 1,
    })),
  });

  const max = select({
    key: 'max',
    defaultValue: 10,
    label: 'Max rows',
    options: [...Array(10)].map((_, i) => ({
      name: i + 1,
      value: i + 1,
    })),
  });

  const size = select({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: SIZES.map((value) => ({
      name: value,
      value,
    })),
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

  const resize = select({
    key: 'resize',
    defaultValue: 'none',
    label: 'Resize',
    options: RESIZE.map((value) => ({
      name: value,
      value,
    })),
  });

  const disabled = bool({
    key: 'disabled',
    defaultValue: false,
    label: 'Disabled',
  });

  const readOnly = bool({
    key: 'readOnly',
    defaultValue: false,
    label: 'Read-only',
  });

  return (
    <TextareaReact
      size={size}
      resize={resize}
      state={state}
      disabled={disabled}
      readOnly={readOnly}
      minRows={min}
      maxRows={max}
      placeholder="Placeholder"
    />
  );
});
