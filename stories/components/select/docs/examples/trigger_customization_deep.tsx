import React from 'react';
import Select from '@semcore/select';
import { Flex } from '@semcore/flex-box';
import Flags, { iso2Name, FlagsIso2 } from '@semcore/flags';
import { Text } from '@semcore/typography';

const formatName = (name?: string) => name?.replace(/([a-z])([A-Z])/g, '$1 $2');
const flags = Object.keys(iso2Name) as FlagsIso2[];

const Demo = () => {
  const [value, setValue] = React.useState<FlagsIso2 | undefined>(undefined);

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='language-select'>
        Country
      </Text>
      <Select onChange={(v: FlagsIso2) => setValue(v)}>
        <Select.Trigger mt={2} mr='auto' id='language-select'>
          <Select.Trigger.Addon>
            <Flags iso2={value} />
          </Select.Trigger.Addon>
          <Select.Trigger.Text>{value ? formatName(iso2Name[value]) : ''}</Select.Trigger.Text>
        </Select.Trigger>
        <Select.Menu hMax={180}>
          {flags.map((value) => (
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
