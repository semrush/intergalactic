import React from 'react';

import PlaygroundGeneration from 'components/PlaygroundGeneration';

import Button from '@semcore/button';
import CheckM from '@semcore/icon/Check/m';
import CheckL from '@semcore/icon/Check/l';

import ArrowRightM from '@semcore/icon/ArrowRight/m';
import ArrowRightL from '@semcore/icon/ArrowRight/l';

const SIZES = ['xl', 'l', 'm', 's'];
const USE = ['primary', 'secondary', 'tertiary'];
const THEME = {
  primary: ['info', 'success', 'warning', 'danger', 'invert'],
  secondary: ['info', 'muted', 'invert'],
  tertiary: ['info', 'muted', 'invert'],
};

const Preview = (preview) => {
  const { bool, select, radio, text } = preview('Button');

  const size = radio({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: SIZES,
  });

  const use = select({
    key: 'use',
    defaultValue: 'secondary',
    label: 'Use',
    options: USE.map((value) => ({
      name: value,
      value,
    })),
  });

  const theme = select({
    key: 'theme',
    placeholder: 'Select theme',
    // defaultValue: THEME["secondary"][1],
    label: 'Theme',
    options: THEME[use].map((value) => ({
      name: value,
      value,
    })),
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

  const loading = bool({
    key: 'loading',
    defaultValue: false,
    label: 'Loading',
  });

  const beforeIcon = bool({
    key: 'before',
    defaultValue: false,
    label: 'Before',
  });

  const afterIcon = bool({
    key: 'after',
    defaultValue: false,
    label: 'After',
  });

  const child = text({
    key: 'children',
    defaultValue: 'Default text',
    label: 'Text',
  });
  const beforeIconMap = {
    xl: <CheckL />,
    l: <CheckM />,
    m: <CheckM />,
    s: <CheckM />,
  };
  const afterIconMap = {
    xl: <ArrowRightL />,
    l: <ArrowRightM />,
    m: <ArrowRightM />,
    s: <ArrowRightM />,
  };

  const renderIcon = (position, size) => {
    switch (position) {
      case 'before':
        return beforeIconMap[size];
      case 'after':
        return afterIconMap[size];
      default:
        return false;
    }
  };

  return (
    <Button
      use={use}
      theme={theme}
      size={size}
      loading={loading}
      disabled={disabled}
      active={active}
    >
      {beforeIcon && <Button.Addon>{renderIcon(beforeIcon && 'before', size)}</Button.Addon>}
      {(beforeIcon || afterIcon) && child ? <Button.Text>{child}</Button.Text> : child}
      {afterIcon && <Button.Addon>{renderIcon(afterIcon && 'after', size)}</Button.Addon>}
    </Button>
  );
};

export default PlaygroundGeneration(Preview);
