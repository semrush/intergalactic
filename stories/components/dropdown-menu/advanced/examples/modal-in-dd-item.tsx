import React, { useCallback, useState } from 'react';
import Button from '@semcore/ui/button';
import Modal from '@semcore/ui/modal';
import DropdownMenu from '@semcore/ui/dropdown-menu';

function SomeFeatureComponent() {
  const [visible, setVisible] = useState(false);
  const handleOpen = useCallback(() => setVisible(true), []);
  const handleClose = useCallback(() => setVisible(false), []);

  return (
    <>
      <DropdownMenu.Item onClick={handleOpen}>Open modal</DropdownMenu.Item>
      <Modal visible={visible} onClose={handleClose} ignorePortalsStacking w={300} h={300}>
        <Modal.Title>Title</Modal.Title>

        <DropdownMenu>
          <DropdownMenu.Trigger tag={Button}>Open menu</DropdownMenu.Trigger>
          <DropdownMenu.Menu>
            <DropdownMenu.Item>One</DropdownMenu.Item>
            <DropdownMenu.Item>Two</DropdownMenu.Item>
          </DropdownMenu.Menu>
        </DropdownMenu>

        <Button size='l'>Save</Button>
      </Modal>
    </>
  );
}

export default function App() {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={Button}>Open menu</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <SomeFeatureComponent />
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
}
