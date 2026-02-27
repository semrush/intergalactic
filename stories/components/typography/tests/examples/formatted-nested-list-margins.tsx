import { Text } from '@semcore/ui/typography';
import type { TextProps } from '@semcore/ui/typography';
import React from 'react';

const Demo = (props: TextProps) => (
  <div>
    <Text size={100} formatTags={'formatTags' in props ? props.formatTags : undefined}>
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
    <Text size={200} formatTags={'formatTags' in props ? props.formatTags : undefined}>
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
    <Text size={300} formatTags={'formatTags' in props ? props.formatTags : undefined}>
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
  </div>
);

export const defaultProps: TextProps = {
  formatTags: true,
};

Demo.defaultProps = defaultProps;

export default Demo;
