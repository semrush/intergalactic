import React from 'react';
import Button from '@semcore/button';
import NotificationXS from '@semcore/icon/lib/Notification/m';
import Dot from '@semcore/dot';

export default () => (
  <Button>
    <Button.Addon>
      <NotificationXS />
      <Dot up>3</Dot>
    </Button.Addon>
  </Button>
);
