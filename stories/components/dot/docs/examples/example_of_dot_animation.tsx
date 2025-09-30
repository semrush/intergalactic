import Button from '@semcore/ui/button';
import Dot from '@semcore/ui/dot';
import NotificationM from '@semcore/ui/icon/Notification/m';
import React from 'react';

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
