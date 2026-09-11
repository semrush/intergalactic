import ChevronRightIcon from '@semcore/icon/ChevronRight/m';
import { Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Divider from '@semcore/ui/divider';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import InputNumber from '@semcore/ui/input-number';
import React from 'react';

const options = ['Item 1', 'Item 2', 'Item 3'];
const min = 1;
const max = 8;

const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={Button}>Explore nested menus</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        {options.map((item) => {
          return (
            <DropdownMenu.Item key={item}>
              <DropdownMenu
                placement='right-start'
                interaction={DropdownMenu.nestedMenuInteraction}
                timeout={[0, 300]}
                offset={[-11, 17]}
              >
                <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                  {item}
                  <DropdownMenu.Item.Addon tag={ChevronRightIcon} color='icon-secondary-neutral' />
                </DropdownMenu.Item.Content>
                <DropdownMenu.Popper w={150} aria-label='Submenu with controls'>
                  <DropdownMenu.List>
                    <DropdownMenu.Item>Item 4.1.1</DropdownMenu.Item>
                    <DropdownMenu.Item>Item 4.1.2</DropdownMenu.Item>
                    <DropdownMenu.Item>Item 4.1.3</DropdownMenu.Item>
                  </DropdownMenu.List>
                  <Divider my={1} />
                  <Box px={3} py={2}>
                    <InputNumber w='50%' neighborLocation='right'>
                      <InputNumber.Value min={min} max={max} placeholder={min.toString()} />
                      <InputNumber.Controls />
                    </InputNumber>
                    <InputNumber w='50%' neighborLocation='left'>
                      <InputNumber.Value min={min} max={max} placeholder={max.toString()} />
                      <InputNumber.Controls />
                    </InputNumber>
                    <Button w='100%' mt={1} use='primary'>
                      Apply
                    </Button>
                  </Box>
                </DropdownMenu.Popper>
              </DropdownMenu>
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default Demo;

export const App = () => <Demo />;
