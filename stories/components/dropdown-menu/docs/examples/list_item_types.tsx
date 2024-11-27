import React from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';
import Tooltip from '@semcore/tooltip';
import DesktopIconM from '@semcore/icon/Desktop/m';

const TooltipContent = () => {
  const tooltipIndex = React.useContext(DropdownMenu.selectedIndexContext);

  return <div>Some tooltip for {tooltipIndex + 1}</div>;
};

const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={Button}>Explore menu item types</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <Tooltip placement={'right'} timeout={[0, 50]}>
          <DropdownMenu.Group title={'Menu title'} subTitle={'Subtitle'}>
            <DropdownMenu.Item tag={Tooltip.Trigger}>
              <DropdownMenu.Item.Content>Menu item 1</DropdownMenu.Item.Content>
            </DropdownMenu.Item>
            <DropdownMenu.Item tag={Tooltip.Trigger}>
              <DropdownMenu.Item.Content>Menu item 2</DropdownMenu.Item.Content>
              <DropdownMenu.Item.Hint>Hint for menu item 2</DropdownMenu.Item.Hint>
            </DropdownMenu.Item>
            <DropdownMenu.Item tag={Tooltip.Trigger}>
              <DropdownMenu.Item.Content>
                <DropdownMenu.Item.Addon>
                  <DesktopIconM />
                </DropdownMenu.Item.Addon>
                <DropdownMenu.Item.Text>Menu item 3</DropdownMenu.Item.Text>
              </DropdownMenu.Item.Content>
              <DropdownMenu.Item.Hint>Hint for menu item 3</DropdownMenu.Item.Hint>
            </DropdownMenu.Item>
            <DropdownMenu.Item tag={Tooltip.Trigger}>
              <DropdownMenu.Item.Content>Menu item 4</DropdownMenu.Item.Content>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <Tooltip.Popper w={120} aria-hidden={true}>
            <TooltipContent />
          </Tooltip.Popper>
        </Tooltip>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export default Demo;
