import React from 'react';
import Radio, { RadioGroup } from 'intergalactic/radio';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  const [value, setValue] = React.useState('1');
  return (
    <div>
      <RadioGroup name='radio' value={value} onChange={(v) => setValue(v)}>
        <div role='radiogroup' aria-labelledby='radioGroup'>
          <Text tag='p' id='radioGroup' size={200}>
            Select value
          </Text>
          <Flex mt={2} direction={'column'}>
            <Radio mb={3} value={'1'} label={'Value 1'} />
            <Radio mb={3} value={'2'} label={'Value 2'} />
            <Radio mb={3} value={'3'} label={'Value 3'} />
          </Flex>
        </div>
      </RadioGroup>
    </div>
  );
};

export default Demo;
