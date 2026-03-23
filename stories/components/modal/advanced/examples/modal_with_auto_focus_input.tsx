import Button from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import Modal from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const html = 'data:text/html,' + encodeURIComponent('<html><body><input /></body></html>');

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => setVisible(false), []);

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal visible={visible} onClose={handleClose}>
        <Modal.Title>Do you want to save your changes?</Modal.Title>
        <Text size={200} mb={4} tag='p'>
          Your changes will be lost if you don't save them.
        </Text>
        <Input mb={2} size='l' w='100%'>
          <Input.Value autoFocus />
        </Input>
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
