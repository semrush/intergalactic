import Calendar from '@semcore/icon/Calendar/l';
import Button from '@semcore/ui/button';
import Notice, { type NSNotice } from '@semcore/ui/notice';
import React from 'react';

const Demo = (props: NSNotice.Props) => (
  <Notice aria-label='Custom notice example' {...props} icon={<Calendar />} illustration={undefined}>
    <Notice.Content>
      <Notice.Title size={400}>
        Strategize your next move with daily and weekly traffic data
      </Notice.Title>
      <Notice.Text size={300}>
        Gather insights on your competitors' daily and weekly web traffic at no cost until the next
        month.
      </Notice.Text>
      <Notice.Actions>
        <Button use='primary' size='l'>
          Got it!
        </Button>
      </Notice.Actions>
    </Notice.Content>
    <Notice.Close size='l' />
  </Notice>
);

export default Demo;
