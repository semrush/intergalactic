import React from 'react';
import FormatText from '@semcore/format-text';

const Demo = () => (
  <FormatText>
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
  </FormatText>
);

export default Demo;
