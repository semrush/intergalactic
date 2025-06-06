import React from 'react';
import DropdownMenu from '@semcore/dropdown-menu';
import Button from '@semcore/button';
import Tooltip from '@semcore/tooltip';
import Badge from '@semcore/badge';
import DesktopIconM from '@semcore/icon/Desktop/m';
import Flags, { iso2Name, type FlagsIso2 } from '@semcore/flags';
import Counter, { AnimatedNumber } from '@semcore/counter';
import Switch from '@semcore/switch';

const TooltipContent = () => {
  const tooltipIndex = React.useContext(DropdownMenu.selectedIndexContext);

  return (
    <div>
      Some tooltip for
      {tooltipIndex + 1}
    </div>
  );
};

const Demo = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={Button}>Explore menu item types</DropdownMenu.Trigger>
      <DropdownMenu.Menu hMax='400px'>
        <Tooltip placement='right' timeout={[0, 50]}>
          <DropdownMenu.Group title='Menu title' subTitle='Subtitle'>
            <DropdownMenu.Item tag={Tooltip.Trigger}>Menu item 1</DropdownMenu.Item>
            <DropdownMenu.Item tag={Tooltip.Trigger} size='l'>
              <DropdownMenu.Item.Content>Menu item L 2</DropdownMenu.Item.Content>
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

              <DropdownMenu.Item.Content>
                <DropdownMenu.Item.Addon>
                  <DesktopIconM />
                </DropdownMenu.Item.Addon>
                <DropdownMenu.Item.Text>Menu item 4</DropdownMenu.Item.Text>
              </DropdownMenu.Item.Content>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <DropdownMenu.Item.Content>
                <DropdownMenu.Item.Text>Menu item 5</DropdownMenu.Item.Text>
                <DropdownMenu.Item.Addon>
                  <Badge bg='blue-400'>admin</Badge>
                </DropdownMenu.Item.Addon>
              </DropdownMenu.Item.Content>
            </DropdownMenu.Item>

            <DropdownMenu.Item>
              <DropdownMenu.Item.Content>
                <DropdownMenu.Item.Addon>
                  <Flags name='USA' mb={2} />
                </DropdownMenu.Item.Addon>
                <DropdownMenu.Item.Text>Menu item 6</DropdownMenu.Item.Text>
              </DropdownMenu.Item.Content>
            </DropdownMenu.Item>

            <DropdownMenu.Item>
              <DropdownMenu.Item.Content>
                <DropdownMenu.Item.Text>Menu item 7</DropdownMenu.Item.Text>
                <DropdownMenu.Item.Addon>
                  <Counter>23</Counter>
                </DropdownMenu.Item.Addon>
              </DropdownMenu.Item.Content>
            </DropdownMenu.Item>

            <DropdownMenu.Item>
              <DropdownMenu.Item.Content>
                <DropdownMenu.Item.Text>Menu item 7</DropdownMenu.Item.Text>
                <DropdownMenu.Item.Addon>
                  <Switch size='l' theme='success'>
                    <Switch.Value defaultChecked={true} ml={0} />
                  </Switch>
                </DropdownMenu.Item.Addon>
              </DropdownMenu.Item.Content>
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
