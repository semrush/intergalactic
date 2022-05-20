import React, { PureComponent } from 'react';
import Select from '@semcore/select';
import DropdownMenu from '@semcore/dropdown-menu';
import { Text } from '@semcore/typography';

const optionValues = ['Text', 'Image', 'Form', 'Frame'];

class Demo extends PureComponent {
  render() {
    return (
      <Select multiselect>
        <Select.Trigger />
        <Select.Menu>
          {({ value }, action) => {
            const selectAll = !!optionValues.filter((v) => value.includes(v)).length;
            return (
              <>
                <DropdownMenu.Item onClick={() => action.value(selectAll ? [] : optionValues)}>
                  <Text color="denim-blue">{!selectAll ? 'Select' : 'Deselect'} all</Text>
                </DropdownMenu.Item>
                {optionValues.map((value) => (
                  <Select.OptionCheckbox value={value} key={value}>
                    {value}
                  </Select.OptionCheckbox>
                ))}
              </>
            );
          }}
        </Select.Menu>
      </Select>
    );
  }
}

export default Demo;
