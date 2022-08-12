import React from 'react';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import Badge from '@semcore/badge';

const Preview = (preview) => {
  const { select, radio, text } = preview('Badge');

  const color = radio({
    key: 'color',
    defaultValue: 'white',
    label: 'Color',
    options: ['white', 'gray-800'],
  });

  const bg = select({
    key: 'bg',
    defaultValue: 'gray-300',
    label: 'Background',
    options: ['gray-300', 'blue-300', 'red-300', 'orange-300', 'green-300', 'white'],
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
