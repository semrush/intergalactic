import CheckM from '@semcore/ui/icon/Check/m';
import { List } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <div>
    <List mb={4} size={300} marker={<CheckM color='icon-secondary-success' mt={1} />}>
      <List.Item>List item with custom bullet.</List.Item>
      <List.Item marker={<CheckM color='icon-secondary-neutral' mt={1} />}>
        List item with other custom bullet.
      </List.Item>
    </List>
    <List mb={4} size={200} marker={<CheckM color='icon-secondary-success' />}>
      <List.Item>List item with custom bullet.</List.Item>
      <List.Item marker={<CheckM color='icon-secondary-neutral' />}>
        List item with other custom bullet.
      </List.Item>
    </List>
    <List mb={4} size={100} marker={<CheckM color='icon-secondary-success' />}>
      <List.Item>List item with custom bullet.</List.Item>
      <List.Item marker={<CheckM color='icon-secondary-neutral' />}>
        List item with other custom bullet.
      </List.Item>
    </List>
  </div>
);

export default Demo;
