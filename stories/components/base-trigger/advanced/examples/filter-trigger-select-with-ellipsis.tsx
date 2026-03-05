import { Flex } from '@semcore/ui/base-components';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import Select from '@semcore/ui/select';
import React from 'react';

const Demo = () => {
  const [material, setMaterial] = React.useState([]);
  const [color, setColor] = React.useState([]);

  return (
    <>
      <Flex gap={2}>
        <Select onChange={setMaterial} multiselect>
          <Select.Trigger
            tag={FilterTrigger}
            placeholder='Material'
            aria-label='Material'
          >
            <FilterTrigger.Text
              wMax={80}
              ellipsis={{ cropPosition: 'middle' }}
              key={material.length}
            >
              <span aria-hidden='true'>Material: </span>
              {material.length === 1 ? material : `${material.length} selected`}
            </FilterTrigger.Text>
          </Select.Trigger>

          <Select.Menu aria-label='Material'>
            {materials.map((option, idx) => (
              <Select.Option value={option} key={idx}>
                <Select.Option.Checkbox />
                {option}
              </Select.Option>
            ))}
          </Select.Menu>
        </Select>

        <Select onChange={setColor} multiselect>
          <Select.Trigger
            tag={FilterTrigger}
            placeholder='Color'
            aria-label='Color'
          >
            <FilterTrigger.Text
              wMax={40}
              ellipsis
              key={color.length}
            >
              <span aria-hidden='true'>Color: </span>
              {color.length === 1 ? color : `${color.length} selected`}
            </FilterTrigger.Text>
          </Select.Trigger>
          <Select.Menu aria-label='Color'>
            {colors.map((option, idx) => (
              <Select.Option value={option} key={idx}>
                <Select.Option.Checkbox />
                {option}
              </Select.Option>
            ))}
          </Select.Menu>
        </Select>
      </Flex>
    </>
  );
};

const materials = ['Glass 123', 'Metal 123', 'Paper', 'Wood'];
const colors = ['Red', 'Blue 123', 'Green', 'Yellow 123'];

export default Demo;
