import Tag from '@semcore/ui/tag';
import React from 'react';

const text = 'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.';

const Demo = () => {
  return (
    <Tag w={180}>
      <Tag.Text ellipsis:cropPosition='middle'>
        {text}
      </Tag.Text>
    </Tag>
  );
};

export default Demo;
