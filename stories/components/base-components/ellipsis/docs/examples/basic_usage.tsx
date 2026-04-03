import Tag from '@semcore/ui/tag';
import React from 'react';

const text = 'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.';

const Demo = () => {
  return (
    <Tag>
      <Tag.Text w={180} ellipsis:cropPosition='middle'>
        {text}
      </Tag.Text>
    </Tag>
  );
};

export default Demo;
