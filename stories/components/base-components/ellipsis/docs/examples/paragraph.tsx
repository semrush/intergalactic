import { Text } from '@semcore/ui/typography';
import React from 'react';

const text = 'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.';

const Demo = () => {
  return (
    <Text w={180} ellipsis:maxLine={3}>
      {text}
    </Text>
  );
};

export default Demo;
