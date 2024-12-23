import React, { useCallback, useState } from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';
import ChevronRightIcon from '@semcore/icon/ChevronRight/m';
import Modal from '@semcore/ui/modal';

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

const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={Button}>Nested menus</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <DropdownMenu.Item>Item 1</DropdownMenu.Item>
        <DropdownMenu.Item>Item 2</DropdownMenu.Item>
        <DropdownMenu.Item>Item 3</DropdownMenu.Item>
        <DropdownMenu.Item>
          <DropdownMenu
            placement='right-start'
            interaction={DropdownMenu.nestedMenuInteraction}
            timeout={[0, 300]}
            offset={[-11, 12]}
          >
            <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
              Item 4
              <DropdownMenu.Item.Addon tag={ChevronRightIcon} color='icon-secondary-neutral' />
            </DropdownMenu.Item.Content>
            <DropdownMenu.Menu w={120}>
              <DropdownMenu.Item>
                <DropdownMenu
                  placement='right-start'
                  interaction={DropdownMenu.nestedMenuInteraction}
                  timeout={[0, 300]}
                  offset={[-11, 12]}
                >
                  <DropdownMenu.Item.Content>Item 4.1</DropdownMenu.Item.Content>
                </DropdownMenu>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <DropdownMenu
                  placement='right-start'
                  interaction={DropdownMenu.nestedMenuInteraction}
                  timeout={[0, 300]}
                  offset={[-11, 12]}
                >
                  <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                    Item 4.2
                    <DropdownMenu.Item.Addon
                      tag={ChevronRightIcon}
                      color='icon-secondary-neutral'
                    />
                  </DropdownMenu.Item.Content>
                  <DropdownMenu.Menu w={120}>
                    <DropdownMenu.Item>
                      <DropdownMenu
                        placement='right-start'
                        interaction={DropdownMenu.nestedMenuInteraction}
                        timeout={[0, 300]}
                        offset={[-11, 12]}
                      >
                        <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                          Item 4.2.1
                          <DropdownMenu.Item.Addon
                            tag={ChevronRightIcon}
                            color='icon-secondary-neutral'
                          />
                        </DropdownMenu.Item.Content>
                        <DropdownMenu.Menu w={120}>
                          <SomeFeatureComponent />
                        </DropdownMenu.Menu>
                      </DropdownMenu>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>Item 4.2.2</DropdownMenu.Item>
                    <DropdownMenu.Item>Item 4.2.3</DropdownMenu.Item>
                  </DropdownMenu.Menu>
                </DropdownMenu>
              </DropdownMenu.Item>
              <DropdownMenu.Item>Item 4.3</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
        </DropdownMenu.Item>
        <DropdownMenu.Item>Item 5</DropdownMenu.Item>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default Demo;
