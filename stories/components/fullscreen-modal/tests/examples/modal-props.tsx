import React from 'react';
import FullscreenModal from '@semcore/fullscreen-modal';
import Button from '@semcore/button';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open FullscreenModal</Button>
      <FullscreenModal visible={visible} onClose={() => setVisible(false)} closable = {true} duration ={500}  aria-describedby="my-modal-description">
        <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
        <FullscreenModal.Header
          title="Modal Window Title"
          description={
            <FullscreenModal.Description id="my-modal-description">
              Additional information
            </FullscreenModal.Description>
          }
          w={300}
        />    
       <FullscreenModal.Body/>
        <FullscreenModal.Footer />
      </FullscreenModal>
    </>
  );
};

export default Demo;
