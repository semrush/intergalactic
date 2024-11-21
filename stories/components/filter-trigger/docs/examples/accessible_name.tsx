import React from 'react';
import { FilterTrigger } from '@semcore/base-trigger';
import Select from '@semcore/select';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Ellipsis from '@semcore/ellipsis';

const Demo = () => {
  const [shape, setShape] = React.useState('');
  const [material, setMaterial] = React.useState([]);

  return (
    <Flex gap={2} alignItems='end' flexWrap>
      <Flex direction='column'>
        <Text tag='label' htmlFor='controlled-filter' size={200}>
          Controlled filter
        </Text>
        <Select>
          <Select.Trigger tag={FilterTrigger} id='controlled-filter' />
          <Select.Menu aria-label={'Controlled filter'}>
            {options.map((option, idx) => {
              const { title } = option;
              return (
                <Select.Option value={title} key={idx}>
                  {title}
                </Select.Option>
              );
            })}
          </Select.Menu>
        </Select>
      </Flex>
      <Select
        options={languages}
        tag={FilterTrigger}
        placeholder='Language'
        aria-label='Language'
      />
      <Select onChange={setShape}>
        <Select.Trigger tag={FilterTrigger} placeholder='Shape' aria-label='Shape' wMax={146}>
          <FilterTrigger.Text tag={Ellipsis}>
            <span aria-hidden>Shape: </span>
            {shape}
          </FilterTrigger.Text>
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
const options = Array(6)
  .fill(0)
  .map((i, idx) => ({
    title: `Option ${idx}`,
  }));

export default Demo;
