import React from 'react';
import TrashS from '@semcore/icon/Trash/m';
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
    <Button onClick={handleClick} aria-label="Remove updates">
      <TrashS />
      <Dot up hidden={!dotVisible} size="l" aria-label="You can remove updates" />
    </Button>
  );
};

export default Demo;
