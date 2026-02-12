import { Text } from '@semcore/ui/typography';
import React from 'react';

const text = 'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.';

const ellipsisSettings = { cropPosition: 'end', maxLine: 2 } as const;

const Demo = () => {
  return (
    <Text
      w={180}
      ellipsis={ellipsisSettings}
    >
      {text}
    </Text>
  );
};

export default Demo;
