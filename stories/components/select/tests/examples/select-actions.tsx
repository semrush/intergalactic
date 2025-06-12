import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import ChevronRightIcon from '@semcore/icon/ChevronRight/m';
import PlusM from '@semcore/icon/MathPlus/m';
import TrashM from '@semcore/icon/Trash/m';
import Select from '@semcore/select';
import React from 'react';

const Demo = () => {
  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Select>
      <Select.Trigger>Explore menu items with actions</Select.Trigger>
      <Select.Menu>
        <Select.Option value='1'>Menu item 1</Select.Option>
        <Select.Option value='2'>Menu item 2</Select.Option>

        <Select.Option value='3'>
          <Select.Option.Content>
            <Flex justifyContent='space-between' alignItems='center'>
              <span>Menu item 3</span>
              <Flex gap={1}>
                <Button
                  size='m'
                  onClick={handleActionClick}
                  addonLeft={PlusM}
                  title='Add new'
                />
                <Button
                  size='m'
                  onClick={handleActionClick}
                  addonLeft={TrashM}
                  title='Delete'
                />
              </Flex>
            </Flex>
          </Select.Option.Content>
        </Select.Option>

        <Select.Option value='4'>
          <Select.Option.Content>
            <Flex justifyContent='space-between' alignItems='center'>
              <span>Menu item 4</span>
              <ChevronRightIcon color='icon-secondary-neutral' />
            </Flex>
          </Select.Option.Content>
          <Select.Option.Hint>Click for more actions</Select.Option.Hint>
        </Select.Option>
      </Select.Menu>
    </Select>
  );
};

export default Demo;
