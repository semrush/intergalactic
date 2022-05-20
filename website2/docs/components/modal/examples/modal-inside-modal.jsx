import React, { useState } from 'react';
import Button from '@semcore/button';
import Modal from '@semcore/modal';
import { Text } from '@semcore/typography';

const Demo = () => {
  const [visible, changeVisible] = useState(false);
  const [visibleSecond, changeVisibleSecond] = useState(false);

  const handleOpen = () => changeVisible(true);
  const handleClose = () => changeVisible(false);

  const handleSecondOpen = () => changeVisibleSecond(true);
  const handleSecondClose = () => changeVisibleSecond(false);

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
        <Modal visible={visibleSecond} onClose={handleSecondClose}>
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
      </Modal>
    </>
  );
};

export default Demo;
