import React from 'react';
import Button from '@semcore/button';
import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';

const Demo = () => {
  return (
    <>
      <Button addonLeft={CheckM} aria-label='Confirm action' mr={2} />
      <Button addonLeft={CloseM} aria-label='Close notification' />
    </>
  );
};

export default Demo;
