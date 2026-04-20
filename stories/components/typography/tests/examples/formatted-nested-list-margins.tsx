import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = {
  formatTags: boolean;
};

const Demo = (props: ExampleProps) => (
  <div>
    <Text size={100} formatTags={props.formatTags}>
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
    <Text size={200} formatTags={props.formatTags}>
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
    <Text size={300} formatTags={props.formatTags}>
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

export const defaultProps: ExampleProps = {
  formatTags: true,
};

Demo.defaultProps = defaultProps;

export default Demo;
