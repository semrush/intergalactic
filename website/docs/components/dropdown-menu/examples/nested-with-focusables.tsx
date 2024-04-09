import React from 'react';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import ChevronRightIcon from '@semcore/ui/icon/ChevronRight/m';
import InputNumber from '@semcore/ui/input-number';
import NeighborLocation from '@semcore/ui/neighbor-location';
import Divider from '@semcore/ui/divider';
import { Flex, Box } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import Tooltip from '@semcore/ui/tooltip';
import InfoM from '@semcore/ui/icon/Info/m';

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
            <DropdownMenu.Nesting key={item}>
              <DropdownMenu placement='right' interaction='hover' timeout={[0, 300]}>
                <DropdownMenu.Nesting.Item>
                  <Box mr={1}>{item}</Box>
                  <Tooltip
                    mr={5}
                    tag={InfoM}
                    color='icon-secondary-neutral'
                    interactive
                    title='Test tooltip text'
                  />
                  <DropdownMenu.Trigger tag={DropdownMenu.Nesting.Trigger}>
                    <DropdownMenu.Nesting.Addon
                      tag={ChevronRightIcon}
                      color='icon-secondary-neutral'
                    />
                  </DropdownMenu.Trigger>
                </DropdownMenu.Nesting.Item>
                <DropdownMenu.Popper w={150}>
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
            </DropdownMenu.Nesting>
          );
        })}
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default Demo;

export const App = () => <Demo />;
