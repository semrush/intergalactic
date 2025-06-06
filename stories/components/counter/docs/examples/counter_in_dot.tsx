import Button from '@semcore/button';
import { AnimatedNumber } from '@semcore/counter';
import Dot from '@semcore/dot';
import NotificationM from '@semcore/icon/Notification/m';
import React from 'react';

const notificationsCount = 18;

const Demo = () => (
  <Button title='Notifications' aria-describedby='notification-count'>
    <Button.Addon>
      <NotificationM />
      <Dot up>
        <AnimatedNumber
          initValue={10}
          value={notificationsCount}
          duration={1000}
          delay={500}
          formatValue={(x) => Math.round(x).toString()}
          id='notification-count'
        />
      </Dot>
    </Button.Addon>
  </Button>
);

export default Demo;
