import React from 'react';
import Button from '@semcore/ui/button';
import NotificationXS from '@semcore/ui/icon/Notification/m';
import Dot from '@semcore/ui/dot';
import { AnimatedNumber } from '@semcore/ui/counter';

export default () => (
  <Button aria-label='Open notifications'>
    <Button.Addon>
      <NotificationXS />
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
