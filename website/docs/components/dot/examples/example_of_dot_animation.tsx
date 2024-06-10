import React from 'react';
import NotificationM from 'intergalactic/icon/Notification/m';
import Button from 'intergalactic/button';
import Dot from 'intergalactic/dot';

const Demo = () => {
  const [dotVisible, setDotVisible] = React.useState(true);

  React.useEffect(() => {
    if (dotVisible) return;
    const timeoutId = setTimeout(() => setDotVisible(true), 3000);
    return () => clearTimeout(timeoutId);
  }, [dotVisible]);
  const handleClick = React.useCallback(() => setDotVisible(false), []);

  return (
    <Button onClick={handleClick} aria-label='Notifications'>
      <NotificationM />
      <Dot up hidden={!dotVisible} size='l' aria-label='You have notifications to read' />
    </Button>
  );
};

export default Demo;
