import React from 'react';
import NotificationM from '@semcore/icon/Notification/m';
import Button from '@semcore/button';
import Dot from '@semcore/dot';

const Demo = () => {
  const [dotVisible, setDotVisible] = React.useState(true);

  React.useEffect(() => {
    if (dotVisible) return;
    const timeoutId = setTimeout(() => setDotVisible(true), 3000);
    return () => clearTimeout(timeoutId);
  }, [dotVisible]);
  const handleClick = React.useCallback(() => setDotVisible(false), []);

  return (
    <Button
      onClick={handleClick}
      title='Notifications'
      aria-describedby={dotVisible ? 'dot-desc' : undefined}
    >
      <Button.Addon>
        <NotificationM />
        <Dot up hidden={!dotVisible} size='l' aria-label='New' id='dot-desc' />
      </Button.Addon>
    </Button>
  );
};

export default Demo;
