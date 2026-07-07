import FullscreenModal from '@semcore/ui/fullscreen-modal';
import React from 'react';

const Demo = () => {
  return (
    <div style={{ width: '785px', height: '600px' }}>
      <FullscreenModal disablePortal visible>
        <FullscreenModal.Close />
        <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>

        <FullscreenModal.Header title='Modal Window Title' description='Additional information' />
        <FullscreenModal.Body>
          <FullscreenModal.Section>
            Content Title
          </FullscreenModal.Section>
          <FullscreenModal.Section style={{ background: 'var(--intergalactic-bg-secondary-neutral)', overflow: 'auto' }} h={1000}>
            <div>
              Content Title
            </div>
          </FullscreenModal.Section>
        </FullscreenModal.Body>
        <FullscreenModal.Footer>Footer</FullscreenModal.Footer>
      </FullscreenModal>
    </div>
  );
};

export default Demo;
