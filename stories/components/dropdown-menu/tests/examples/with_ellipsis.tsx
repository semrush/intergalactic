import Badge from '@semcore/ui/badge';
import Button from '@semcore/ui/button';
import Counter from '@semcore/ui/counter';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Flags from '@semcore/ui/flags';
import DesktopIconM from '@semcore/ui/icon/Desktop/m';
import Switch from '@semcore/ui/switch';
import React from 'react';

const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={Button}>Menu</DropdownMenu.Trigger>
      <DropdownMenu.Menu hMax='400px' w='200px'>
        <DropdownMenu.Group title='Menu title' subTitle='Subtitle'>
          <DropdownMenu.Item>
            <DropdownMenu.Item.Text w='100%' ellipsis>Menu item 1 with long long long text</DropdownMenu.Item.Text>
          </DropdownMenu.Item>
          <DropdownMenu.Item size='l'>
            <DropdownMenu.Item.Content w='100%'>
              <DropdownMenu.Item.Text>Menu item L 2 with long long long text</DropdownMenu.Item.Text>
            </DropdownMenu.Item.Content>
            <DropdownMenu.Item.Hint>Hint for menu item 2</DropdownMenu.Item.Hint>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <DropdownMenu.Item.Content w='100%'>
              <DropdownMenu.Item.Addon>
                <DesktopIconM />
              </DropdownMenu.Item.Addon>
              <DropdownMenu.Item.Text ellipsis>Menu item 3 with long long long text</DropdownMenu.Item.Text>
            </DropdownMenu.Item.Content>
            <DropdownMenu.Item.Hint>Hint for menu item 3</DropdownMenu.Item.Hint>
          </DropdownMenu.Item>
          <DropdownMenu.Item>

            <DropdownMenu.Item.Content>
              <DropdownMenu.Item.Addon>
                <DesktopIconM />
              </DropdownMenu.Item.Addon>
              <DropdownMenu.Item.Text>Menu item 4</DropdownMenu.Item.Text>
            </DropdownMenu.Item.Content>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default Demo;
