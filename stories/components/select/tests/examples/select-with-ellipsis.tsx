import { Flex } from '@semcore/ui/base-components';
import type { NSFlags } from '@semcore/ui/flags';
import { iso2Name } from '@semcore/ui/flags';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type SelectWithEllipsisProps = {
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  hintProps?: false;
};

const formatName = (name?: string) => name?.replace(/([a-z])([A-Z])/g, '$1 $2');
const flags = Object.keys(iso2Name) as NSFlags.Iso2Code[];

const Demo = (props: SelectWithEllipsisProps) => {
  const [value, setValue] = React.useState<NSFlags.Iso2Code | undefined>(undefined);

  return (
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='language-select'>
        Country
      </Text>
      <Select onChange={(v: NSFlags.Iso2Code) => setValue(v)}>
        <Select.Trigger mt={2} mr='auto' id='language-select'>
          {value ? formatName(iso2Name[value]) : ''}
        </Select.Trigger>
        <Select.Menu hMax={180}>
          {flags.map((value) => (
            <Select.Option key={value} value={value}>
              <Select.Option.Text
                ellipsis
                wMax={150}
                hint={props.hintProps}
                hint:placement={props.hintPlacement}
              >
                {formatName(iso2Name[value])}
              </Select.Option.Text>
            </Select.Option>
          ))}
        </Select.Menu>
      </Select>
    </Flex>
  );
};

export const defaultProps: SelectWithEllipsisProps = {};

Demo.defaultProps = defaultProps;

export default Demo;
