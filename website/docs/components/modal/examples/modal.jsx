import React from 'react';
import Button from '@semcore/button';
import Modal from '@semcore/modal';
import { Text } from '@semcore/typography';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => setVisible(false), []);

  return (
    <React.Fragment>
      <Button use="primary" onClick={handleOpen}>
        Open modal
      </Button>
      <Modal visible={visible} onClose={handleClose}>
        <Text tag="h2" size={400} mb={2}>
          Do you want to save your changes?
        </Text>
        <Text size={200} mb={4} tag="p">
          Your changes will be lost if you don't save them.
        </Text>
        <Button use="primary" theme="success" size="l" onClick={handleClose}>
          Save changes
        </Button>
        <Button size="l" ml={2} onClick={handleClose}>
          Don't save
        </Button>
      </Modal>
    </React.Fragment>
  );
};
export default Demo;
