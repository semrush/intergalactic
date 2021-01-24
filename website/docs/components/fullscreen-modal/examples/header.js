import React, { useState } from 'react';
import FullscreenModal from '@semcore/fullscreen-modal';
import Button from '@semcore/button';

const Demo = () => {
  const [hidden, updateHidden] = useState(true);

  const changeHiddenModal = () => {
    updateHidden((hidden) => !hidden);
  };

  return (
    <>
      <Button use="primary" onClick={changeHiddenModal}>
        Открыть окно
      </Button>
      <FullscreenModal hidden={hidden} onClose={changeHiddenModal}>
        <FullscreenModal.Close />
        <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
        <FullscreenModal.Header title="Heading 4, 25px" description="Some additional information" />
        <FullscreenModal.Footer />
      </FullscreenModal>
    </>
  );
};
export default Demo;
