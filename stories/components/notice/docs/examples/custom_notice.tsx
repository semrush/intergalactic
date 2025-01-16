import React from 'react';
import Notice from '@semcore/notice';
import Calendar from '@semcore/icon/Calendar/m';
import Button from '@semcore/button';

const Demo = () => (
  <Notice aria-label='Custom notice example'>
    <Notice.Label>
      <Calendar />
    </Notice.Label>
    <Notice.Content>
      <Notice.Title>Strategize your next move with daily and weekly traffic data</Notice.Title>
      <Notice.Text>
        Gather insights on your competitors' daily and weekly web traffic at no cost until April 20,
        2024.
      </Notice.Text>
      <Notice.Actions>
        <Button use='primary'>Got it</Button>
      </Notice.Actions>
    </Notice.Content>
    <Notice.Close />
  </Notice>
);

export default Demo;
