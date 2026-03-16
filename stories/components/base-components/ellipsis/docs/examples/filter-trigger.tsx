import { FilterTrigger } from '@semcore/ui/base-trigger';
import Select from '@semcore/ui/select';
import React from 'react';

const Demo = () => {
  const [material, setMaterial] = React.useState([]);

  return (
    <>
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
    </>
  );
};

const materials = ['Glass', 'Metal', 'Paper', 'Wood'];

export default Demo;
