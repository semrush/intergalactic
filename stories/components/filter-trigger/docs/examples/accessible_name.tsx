import React from 'react';
import { FilterTrigger } from '@semcore/base-trigger';
import Select from '@semcore/select';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  const [material, setMaterial] = React.useState([]);

  return (
    <Flex gap={2}>
      <Select>
        <Select.Trigger tag={FilterTrigger} placeholder='Language' aria-label='Language' />
        <Select.Menu aria-label='Language'>
          {languages.map((option, idx) => (
            <Select.Option key={idx} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select.Menu>
      </Select>
      <Select onChange={setMaterial} multiselect>
        <Select.Trigger tag={FilterTrigger} placeholder='Material' aria-label='Material'>
          <span aria-hidden>Material: </span>
          {material.length === 1 ? material : `${material.length} selected`}
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
    </Flex>
  );
};

const languages = [
  'Chinese',
  'English',
  'French',
  'German',
  'Italian',
  'Korean',
  'Spanish',
  'Turkish',
];
const materials = ['Glass', 'Metal', 'Paper', 'Wood'];

export default Demo;
