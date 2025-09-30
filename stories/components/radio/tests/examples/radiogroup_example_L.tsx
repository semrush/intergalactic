import { Flex } from '@semcore/ui/flex-box';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [value, setValue] = React.useState('1');
  return (
    <div>
      <RadioGroup
        size='l'
        name='radio'
        aria-labelledby='radioGroup'
        value={value}
        onChange={(v: any) => setValue(v)}
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

export default Demo;
