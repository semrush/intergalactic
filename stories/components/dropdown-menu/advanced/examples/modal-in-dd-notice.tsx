import React from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import Notice from '@semcore/notice';
import SpinContainer from '@semcore/spin-container';
import FileExportM from '@semcore/icon/FileExport/m';
import Modal from '@semcore/modal';

const Demo = () => {
  const [loading, setLoading] = React.useState(false);
  const [visibleDropdown, setVisibleDropdown] = React.useState(false);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const handleOpen = React.useCallback(() => setVisibleModal(true), []);
  const handleClose = React.useCallback(() => setVisibleModal(false), []);

  const handleClick = () => {
    setLoading(true);
    setVisibleDropdown(false);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleClickOpen = () => {
    setVisibleDropdown(false);
    handleOpen();
  };

  return (
    <>
      <DropdownMenu
        visible={visibleDropdown}
        onVisibleChange={setVisibleDropdown}
      >
        <DropdownMenu.Trigger tag={Button}>
          <Button.Addon>
            <FileExportM />
          </Button.Addon>
          <Button.Text>Export</Button.Text>
        </DropdownMenu.Trigger>
        <DropdownMenu.Popper wMax="257px" aria-labelledby="dropdown-trigger">
          <SpinContainer loading={loading}>
            <DropdownMenu.List>
              <DropdownMenu.Item onClick={handleClick}>Excel</DropdownMenu.Item>
              <DropdownMenu.Item onClick={handleClick}>CSV</DropdownMenu.Item>
              <DropdownMenu.Item onClick={handleClick}>
                CSV Semicolon
              </DropdownMenu.Item>
            </DropdownMenu.List>
            <Notice theme="warning">
              <Notice.Content>
                <Button onClick={handleOpen} use="primary">
                  Open modal
                </Button>
              </Notice.Content>
            </Notice>
          </SpinContainer>
        </DropdownMenu.Popper>
      </DropdownMenu>
      <Modal visible={visibleModal} onClose={handleClose}>
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
    </>
  );
};

export default Demo;
