import React, { useState } from 'react';
import Select from '@semcore/select';
import { Flex } from '@semcore/flex-box';
import Flags, { iso2Name } from '@semcore/flags';

const formatName = (name) => name?.replace(/([a-z])([A-Z])/g, '$1 $2');

export default () => {
  const [value, setValue] = useState(null);

  return (
    <Flex>
      <Select onChange={setValue} placeholder="Select country">
        <Select.Trigger w={180}>
          <Select.Trigger.Addon>
            <Flags iso2={value} />
          </Select.Trigger.Addon>
          <Select.Trigger.Text>{formatName(iso2Name[value])}</Select.Trigger.Text>
        </Select.Trigger>
        <Select.Menu hMax={180}>
          {Object.keys(iso2Name).map((value) => (
            <Select.Option key={value} value={value}>
              <Flags iso2={value} mr={2} />
              {formatName(iso2Name[value])}
            </Select.Option>
          ))}
        </Select.Menu>
      </Select>
    </Flex>
  );
};
