

import React from 'react';
import { List } from '@semcore/typography';
import CheckM from '@semcore/icon/Check/m';

const Demo = () => (
  <div>
    <List >
        <List.Item marker = {1}>List item 1</List.Item>
        <List.Item marker = {2}>List item 2</List.Item>
        <List.Item marker = {null}>
          List item 3
          <List>
            <List.Item>List item</List.Item>
            <List.Item>
              List item
              <List>
                <List.Item>List item</List.Item>
                <List.Item>List item</List.Item>
                <List.Item>List item</List.Item>
              </List>
            </List.Item>
            <List.Item>List item</List.Item>
          </List>
        </List.Item>
        <List.Item marker="👉">
          List item 4
          </List.Item>
      </List>

      <List mb={2}>
<List.Item>I'm gonna make him an offer he can't refuse.</List.Item>
<List.Item>Carpe diem. Seize the day, boys. Make your lives extraordinary.</List.Item>
</List>
<List tag='ol'>
<List.Item>I'm gonna make him an offer he can't refuse.</List.Item>
<List.Item>Carpe diem. Seize the day, boys. Make your lives extraordinary.</List.Item>
</List>

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
