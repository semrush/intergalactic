import React, { useState, useEffect } from 'react';
import TrashS from '@semcore/icon/Trash/m';
import Button from '@semcore/button';
import Dot from '@semcore/dot';

const Demo = () => {
  const [hidden, updateHidden] = useState(true);
  let timer = null;

  useEffect(() => {
    updateHidden(false);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClick = () => {
    updateHidden(true);
    timer = setTimeout(() => updateHidden(false), 5000);
  };

  return (
    <Button onClick={handleClick}>
      <TrashS />
      <Dot up hidden={hidden} size="l" />
    </Button>
  );
};

export default Demo;
