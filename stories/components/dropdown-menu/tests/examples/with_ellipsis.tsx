import Badge from '@semcore/ui/badge';
import Button from '@semcore/ui/button';
import Counter from '@semcore/ui/counter';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Flags from '@semcore/ui/flags';
import DesktopIconM from '@semcore/ui/icon/Desktop/m';
import Switch from '@semcore/ui/switch';
import React from 'react';

type WithEllipsisProps = {
  addExtraItems?: boolean;
  selectable?: boolean;
  multiselect?: boolean;
};

const Demo = (props: WithEllipsisProps) => {
  const [selectedSingle, setSelectedSingle] = React.useState<number>(0);
  const [selectedMulti, setSelectedMulti] = React.useState<number[]>([0]);

  const totalItems = props.addExtraItems ? 9 : 4;

  const handleItemClick = (index: number) => {
    if (!props.selectable) return;

    if (props.multiselect) {
      if (!selectedMulti.includes(index)) {
        setSelectedMulti([...selectedMulti, index]);
      } else {
        setSelectedMulti(selectedMulti.filter((i) => i !== index));
      }
    } else {
      setSelectedSingle(index);
    }
  };

  const isSelected = (index: number) => {
    if (!props.selectable) return false;
    return props.multiselect ? selectedMulti.includes(index) : selectedSingle === index;
  };

  return (
    <DropdownMenu selectable={props.selectable} multiselect={props.multiselect}>
      <DropdownMenu.Trigger tag={Button}>Menu</DropdownMenu.Trigger>
      <DropdownMenu.Menu hMax='400px' w='200px'>
        <DropdownMenu.Group title='Menu title' subTitle='Subtitle'>
          <DropdownMenu.Item selected={isSelected(0)} onClick={() => handleItemClick(0)}>
            <DropdownMenu.Item.Text w='100%' ellipsis hintProps={{ placement: 'right' }}>Menu item 1 with long long long text</DropdownMenu.Item.Text>
          </DropdownMenu.Item>
          <DropdownMenu.Item size='l' selected={isSelected(1)} onClick={() => handleItemClick(1)}>
            <DropdownMenu.Item.Content w='100%'>
              <DropdownMenu.Item.Text>Menu item L 2 with long long long text</DropdownMenu.Item.Text>
            </DropdownMenu.Item.Content>
            <DropdownMenu.Item.Hint>Hint for menu item 2  with long long</DropdownMenu.Item.Hint>
          </DropdownMenu.Item>
          <DropdownMenu.Item selected={isSelected(2)} onClick={() => handleItemClick(2)}>
            <DropdownMenu.Item.Content w='100%'>
              <DropdownMenu.Item.Addon>
                <DesktopIconM />
              </DropdownMenu.Item.Addon>
              <DropdownMenu.Item.Text ellipsis hintProps={{ placement: 'right' }}>Menu item 3 with long long long text</DropdownMenu.Item.Text>
            </DropdownMenu.Item.Content>
            <DropdownMenu.Item.Hint> <DropdownMenu.Item.Text ellipsis hintProps={{ visible: false }}>Hint item 3 with long long long text</DropdownMenu.Item.Text></DropdownMenu.Item.Hint>
          </DropdownMenu.Item>
          <DropdownMenu.Item selected={isSelected(3)} onClick={() => handleItemClick(3)}>
            <DropdownMenu.Item.Content>
              <DropdownMenu.Item.Addon>
                <DesktopIconM />
              </DropdownMenu.Item.Addon>
              <DropdownMenu.Item.Text>Menu item 4</DropdownMenu.Item.Text>
            </DropdownMenu.Item.Content>
          </DropdownMenu.Item>
          {props.addExtraItems && (
            <>
              <DropdownMenu.Item selected={isSelected(4)} onClick={() => handleItemClick(4)}>
                <DropdownMenu.Item.Text w='100%' ellipsis>Menu item 5 with long long long text</DropdownMenu.Item.Text>
              </DropdownMenu.Item>
              <DropdownMenu.Item selected={isSelected(5)} onClick={() => handleItemClick(5)}>
                <DropdownMenu.Item.Content w='100%'>
                  <DropdownMenu.Item.Addon>
                    <DesktopIconM />
                  </DropdownMenu.Item.Addon>
                  <DropdownMenu.Item.Text ellipsis>Menu item 6 with long long long text</DropdownMenu.Item.Text>
                </DropdownMenu.Item.Content>
              </DropdownMenu.Item>
              <DropdownMenu.Item selected={isSelected(6)} onClick={() => handleItemClick(6)}>
                <DropdownMenu.Item.Text w='100%' ellipsis>Menu item 7 with long long long text</DropdownMenu.Item.Text>
              </DropdownMenu.Item>
              <DropdownMenu.Item selected={isSelected(7)} onClick={() => handleItemClick(7)}>
                <DropdownMenu.Item.Content w='100%'>
                  <DropdownMenu.Item.Text ellipsis>Menu item 8 with long long long text</DropdownMenu.Item.Text>
                </DropdownMenu.Item.Content>
              </DropdownMenu.Item>
              <DropdownMenu.Item selected={isSelected(8)} onClick={() => handleItemClick(8)}>
                <DropdownMenu.Item.Text w='100%' ellipsis>Menu item 9 with long long long text</DropdownMenu.Item.Text>
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Group>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

export const defaultProps: WithEllipsisProps = {
  addExtraItems: false,
  selectable: false,
  multiselect: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
