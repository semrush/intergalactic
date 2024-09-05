import React from 'react';
import DropdownMenu from 'intergalactic/dropdown-menu';
import Button from 'intergalactic/button';
import Tooltip from 'intergalactic/tooltip';

const TooltipContent = () => {
  const tooltipIndex = React.useContext(DropdownMenu.selectedIndexContext);

  return <div>Some tooltip for {tooltipIndex + 1}</div>;
};

const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={Button}>Check the options</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <Tooltip placement={'right'} timeout={[0, 50]}>
          <DropdownMenu.Group title={'Title'} subTitle={'Subtitle'}>
            <DropdownMenu.Item tag={Tooltip.Trigger}>
              <DropdownMenu.Item.Content>Item 1</DropdownMenu.Item.Content>
            </DropdownMenu.Item>
            <DropdownMenu.Item tag={Tooltip.Trigger}>
              <DropdownMenu.Item.Content>Item 2</DropdownMenu.Item.Content>
              <DropdownMenu.Item.Hint>Hint for item 2</DropdownMenu.Item.Hint>
            </DropdownMenu.Item>
            <DropdownMenu.Item tag={Tooltip.Trigger}>
              <DropdownMenu.Item.Content>Item 3</DropdownMenu.Item.Content>
              <DropdownMenu.Item.Hint>Hint for item 3</DropdownMenu.Item.Hint>
            </DropdownMenu.Item>
            <DropdownMenu.Item tag={Tooltip.Trigger}>
              <DropdownMenu.Item.Content>Item 4</DropdownMenu.Item.Content>
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
