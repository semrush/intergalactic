import React from 'react';
import DropdownMenu from 'intergalactic/dropdown-menu';
import Select from 'intergalactic/select';
import Input from 'intergalactic/input';
import MathPlusM from 'intergalactic/icon/MathPlus/m';
import { Hint } from '@semcore/ui/tooltip';
import { Flex } from 'intergalactic/flex-box';
import Button, { ButtonLink } from 'intergalactic/button';
import { FilterTrigger } from 'intergalactic/base-trigger';
import CloseM from 'intergalactic/icon/Close/m';
import SearchM from 'intergalactic/icon/Search/m';

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [size, setSize] = React.useState('');

  return (
    <Flex gap={2} flexWrap>
      <Input w={160}>
        <Input.Addon>
          <SearchM />
        </Input.Addon>
        <Input.Value
          value={value}
          onChange={setValue}
          placeholder='Filter by name'
          aria-label='Filter by name'
        />
        {value && (
          <Input.Addon>
            <Hint
              tag={ButtonLink}
              use='secondary'
              addonLeft={CloseM}
              title='Clear'
              onClick={() => setValue('')}
            />
          </Input.Addon>
        )}
      </Input>
      <Select onChange={setSize}>
        <Select.Trigger placeholder='Size' tag={FilterTrigger}>
          Size: {size}
        </Select.Trigger>
        <Select.Menu>
          {sizes.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select.Menu>
      </Select>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={Button} use='tertiary' addonLeft={MathPlusM}>
          Add filter
        </DropdownMenu.Trigger>
        <DropdownMenu.Menu>
          {filters.map((item) => (
            <DropdownMenu.Item key={item.name}>{item.name}</DropdownMenu.Item>
          ))}
        </DropdownMenu.Menu>
      </DropdownMenu>
      <Button use='tertiary' theme='muted' addonLeft={CloseM} ml='auto'>
        Clear filters
      </Button>
    </Flex>
  );
};

const filters = [
  {
    name: 'Colors',
    values: ['Blue', 'Gray', 'Green', 'Orange', 'Pink', 'Red', 'Salad', 'Violet', 'Yellow'],
  },
  { name: 'Materials', values: ['Glass', 'Metal', 'Paper', 'Wood'] },
  { name: 'Shapes', values: ['Circle', 'Rectangle', 'Star', 'Triangle'] },
];

const sizes = ['Small', 'Medium', 'Large'];

export default Demo;
