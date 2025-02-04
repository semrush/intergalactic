import React from 'react';
import { List } from 'intergalactic/typography';
import CheckM from 'intergalactic/icon/Check/m';

const Demo = () => (
  <div>
    <List size={300} marker={<CheckM color='icon-secondary-success' mt={1} />}>
      <List.Item>List item with custom bullet.</List.Item>
      <List.Item marker={<CheckM color='icon-secondary-neutral' mt={1} />}>
        List item with other custom bullet.
      </List.Item>
    </List>
  </div>
);

export default Demo;
