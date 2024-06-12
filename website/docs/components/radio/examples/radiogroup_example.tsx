import React from 'react';
import Radio, { RadioGroup } from 'intergalactic/radio';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('1');
  return (
    <div>
      <RadioGroup name='radio' aria-labelledby='radioGroup' value={value} onChange={(v) => setValue(v)}>
          <Text tag='p' id='radioGroup' size={200}>
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
