import { Box } from '@semcore/ui/base-components';
import CheckM from '@semcore/ui/icon/Check/m';
import { List } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => (
  <div>
    <List size={300} marker={<Box tag={CheckM} color='icon-secondary-success' mt={1} />}>
      <List.Item>List item with custom bullet.</List.Item>
      <List.Item marker={<Box tag={CheckM} color='icon-secondary-neutral' mt={1} />}>
        List item with other custom bullet.
      </List.Item>
    </List>
  </div>
);

export default Demo;
