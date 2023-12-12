import React from 'react';
import PlaygroundGeneration from '@components/PlaygroundGeneration';
import Badge from '@semcore/ui/badge';

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
    defaultValue: 'gray-400',
    label: 'Background',
    options: ['gray-400', 'blue-400', 'red-400', 'orange-400', 'green-400', 'white'],
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
