import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = {
  formatTags: boolean;
};

const Demo = (props: ExampleProps) => (
  <Text formatTags={props.formatTags}>
    <ol>
      <li>List item one</li>
      <li>
        List item two with nested ordered list:
        <ol>
          <li>Level 2 item</li>
          <li>
            Level 2 item with nested list:
            <ol>
              <li>Level 3 item</li>
              <li>Level 3 item</li>
              <li>Level 3 item</li>
            </ol>
          </li>
          <li>Level 2 item</li>
        </ol>
      </li>
      <li>
        List item three with nested unordered list:
        <ul>
          <li>Unordered subitem</li>
          <li>
            Unordered subitem with nested list:
            <ul>
              <li>Deep unordered subitem</li>
              <li>Deep unordered subitem</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>Final list item</li>
    </ol>
  </Text>
);

export const defaultProps: ExampleProps = {
  formatTags: true,
};

Demo.defaultProps = defaultProps;

export default Demo;
