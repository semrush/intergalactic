import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';
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
            <Text size={400} mb={2} tag='h2'>Customized modal window</Text>
            <Text size={300} mb={4} tag='p'>
              This is a customized modal window with a custom overlay and window styles. The example also uses native tags for the heading and text.
            </Text>
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
