import Button from '@semcore/button';
import FullscreenModal from '@semcore/fullscreen-modal';
import React from 'react';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open FullscreenModal</Button>

      <FullscreenModal disablePortal visible={visible} onClose={() => setVisible(false)}>
        <FullscreenModal.Close />
        <FullscreenModal.Header />
        <FullscreenModal.Body>
          <FullscreenModal.Section aria-label='Head content 1'>
            Head content 1
          </FullscreenModal.Section>
          <FullscreenModal.Section style={{ background: '#ccc', overflow: 'auto' }} aria-label='Head content 1'>
            <div style={{ height: '1000px' }}>
              <h4>Head content 2</h4>
            </div>
          </FullscreenModal.Section>
        </FullscreenModal.Body>
        <FullscreenModal.Footer>Footer</FullscreenModal.Footer>
      </FullscreenModal>
    </>
  );
};

export default Demo;
