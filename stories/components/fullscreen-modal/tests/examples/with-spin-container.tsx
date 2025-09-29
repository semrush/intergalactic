import Button from '@semcore/ui/button';
import FullscreenModal from '@semcore/ui/fullscreen-modal';
import SpinContainer from '@semcore/ui/spin-container';
import React from 'react';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open FullscreenModal</Button>

      <FullscreenModal disablePortal visible={visible} onClose={() => setVisible(false)}>
        <FullscreenModal.Close />
        <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
        <FullscreenModal.Header title='Modal Window Title' description='Additional information' />
        <FullscreenModal.Footer />

        <SpinContainer loading size='xxl' aria-live='polite' role='status' h={500}>
          <FullscreenModal.Body>

            <FullscreenModal.Section aria-label='Head content 1'>

            </FullscreenModal.Section>

          </FullscreenModal.Body>
        </SpinContainer>

      </FullscreenModal>
    </>
  );
};

export default Demo;
