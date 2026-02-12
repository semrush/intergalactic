import type { EllipsisSettings } from '@semcore/ui/base-components';
import Tag from '@semcore/ui/tag';
import React from 'react';

const text = 'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns.';

const ellipsisSettings: EllipsisSettings = { cropPosition: 'middle' };

const Demo = () => {
  return (
    <Tag>
      <Tag.Text w={180} ellipsis={ellipsisSettings}>
        {text}
      </Tag.Text>
    </Tag>
  );
};

export default Demo;
