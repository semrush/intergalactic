import React from 'react';
import Button from '@semcore/ui/button';
import NotificationXS from '@semcore/ui/icon/Notification/m';
import Dot from '@semcore/ui/dot';
import { AnimatedNumber } from '@semcore/ui/counter';

export default () => (
  <Button aria-label="3 notifications">
    <Button.Addon>
      <NotificationXS />
      <Dot up aria-label="You have unread notifications">
        <AnimatedNumber
          initValue={10}
          value={18}
          duration={1000}
          delay={500}
          formatValue={Math.round}
        />
      </Dot>
    </Button.Addon>
  </Button>
);
