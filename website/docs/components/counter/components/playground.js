import React from 'react';
import PlaygroundGeneration from 'components/PlaygroundGeneration';
import Counter from '@semcore/counter';

const SIZES = ['xl', 'l', 'm'];

const THEME = ['', 'warning', 'danger', 'light-blue', 'white'];

const Preview = (preview) => {
  const { select, radio, text } = preview('Counter');

  const size = radio({
    key: 'size',
    defaultValue: 'm',
    label: 'Size',
    options: SIZES,
  });

  const theme = select({
    key: 'theme',
    defaultValue: '',
    label: 'Theme',
    options: THEME.map((value) => ({
      name: value,
      value,
    })),
  });

  const child = text({
    key: 'children',
    defaultValue: '42',
    label: 'Value',
  });

  return (
    <Counter theme={theme} size={size}>
      {child}
    </Counter>
  );
};

export default PlaygroundGeneration(Preview);
