import { Flex } from '@semcore/ui/base-components';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import type { NSRadio } from '@semcore/ui/radio';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = (props: NSRadio.Group.Props) => {
  const [value, setValue] = React.useState('1');
  return (
    <div>
      <RadioGroup

        name='radio'
        aria-labelledby='radioGroup'
        value={value}
        onChange={(v: string) => setValue(v)}
        size={props.size}
        disabled={props.disabled}
        theme={props.theme}
      >
        <Text id='radioGroup' size={200}>
          Select dog breed
        </Text>
        <Flex mt={2} direction='column'>
          <Radio mb={3} value='1' label='Labrador Retriever' />
          <Radio mb={3} value='2' label='German Shepherd' />
          <Radio mb={3} value='3' label='Beagle' />
        </Flex>
      </RadioGroup>
    </div>
  );
};

export const defaultProps: NSRadio.Group.Props = {
  size: 'm',
  theme: undefined,
  disabled: false,
};

Demo.defaultProps = defaultProps;
export default Demo;
