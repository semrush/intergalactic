import React from 'react';
import Select from 'intergalactic/select';
import { Flex } from 'intergalactic/flex-box';
import Flags, { iso2Name } from 'intergalactic/flags';
import { Text } from 'intergalactic/typography';

const formatName = (name) => name?.replace(/([a-z])([A-Z])/g, '$1 $2');

const Demo = () => {
  const [value, setValue] = React.useState(null);

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='language-select'>
        Language select
      </Text>
      <Select onChange={setValue} placeholder='Select country'>
        <Select.Trigger mt={2} mr='auto' id='language-select'>
          <Select.Trigger.Addon>
            <Flags iso2={value} />
          </Select.Trigger.Addon>
          <Select.Trigger.Text>{formatName(iso2Name[value])}</Select.Trigger.Text>
        </Select.Trigger>
        <Select.Menu hMax={180}>
          {Object.keys(iso2Name).map((value) => (
            <Select.Option key={value} value={value}>
              <Flags iso2={value as keyof typeof iso2Name} mr={2} />
              {formatName(iso2Name[value])}
            </Select.Option>
          ))}
        </Select.Menu>
      </Select>
    </Flex>
  );
};

export default Demo;
