import React, { useState } from 'react';
import FullscreenModal from '@semcore/ui/fullscreen-modal';
import Button from '@semcore/ui/button';

const Demo = () => {
  const [visible, updateVisible] = useState(false);

  const changeModalVisibility = () => {
    updateVisible((visible) => !visible);
  };

  return (
    <>
      <Button use="primary" onClick={changeModalVisibility}>
        Open fullscreen window
      </Button>
      <FullscreenModal visible={visible} onClose={changeModalVisibility}>
        <FullscreenModal.Close />
        <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
        <FullscreenModal.Header title="Heading 2, 25px" description="Some additional information" />
        <FullscreenModal.Footer />
      </FullscreenModal>
    </>
  );
};
export default Demo;
