import React from 'react';
import { List } from '@semcore/typography';
import CheckM from '@semcore/icon/Check/m';

const Demo = () => (
  <div>
    <List size={300} marker={<CheckM color='icon-secondary-success' mt={1} />}>
      <List.Item>
        <List.Item.Content w='100%' justifyContent='flex-end'>
          List item with custom bullet.
        </List.Item.Content>
      </List.Item>
      <List.Item marker={<CheckM color='icon-secondary-neutral' mt={1} />}>
        <List.Item.Content w='100%' justifyContent='flex-end'>
          List item with other custom bullet.
        </List.Item.Content>
      </List.Item>
    </List>
  </div>
);

export default Demo;
