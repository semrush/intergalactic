import React from "react";
import Button from "@semcore/button";
import Modal from "@semcore/modal";
import { Text } from "@semcore/typography";
import TrashIcon from "@semcore/icon/Trash/m";

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const [isVisibleButton, setIsVisibleButton] = React.useState(true);
  const handleOpen = React.useCallback(() => setVisible(true), []);
  const handleClose = React.useCallback(() => setVisible(false), []);

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal visible={visible} onClose={handleClose}>
        <Modal.Title>Do you want to save your chasadengesdsds?</Modal.Title>

        <Text size={200} mb={4} tag="p">
          Your changes will be lost if you don't save them.
          {isVisibleButton && (
            <TrashIcon
              interactive
              color="gray-300"
              onClick={() => setIsVisibleButton(false)}
              onKeyDown={() => setIsVisibleButton(false)}
              type="button"
            />
          )}
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

export const App = () => <Demo />;
