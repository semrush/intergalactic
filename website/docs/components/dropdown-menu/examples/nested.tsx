import React from 'react';
import DropdownMenu from 'intergalactic/dropdown-menu';
import { ButtonTrigger } from 'intergalactic/base-trigger';
import ChevronRightIcon from 'intergalactic/icon/ChevronRight/m';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='dropdown-menu-nested'>
        Nested menus
      </Text>
      <DropdownMenu>
        <DropdownMenu.Trigger mt={2} mr='auto' id='dropdown-menu-nested' tag={ButtonTrigger}>
          Check them out
        </DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>
          <DropdownMenu.Item>Item 3</DropdownMenu.Item>
          <DropdownMenu.Item>
            <DropdownMenu placement='right' interaction='hover' timeout={[0, 300]}>
              <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                Item 4
                <DropdownMenu.Item.Addon tag={ChevronRightIcon} color='icon-secondary-neutral' />
              </DropdownMenu.Item.Content>
              <DropdownMenu.Menu w={120}>
                <DropdownMenu.Item>
                  <DropdownMenu placement='right' interaction='hover' timeout={[0, 300]}>
                    <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                      Item 4.1
                      <DropdownMenu.Item.Addon
                        tag={ChevronRightIcon}
                        color='icon-secondary-neutral'
                      />
                    </DropdownMenu.Item.Content>
                    <DropdownMenu.Menu w={120}>
                      <DropdownMenu.Item>Item 4.1.1</DropdownMenu.Item>
                      <DropdownMenu.Item>Item 4.1.2</DropdownMenu.Item>
                      <DropdownMenu.Item>Item 4.1.3</DropdownMenu.Item>
                    </DropdownMenu.Menu>
                  </DropdownMenu>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <DropdownMenu placement='right' interaction='hover' timeout={[0, 300]}>
                    <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                      Item 4.2
                      <DropdownMenu.Item.Addon
                        tag={ChevronRightIcon}
                        color='icon-secondary-neutral'
                      />
                    </DropdownMenu.Item.Content>
                    <DropdownMenu.Menu w={120}>
                      <DropdownMenu.Item>
                        <DropdownMenu placement='right' interaction='hover' timeout={[0, 300]}>
                          <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                            Item 4.2.1
                            <DropdownMenu.Item.Addon
                              tag={ChevronRightIcon}
                              color='icon-secondary-neutral'
                            />
                          </DropdownMenu.Item.Content>
                          <DropdownMenu.Menu w={120}>
                            <DropdownMenu.Item>Item 4.2.1.1</DropdownMenu.Item>
                            <DropdownMenu.Item>Item 4.2.1.2</DropdownMenu.Item>
                            <DropdownMenu.Item>Item 4.2.1.3</DropdownMenu.Item>
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
    </Flex>
  );
};

export default Demo;
