import React from 'react';
import FullscreenModal from '@semcore/fullscreen-modal';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div style={{ width: '785px', height: '600px' }}>
    <FullscreenModal disablePortal visible>
      <FullscreenModal.Close />
      <FullscreenModal.Back>Go to Tool Name</FullscreenModal.Back>
  
        <FullscreenModal.Header title='Modal Window Title' description='Additional information' w={300}/>
        <FullscreenModal.Body>
          <FullscreenModal.Section>
           Content Title
          </FullscreenModal.Section>
          <FullscreenModal.Section style={{ background: '#eee', overflow: 'auto' }} h={1000}>
            <div >
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
