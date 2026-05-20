import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';
import React, { useState } from 'react';

const overlayStyles = { background: 'oklch(from var(--intergalactic-brand-primary) l c h / 0.5)' };

const Demo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open modal</Button>
      <Modal visible={visible} closable={false} onClose={() => setVisible(false)}>
        <Modal.Overlay style={overlayStyles}>
          <Modal.Window wMax='400px' px={5} py={5}>
            <Modal.Close />
            <h2>Customized modal window</h2>
            <p>
              This is a customized modal window with a custom overlay and window styles. The example also uses native tags for the heading and text.
            </p>
            <Button size='l' use='primary' theme='brand' onClick={() => setVisible(false)}>
              Close
            </Button>
          </Modal.Window>
        </Modal.Overlay>
      </Modal>
    </>
  );
};

export default Demo;
