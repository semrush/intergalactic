import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const overflowValues = ['visible', 'hidden', 'clip'] as const;

const Demo = () => {
  const [overflow, setOverflow] = React.useState<(typeof overflowValues)[number]>('visible');
  const [visible, setVisible] = React.useState(false);
  const [nestedVisible, setNestedVisible] = React.useState(false);

  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => setVisible(false), []);
  const handleOpenNested = React.useCallback(() => setNestedVisible(true), []);
  const handleCloseNested = React.useCallback(() => setNestedVisible(false), []);

  React.useEffect(() => {
    document.body.style.overflow = overflow;
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [overflow]);

  return (
    <React.Fragment>
      <Flex gap={2} direction='column'>
        <Text>Current overflow value: {overflow}</Text>
        <Button
          onClick={() => {
            setOverflow((prevValue) => {
              const nextIndex = (overflowValues.indexOf(prevValue) + 1) % overflowValues.length;
              return overflowValues[nextIndex];
            });
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
        <Button size='l' ml={2} onClick={handleOpenNested}>
          Open modal over modal
        </Button>
      </Modal>

      <Modal visible={nestedVisible} onClose={handleCloseNested}>
        <Modal.Title>Nested modal</Modal.Title>
        <Text size={200} mb={4} tag='p'>
          This modal is opened over another modal.
        </Text>
        <Button use='primary' theme='success' size='l' onClick={handleCloseNested}>
          Close nested modal
        </Button>
      </Modal>
    </React.Fragment>
  );
};

export default Demo;
