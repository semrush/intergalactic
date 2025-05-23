import React from 'react';
import Radio, { RadioGroup } from '@semcore/radio';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import Link from '@semcore/link';


const Demo = () => {
  const [value, setValue] = React.useState('1');
  return (
    <div>
      <RadioGroup
      size ='l'
        name='radio'
        aria-labelledby='radioGroup'
        value={value}
        onChange={(v:any) => setValue(v)}
      >
        <Text id='radioGroup' size={200}>
        The 
        </Text>
        <Flex mt={2} direction={'column'}>
          <Radio mb={3} value={'1'} label={'Labrador Retriever'}>
          <Radio.Value  />
          <Radio.Text> The <Link data-testid = 'link1' href='https://en.wikipedia.org/wiki/Peregrine_falcon'>peregrine falcon</Link>{' '}
            is the fastest bird, and the fastest member of the animal kingdom, with a diving speed
            of over 300 km/h (190 mph).</Radio.Text>
          </Radio>
          <Radio mb={3} value={'2'} label={'German Shepherd'}>
          <Radio.Value  />
          <Radio.Text> The <Link data-testid = 'link2' href='https://en.wikipedia.org/wiki/Peregrine_falcon'>peregrine falcon</Link>{' '}
            is the fastest bird, and the fastest member of the animal kingdom, with a diving speed
            of over 300 km/h (190 mph).</Radio.Text>
          </Radio>
         
          <Radio mb={3} value={'3'} label={'Beagle'} />
        </Flex>
      </RadioGroup>
    </div>
  );
};

export default Demo;
