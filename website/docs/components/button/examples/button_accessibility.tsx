import React from 'react';
import Button from 'intergalactic/button';
import CheckM from 'intergalactic/icon/Check/m';
import CloseM from 'intergalactic/icon/Close/m';

const Demo = () => {
  return (
    <>
      <Button addonLeft={CheckM} aria-label='Confirm action' mr={2} />
      <Button addonLeft={CloseM} aria-label='Close notification' />
    </>
  );
};

export default Demo;
