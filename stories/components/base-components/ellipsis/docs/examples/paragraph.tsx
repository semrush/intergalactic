import type { EllipsisSettings } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const text = 'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.';

const ellipsisSettings: EllipsisSettings = { maxLine: 3 };

const Demo = () => {
  return (
    <Text w={180} ellipsis={ellipsisSettings}>
      {text}
    </Text>
  );
};

export default Demo;
