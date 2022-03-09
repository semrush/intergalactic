import React from 'react';
import styled from 'styled-components';
import TabLine from '@semcore/tab-line';

const Test = styled(TabLine)`
  padding: 20px;
`;

export default () => (
  <Test size="s">
    <Test.Item>item 1</Test.Item>
    <Test.Item>item 2</Test.Item>
    <Test.Item>item 3</Test.Item>
  </Test>
);
