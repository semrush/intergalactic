import Button from '@semcore/button';
import FullscreenModal from '@semcore/fullscreen-modal';
import React from 'react';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open FullscreenModal</Button>
      <FullscreenModal visible={visible} onClose={() => setVisible(false)}>
        <FullscreenModal.Close />
        <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
        <FullscreenModal.Header title='Modal Window Title' description='Additional information' />
        <FullscreenModal.Footer />
      </FullscreenModal>
    </>
  );
};

export default Demo;
