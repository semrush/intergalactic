import React from 'react';
import Button from '@semcore/ui/button';
import NotificationXS from '@semcore/ui/icon/Notification/m';
import Dot from '@semcore/ui/dot';

export default () => (
  <Button aria-label="3 notifications">
    <Button.Addon>
      <NotificationXS />
      <Dot up aria-label="You have unread notifications">
        3
      </Dot>
    </Button.Addon>
  </Button>
);
