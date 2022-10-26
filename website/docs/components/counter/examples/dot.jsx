import React from 'react';
import Button from '@semcore/button';
import NotificationXS from '@semcore/icon/Notification/m';
import Dot from '@semcore/dot';

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
