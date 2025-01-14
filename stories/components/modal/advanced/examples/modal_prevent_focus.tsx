import React from "react";
import Modal from "@semcore/modal";
import { Text } from "@semcore/typography";

const html =
  "data:text/html," + encodeURIComponent("<html><body><input /></body></html>");

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => setVisible(false), []);

  return (
    <React.Fragment>
      <button onClick={handleOpen}>Open modal</button>
      <Modal visible={visible} onClose={handleClose}>
        <Modal.Title>Do you want to save your changes?</Modal.Title>
        <Text size={200} mb={4} tag="p">
          Your changes will be lost if you don't save them.
        </Text>
        <iframe role="presentation" src={html} />
        <button onClick={handleClose}>Save changes</button>
      </Modal>
    </React.Fragment>
  );
};

export default Demo;
