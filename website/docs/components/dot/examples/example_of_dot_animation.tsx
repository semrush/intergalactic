import React from 'react';
import NotificationM from '@semcore/icon/Notification/m';
import Button from '@semcore/button';
import Dot from '@semcore/dot';
import { Hint } from '@semcore/tooltip';

const Demo = () => {
  const [dotVisible, setDotVisible] = React.useState(true);

  React.useEffect(() => {
    if (dotVisible) return;
    const timeoutId = setTimeout(() => setDotVisible(true), 3000);
    return () => clearTimeout(timeoutId);
  }, [dotVisible]);
  const handleClick = React.useCallback(() => setDotVisible(false), []);

  return (
    <Hint tag={Button} onClick={handleClick} title='Notifications'>
      <Button.Addon>
        <NotificationM />
        <Dot up hidden={!dotVisible} size='l' />
      </Button.Addon>
    </Hint>
  );
};

export default Demo;
