import React from 'react';
import Button from '@semcore/button';
import NotificationXS from '@semcore/icon/Notification/m';
import Dot from '@semcore/dot';

export default () => (
  <Button label="3 notifications">
    <Button.Addon>
      <NotificationXS />
      <Dot up>3</Dot>
    </Button.Addon>
  </Button>
);
