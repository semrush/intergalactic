import React from 'react';
import Button from '@semcore/button';
import Modal from '@semcore/modal';
import { Text } from '@semcore/typography';

const html = 'data:text/html,' + encodeURIComponent('<html><body><input /></body></html>');

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => setVisible(false), []);

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Duration 500 Delay 500</Button>
      <Modal visible={visible} onClose={handleClose} duration ={500} delay = {500} >
        <Modal.Title>Do you want to save your changes?</Modal.Title>
        <Text size={200} mb={4} tag='p'>
          Your changes will be lost if you don't save them.
        </Text>
        <iframe title={'test iframe in modal'} src={html} />
        <Button use='primary' theme='success' size='l' onClick={handleClose}>
          Save changes
        </Button>
        <Button size='l' ml={2} onClick={handleClose}>
          Don't save
        </Button>
      </Modal>
    </React.Fragment>
  );
};

export default Demo;
