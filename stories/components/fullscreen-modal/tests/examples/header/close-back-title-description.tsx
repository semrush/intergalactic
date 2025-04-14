import React from 'react';
import FullscreenModal from '@semcore/fullscreen-modal';
import Button from '@semcore/button';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
    <Button onClick={() => setVisible(true)}>Open FullscreenModal</Button>
   
    <FullscreenModal disablePortal visible={visible} onClose={() => setVisible(false)}>
      <FullscreenModal.Close />
      <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
      <FullscreenModal.Header title='Modal Window Title Modal Window Title Modal Window Title Modal Window Title Modal Window Title Modal Window Title Modal Window Title Modal Window Title Modal Window Title Modal Window Title Modal Window Title Modal Window Title v' description='Additional information' />
      <FullscreenModal.Body>
        <FullscreenModal.Section aria-label = 'Head content 1'>
          Head content 1
        </FullscreenModal.Section>
      </FullscreenModal.Body>
      <FullscreenModal.Footer>Footer</FullscreenModal.Footer>
    </FullscreenModal>
    </>
  );
};

export default Demo;
