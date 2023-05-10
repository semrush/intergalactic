import React, { useState } from 'react';
import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const [secondVisible, setSecondVisible] = useState(false);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const handleSecondOpen = () => setSecondVisible(true);
  const handleSecondClose = () => setSecondVisible(false);

  return (
    <>
      <Button use="primary" onClick={handleOpen}>
        Open modal
      </Button>
      <Modal visible={visible} onClose={handleClose}>
        <Text size={200} mb={3} tag="p">
          Open one more window
        </Text>
        <Button use="primary" onClick={handleSecondOpen}>
          Open modal
        </Button>
      </Modal>
      <Modal visible={secondVisible} onClose={handleSecondClose}>
        <Text size={200} mb={3} tag="p">
          Your changes will be lost if you don't save them.
        </Text>
        <Button use="primary" theme="success" onClick={handleSecondClose}>
          Save changes
        </Button>
        <Button ml={2} onClick={handleSecondClose}>
          Cancel
        </Button>
      </Modal>
    </>
  );
};

export default Demo;
