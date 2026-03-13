import { FilterTrigger } from '@semcore/ui/base-trigger';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import React from 'react';

function Demo() {
  return (
    <div className='App'>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <div>Dropdown items with ellpisis</div>
        <DropdownMenu>
          <DropdownMenu.Trigger tag={FilterTrigger}>
            Dropdown Trigger
          </DropdownMenu.Trigger>
          <DropdownMenu.Popper aria-label='Dropdown'>
            <DropdownMenu.List w={280}>
              <DropdownMenu.Item>
                <DropdownMenu.Item.Content>
                  <DropdownMenu.Item.Text ellipsis>
                    Lorem, ipsum dolor sit amet consectetur
                  </DropdownMenu.Item.Text>
                </DropdownMenu.Item.Content>
              </DropdownMenu.Item>
            </DropdownMenu.List>
          </DropdownMenu.Popper>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Demo;
