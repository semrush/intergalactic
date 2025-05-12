import React from 'react';
import { Text } from '@semcore/typography';

const Demo = () => (
  <Text>
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

export default Demo;
