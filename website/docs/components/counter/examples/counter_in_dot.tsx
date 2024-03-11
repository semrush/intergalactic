import React from 'react';
import Button from 'intergalactic/button';
import NotificationM from 'intergalactic/icon/Notification/m';
import Dot from 'intergalactic/dot';
import { AnimatedNumber } from 'intergalactic/counter';

const Demo = () => (
  <Button aria-label='Open notifications'>
    <Button.Addon>
      <NotificationM />
      <Dot up aria-labelledby='notifications-counter'>
        <AnimatedNumber
          id='notifications-counter'
          aria-label='You have 18 unread notifications'
          initValue={10}
          value={18}
          duration={1000}
          delay={500}
          formatValue={(x) => Math.round(x).toString()}
        />
      </Dot>
    </Button.Addon>
  </Button>
);

export default Demo;
