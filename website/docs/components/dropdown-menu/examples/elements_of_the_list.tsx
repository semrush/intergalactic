import React from 'react';
import DropdownMenu from 'intergalactic/dropdown-menu';
import { ButtonTrigger } from 'intergalactic/base-trigger';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import Tooltip from 'intergalactic/tooltip';
import TrashM from 'intergalactic/icon/Trash/m';
import PlusM from 'intergalactic/icon/MathPlus/m';

const TooltipContent = () => {
  const tooltipIndex = React.useContext(DropdownMenu.selectedIndexContext);

  return <div>Some tooltip for {tooltipIndex + 1}</div>;
};

const Demo = () => {
  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='dropdown-menu-elements-of-the-list-2'>
        Elements of the list
      </Text>
      <DropdownMenu>
        <DropdownMenu.Trigger
          tag={ButtonTrigger}
          mt={2}
          mr='auto'
          id='dropdown-menu-elements-of-the-list-2'
        >
          I'll show u some options, buddy
        </DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          <Tooltip placement={'right'} timeout={[50, 50]}>
            {({ getPopperProps }) => {
              const { id: popperId } = getPopperProps();

              return (
                <>
                  <DropdownMenu.Group title={"I'm title"} subTitle={"I'm subtitle"}>
                    <DropdownMenu.Item tag={Tooltip.Trigger}>Item 1</DropdownMenu.Item>
                    <DropdownMenu.Item tag={Tooltip.Trigger}>
                      <DropdownMenu.Item.Content aria-describedby={popperId as string}>
                        Item 2
                      </DropdownMenu.Item.Content>
                      <DropdownMenu.Item.Hint>Hint for item 2</DropdownMenu.Item.Hint>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item tag={Tooltip.Trigger}>
                      <DropdownMenu.Item.Content aria-describedby={popperId as string}>
                        Item 3
                      </DropdownMenu.Item.Content>
                      <DropdownMenu.Item.Hint>Hint for item 3</DropdownMenu.Item.Hint>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item tag={Tooltip.Trigger}>
                      <Flex justifyContent='space-between'>
                        <DropdownMenu.Item.Content aria-describedby={popperId as string}>
                          Item 4
                        </DropdownMenu.Item.Content>
                        <Flex>
                          <DropdownMenu.Item.Button addonLeft={PlusM} aria-label={'Add new'} />
                          <DropdownMenu.Item.Button addonLeft={TrashM} aria-label={'Delete'} />
                        </Flex>
                      </Flex>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item tag={Tooltip.Trigger}>Item 5</DropdownMenu.Item>
                  </DropdownMenu.Group>
                  <Tooltip.Popper w={200} aria-hidden={true}>
                    <TooltipContent />
                  </Tooltip.Popper>
                </>
              );
            }}
          </Tooltip>
        </DropdownMenu.Menu>
      </DropdownMenu>
    </Flex>
  );
};

export default Demo;
