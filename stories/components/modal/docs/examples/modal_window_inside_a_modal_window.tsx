import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const [secondVisible, setSecondVisible] = React.useState(false);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const handleSecondOpen = () => setSecondVisible(true);
  const handleSecondClose = () => setSecondVisible(false);

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal visible={visible} onClose={handleClose} w='400px'>
        <Modal.Title>Open one more window</Modal.Title>
        <Text size={300} mb={3} tag='p'>
          Use this example for the cases when you need to open one more window inside the other modal window.
        </Text>
        <Button size='l' use='primary' onClick={handleSecondOpen}>
          Open modal
        </Button>
      </Modal>
      <Modal visible={secondVisible} onClose={handleSecondClose} w='360px'>
        <Modal.Title>Modal window inside a modal window</Modal.Title>
        <Text size={300} mb={3} tag='p'>
          Use this example for the cases when you need to open one more window inside the other modal window.
        </Text>
        <Button size='l' use='primary' theme='brand' onClick={handleSecondClose}>
          Close
        </Button>
      </Modal>
    </>
  );
};

export default Demo;
