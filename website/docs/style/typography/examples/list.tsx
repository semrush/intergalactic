import React from 'react';
import { List } from '@semcore/ui/typography';
import CheckM from '@semcore/ui/icon/Check/m';

export default () => (
  <div>
    <List size={300} marker={<CheckM color='green' mt={1} />}>
      <List.Item>I'm gonna make him an offer he can't refuse.</List.Item>
      <List.Item marker={<CheckM mt={1} />}>
        (Uncheck icon) Carpe diem. Seize the day, boys. Make your lives extraordinary.
      </List.Item>
      <List.Item>Listen to them. Children of the night. What music they make.</List.Item>
    </List>
  </div>
);
