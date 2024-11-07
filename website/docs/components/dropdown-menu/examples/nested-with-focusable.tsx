import React from 'react';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import ChevronRightIcon from '@semcore/ui/icon/ChevronRight/m';
import InputNumber from '@semcore/ui/input-number';
import NeighborLocation from '@semcore/ui/neighbor-location';
import Divider from '@semcore/ui/divider';
import { Box } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';

const options = ['Item 1', 'Item 2', 'Item 3'];
const min = 1;
const max = 8;

const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={ButtonTrigger}>Click me</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        {options.map((item) => {
          return (
            <DropdownMenu.Item key={item}>
              <DropdownMenu
                placement='right-start'
                interaction='hover'
                timeout={[0, 300]}
                offset={[-11, 12]}
              >
                <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                  {item}
                  <DropdownMenu.Item.Addon tag={ChevronRightIcon} color='icon-secondary-neutral' />
                </DropdownMenu.Item.Content>
                <DropdownMenu.Popper w={150} aria-label={'Some item 4 options and controls'}>
                  <DropdownMenu.List>
                    <DropdownMenu.Item>Item 4.1.1</DropdownMenu.Item>
                    <DropdownMenu.Item>Item 4.1.2</DropdownMenu.Item>
                    <DropdownMenu.Item>Item 4.1.3</DropdownMenu.Item>
                  </DropdownMenu.List>
                  <Divider my={1} />
                  <Box p={2}>
                    <NeighborLocation>
                      <InputNumber w='50%'>
                        <InputNumber.Value min={min} max={max} placeholder={min.toString()} />
                        <InputNumber.Controls />
                      </InputNumber>
                      <InputNumber w='50%'>
                        <InputNumber.Value min={min} max={max} placeholder={max.toString()} />
                        <InputNumber.Controls />
                      </InputNumber>
                    </NeighborLocation>
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
