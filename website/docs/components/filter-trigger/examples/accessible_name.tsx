import React from 'react';
import { FilterTrigger } from 'intergalactic/base-trigger';
import Select from 'intergalactic/select';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  const [shape, setShape] = React.useState('');
  const [material, setMaterial] = React.useState([]);

  return (
    <Flex gap={2} alignItems='end' flexWrap>
      <Select
        options={languages}
        tag={FilterTrigger}
        placeholder='Language'
        aria-label='Language'
      />
      <Select onChange={setShape}>
        <Select.Trigger tag={FilterTrigger} placeholder='Shape' aria-label='Shape'>
          <span aria-hidden>Shape: </span>
          {shape}
        </Select.Trigger>
        <Select.Menu>
          {shapes.map((option, idx) => (
            <Select.Option value={option} key={idx}>
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
        <Select.Menu>
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
].map((item) => {
  return { value: item, children: item };
});
const materials = ['Glass', 'Metal', 'Paper', 'Wood'];
const shapes = ['Circle', 'Rectangle', 'Star', 'Triangle'];

export default Demo;
