import React from 'react';
import Radio, { RadioGroup } from '@semcore/radio';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('1');
  return (
    <div>
      <RadioGroup
        name='radio'
        aria-labelledby='radioGroup'
        value={value}
        onChange={(v: string) => setValue(v)}
      >
        <Text id='radioGroup' size={200}>
          Select dog breed
        </Text>
        <Flex mt={2} direction={'column'}>
          <Radio mb={3} value={'1'} label={'Labrador Retriever'} />
          <Radio mb={3} value={'2'} label={'German Shepherd'} />
          <Radio mb={3} value={'3'} label={'Beagle'} />
        </Flex>
      </RadioGroup>
    </div>
  );
};

export default Demo;
