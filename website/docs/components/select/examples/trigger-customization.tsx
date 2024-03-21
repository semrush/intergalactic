import React from 'react';
import Select from 'intergalactic/select';
import { Flex } from 'intergalactic/flex-box';
import Flags, { iso2Name } from 'intergalactic/flags';

const formatName = (name) => name?.replace(/([a-z])([A-Z])/g, '$1 $2');

const Demo = () => {
  const [value, setValue] = React.useState(null);

  return (
    <>
      <Select onChange={setValue} placeholder='Select country'>
        <Select.Trigger w={180}>
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
      <br />
      <br />
      <Select onChange={setValue} placeholder='Select country'>
        <Select.Trigger w={'100%'}>
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
    </>
  );
};

export default Demo;
