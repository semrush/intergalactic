import React from 'react';
import Button from '@semcore/button';
import NotificationM from '@semcore/icon/Notification/m';
import Dot from '@semcore/dot';
import { AnimatedNumber } from '@semcore/counter';
import { Hint } from '@semcore/tooltip';

const notificationsCount = 18;

const Demo = () => (
  <Hint tag={Button} title={`${notificationsCount} notifications`}>
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
