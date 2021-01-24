import React from 'react';

import PlaygroundGeneration from 'components/PlaygroundGeneration';

import Badge from '@semcore/badge';

const BG = ['mist', 'cyan', 'red', 'orange', 'green', 'white'];

const Preview = (preview) => {
  const { select, radio, text } = preview('Button');

  const color = radio({
    key: 'color',
    defaultValue: 'white',
    label: 'Color',
    options: ['white', 'gray20'],
  });

  const bg = select({
    key: 'bg',
    defaultValue: 'mist',
    label: 'Background',
    options: BG.map((value) => ({
      name: value,
      value,
    })),
  });

  const child = text({
    key: 'children',
    defaultValue: 'soon',
    label: 'Text',
  });

  return (
    <Badge bg={bg} color={color}>
      {child}
    </Badge>
  );
};

export default PlaygroundGeneration(Preview);
