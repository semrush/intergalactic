import React, { useState, useEffect } from 'react';
import Button from '@semcore/button';
import Modal from '@semcore/modal';
import { Text } from '@semcore/typography';
import SpinContainer from '@semcore/spin-container';

const Demo = () => {
  const [visible, changeVisible] = useState(false);
  const [loading, changeLoding] = useState(false);
  const handleOpen = () => changeVisible(true);
  const handleClose = () => changeVisible(false);

  useEffect(() => {
    let timeOut = null;
    if (visible) {
      changeLoding(true);
      timeOut = setTimeout(() => {
        changeLoding(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [visible]);

  return (
    <React.Fragment>
      <Button use="primary" onClick={handleOpen}>
        Open modal
      </Button>
      <Modal visible={visible} onClose={handleClose}>
        <Text tag="h2" size={400} mb={4}>
          Do you want to save your changes?
        </Text>
        <SpinContainer loading={loading}>
          <Text size={200} mb={3} tag="p">
            Your changes will be lost if you don't save them.
          </Text>
          <Button use="primary" theme="success" onClick={handleClose}>
            Save changes
          </Button>
          <Button ml={2} onClick={handleClose}>
            Cancel
          </Button>
        </SpinContainer>
      </Modal>
    </React.Fragment>
  );
};
export default Demo;
