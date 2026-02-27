import { Text } from '@semcore/ui/typography';
import type { TextProps } from '@semcore/ui/typography';
import React from 'react';

const Demo = (props: TextProps) => (
  <Text formatTags={'formatTags' in props ? props.formatTags : undefined}>
    <ol start={1}>
      <li>List item one</li>
      <li>
        List item two with subitems:
        <ul>
          <li>Subitem 1</li>
          <li>Subitem 2</li>
        </ul>
      </li>
      <li>Final list item</li>
    </ol>
  </Text>
);

export const defaultProps: TextProps = {
  formatTags: true,
};

Demo.defaultProps = defaultProps;

export default Demo;
