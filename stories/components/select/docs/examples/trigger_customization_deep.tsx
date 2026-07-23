import { Flex } from '@semcore/ui/base-components';
import type { FlagsIso2 } from '@semcore/ui/flags';
import Flags, { iso2Name } from '@semcore/ui/flags';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
              <Select.Option.Addon>
                <Flags iso2={value as keyof typeof iso2Name} />
              </Select.Option.Addon>
              <Select.Option.Text>
                {formatName(iso2Name[value])}
              </Select.Option.Text>
            </Select.Option>
          ))}
        </Select.Menu>
      </Select>
    </Flex>
  );
};

export default Demo;
