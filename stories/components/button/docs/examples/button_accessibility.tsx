import CheckM from '@semcore/icon/Check/m';
import CloseM from '@semcore/icon/Close/m';
import Button from '@semcore/ui/button';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Button addonLeft={CheckM} aria-label='Confirm action' mr={2} />
      <Button addonLeft={CloseM} aria-label='Close notification' />
    </>
  );
};

export default Demo;
