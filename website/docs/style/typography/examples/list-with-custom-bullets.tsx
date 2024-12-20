import React from 'react';
import { List } from 'intergalactic/typography';
import CheckM from 'intergalactic/icon/Check/m';

const Demo = () => (
  <div>
    <List size={300} marker={<CheckM color='icon-secondary-success' mt={1} />}>
      <List.Item>I'm gonna make him an offer he can't refuse.</List.Item>
      <List.Item marker={<CheckM color='icon-secondary-neutral' mt={1} />}>
        (Unchecked icon) Carpe diem. Seize the day, boys. Make your lives extraordinary.
      </List.Item>
      <List.Item>Listen to them. Children of the night. What music they make.</List.Item>
    </List>
  </div>
);

export default Demo;
