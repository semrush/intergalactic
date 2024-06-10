import React from 'react';
import Button from 'intergalactic/button';
import NotificationM from 'intergalactic/icon/Notification/m';
import Dot from 'intergalactic/dot';
import { AnimatedNumber } from 'intergalactic/counter';
import { Hint } from 'intergalactic/tooltip';

const notificationsCount = 18;

const Demo = () => (
  <Hint tag={Button} title='Notifications' aria-label={`${notificationsCount} notifications`}>
    <Button.Addon>
      <NotificationM />
      <Dot up>
        <AnimatedNumber
          initValue={10}
          value={notificationsCount}
          duration={1000}
          delay={500}
          formatValue={(x) => Math.round(x).toString()}
        />
      </Dot>
    </Button.Addon>
  </Hint>
);

export default Demo;
