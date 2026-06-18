import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [overflow, setOverflow] = React.useState('visible');
  const [visible, setVisible] = React.useState(false);

  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => setVisible(false), []);

  React.useEffect(() => {
    document.body.style.overflow = overflow;
  }, [overflow]);

  return (
    <React.Fragment>
      <Flex gap={2} direction='column'>
        <Text>Current overflow value: {overflow}</Text>
        <Button
          onClick={() => {
            setOverflow((prevValue) => prevValue === 'visible' ? 'hidden' : 'visible');
          }}
        >
          Toggle body overflow
        </Button>
        <Button onClick={handleOpen}>Open modal</Button>
      </Flex>

      <Modal visible={visible} onClose={handleClose}>
        <Modal.Title>Do you want to save your changes?</Modal.Title>
        <Text size={200} mb={4} tag='p'>
          Your changes will be lost if you don't save them.
        </Text>
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
