import React from "react";
import Button from '@semcore/button';
import Modal from '@semcore/modal';
import { Text } from '@semcore/typography';
import Textarea from '@semcore/textarea';

const FAKE_DELAY = 600;

type ExternalModalComponentProps = {
  onClose: () => void;
};

const ExternalModalComponent: React.FC<ExternalModalComponentProps> = ({ onClose }) => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, FAKE_DELAY);
  }, []);

  const handleClose = React.useCallback(() => {
    setTimeout(() => {
      onClose();
    }, 500);

    setVisible(false);
  }, [onClose]);

  return (
    <Modal visible={visible} onClose={handleClose}>
      <Modal.Title>Do you want to save your changes?</Modal.Title>
      <Text size={200} mb={4} tag="p">
        Your changes will be lost if you don't save them.
      </Text>
      <Textarea autoFocus />
      <Button use="primary" theme="success" size="l" onClick={handleClose}>
        Save changes
      </Button>
      <Button size="l" ml={2} onClick={handleClose}>
        Don't save
      </Button>
    </Modal>
  );
};

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const handleOpen = React.useCallback(() => setVisible(true), []);

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open modal dynamically</Button>

      {visible ? (
        <ExternalModalComponent onClose={() => setVisible(false)} />
      ) : undefined}
    </React.Fragment>
  );
};

const Demo2 = () => {
  const [visible, setVisible] = React.useState(false);
  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => setVisible(false), []);

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal visible={visible} onClose={handleClose}>
        <Modal.Title>Do you want to save your changes?</Modal.Title>
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
