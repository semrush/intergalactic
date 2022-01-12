import React from 'react';
import { List } from '@semcore/typography';
import CheckS from '@semcore/icon/Check/m';

export default () => (
  <div>
    <List size={300} marker={<CheckS color="green" />}>
      <List.Item>I'm gonna make him an offer he can't refuse.</List.Item>
      <List.Item marker={<CheckS />}>
        (Uncheck icon) Carpe diem. Seize the day, boys. Make your lives extraordinary.
      </List.Item>
      <List.Item>Listen to them. Children of the night. What music they make.</List.Item>
    </List>
  </div>
);
