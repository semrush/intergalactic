import React from 'react';
import DropdownMenu, { DDMenu } from 'intergalactic/dropdown-menu';
import { ButtonTrigger } from 'intergalactic/base-trigger';
import { Text } from 'intergalactic/typography';
import { Flex, Box } from 'intergalactic/flex-box';
import Tooltip from 'intergalactic/tooltip';
import TrashM from 'intergalactic/icon/Trash/m';
import PlusM from 'intergalactic/icon/MathPlus/m';

const TooltipContent = () => {
  const tooltipIndex = React.useContext(DropdownMenu.selectedIndexContext);

  return <div>Some tooltip for {tooltipIndex + 1}</div>;
};

const TooltipContentDD = () => {
  const tooltipIndex = React.useContext(DDMenu.selectedIndexContext);

  return <div>Some tooltip for {tooltipIndex + 1}</div>;
};

const Demo = () => {
  return (
    <Box>
      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='dropdown-menu-elements-of-the-list'>
          Elements of the list
        </Text>
        <DropdownMenu>
          <DropdownMenu.Trigger
            tag={ButtonTrigger}
            mt={2}
            mr='auto'
            id='dropdown-menu-elements-of-the-list'
          >
            I'll show u some options, buddy
          </DropdownMenu.Trigger>
          <DropdownMenu.Menu>
            <Tooltip placement={'right'} timeout={[0, 50]}>
              {({ getPopperProps }) => {
                const { id: popperId } = getPopperProps();

                return (
                  <>
                    <DropdownMenu.Group title={"I'm title"} subTitle={"I'm subtitle"}>
                      <DropdownMenu.Item
                        tag={Tooltip.Trigger}
                        aria-describedby={popperId as string}
                      >
                        Item 1
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        tag={Tooltip.Trigger}
                        aria-describedby={popperId as string}
                      >
                        <DropdownMenu.Item.Content>Item 2</DropdownMenu.Item.Content>
                        <DropdownMenu.Item.Hint>Hint for item 2</DropdownMenu.Item.Hint>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        tag={Tooltip.Trigger}
                        aria-describedby={popperId as string}
                      >
                        <DropdownMenu.Item.Content>Item 3</DropdownMenu.Item.Content>
                        <DropdownMenu.Item.Hint>Hint for item 3</DropdownMenu.Item.Hint>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        tag={Tooltip.Trigger}
                        aria-describedby={popperId as string}
                      >
                        <Flex justifyContent='space-between'>
                          <DropdownMenu.Item.Content>Item 4</DropdownMenu.Item.Content>
                          <Flex>
                            <DropdownMenu.Item.Button addonLeft={PlusM} aria-label={'Add new'} />
                            <DropdownMenu.Item.Button addonLeft={TrashM} aria-label={'Delete'} />
                          </Flex>
                        </Flex>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        tag={Tooltip.Trigger}
                        aria-describedby={popperId as string}
                      >
                        Item 5
                      </DropdownMenu.Item>
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

      <br />

      <Flex direction='column'>
        <Text tag='label' size={200} htmlFor='dropdown-menu-elements-of-the-list-2'>
          Elements of the list
        </Text>
        <DDMenu>
          <DDMenu.Trigger
            tag={ButtonTrigger}
            mt={2}
            mr='auto'
            id='dropdown-menu-elements-of-the-list-2'
          >
            I'll show u some options, buddy
          </DDMenu.Trigger>
          <DDMenu.Menu>
            <Tooltip placement={'right'} timeout={[0, 50]}>
              {({ getPopperProps }) => {
                const { id: popperId } = getPopperProps();

                return (
                  <>
                    <DDMenu.Group title={"I'm title"} subTitle={"I'm subtitle"}>
                      <DDMenu.Item tag={Tooltip.Trigger} aria-describedby={popperId as string}>
                        Item 1
                      </DDMenu.Item>
                      <DDMenu.Item tag={Tooltip.Trigger} aria-describedby={popperId as string}>
                        <DDMenu.Item.Content>Item 2</DDMenu.Item.Content>
                        <DDMenu.Item.Hint>Hint for item 2</DDMenu.Item.Hint>
                      </DDMenu.Item>
                      <DDMenu.Item tag={Tooltip.Trigger} aria-describedby={popperId as string}>
                        <DDMenu.Item.Content>Item 3</DDMenu.Item.Content>
                        <DDMenu.Item.Hint>Hint for item 3</DDMenu.Item.Hint>
                      </DDMenu.Item>
                      <DDMenu.Item tag={Tooltip.Trigger} aria-describedby={popperId as string}>
                        <Flex justifyContent='space-between'>
                          <DDMenu.Item.Content>Item 4</DDMenu.Item.Content>
                          <Flex>
                            <DDMenu.Item.Button addonLeft={PlusM} aria-label={'Add new'} />
                            <DDMenu.Item.Button addonLeft={TrashM} aria-label={'Delete'} />
                          </Flex>
                        </Flex>
                      </DDMenu.Item>
                      <DDMenu.Item tag={Tooltip.Trigger} aria-describedby={popperId as string}>
                        Item 5
                      </DDMenu.Item>
                    </DDMenu.Group>
                    <Tooltip.Popper w={200} aria-hidden={true}>
                      <TooltipContentDD />
                    </Tooltip.Popper>
                  </>
                );
              }}
            </Tooltip>
          </DDMenu.Menu>
        </DDMenu>
      </Flex>
    </Box>
  );
};

export default Demo;
