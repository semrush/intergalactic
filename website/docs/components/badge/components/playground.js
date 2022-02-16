import React from 'react';

import PlaygroundGeneration from 'components/PlaygroundGeneration';

import Badge from '@semcore/badge';

const BG = {
  mist: 'mist',
  cyan: 'cyan',
  red: 'red-300',
  orange: 'orange-300',
  green: 'green-300',
  white: 'white',
};

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
    options: Object.keys(BG).map((value) => ({
      name: value,
      value: BG[value],
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
