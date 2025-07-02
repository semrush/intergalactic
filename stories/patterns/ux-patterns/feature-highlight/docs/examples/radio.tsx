import { Flex } from '@semcore/base-components';
import { RadioFH } from '@semcore/feature-highlight';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import Radio, { RadioGroup } from '@semcore/radio';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={6}>

    <RadioGroup
      name='radio'
      aria-labelledby='radioGroup'
      defaultValue={2}
    >
      <Text id='radioGroup' size={200} mb={2}>
        Highlighted radio button
      </Text>
      <Flex gap={3} direction='column'>
        <RadioFH value={1}>
          <RadioFH.Value />
          <RadioFH.AnimatedSparkles count={5} />
          <RadioFH.Text>
            First option
            <SummaryAI color='--intergalactic-icon-primary-ai' ml={2} style={{ verticalAlign: -3 }} />
          </RadioFH.Text>
        </RadioFH>
        <Radio value={2} label='Second option' />
      </Flex>
    </RadioGroup>

    <RadioGroup
      name='radio-l'
      aria-labelledby='radioGroup-l'
      size='l'
      defaultValue={1}
    >
      <Text id='radioGroup-l' size={300} mb={2}>
        Large highlighted radio button
      </Text>
      <Flex gap={3} direction='column'>
        <RadioFH value={1}>
          <RadioFH.Value />
          <RadioFH.AnimatedSparkles count={5} />
          <RadioFH.Text>
            First option
            <SummaryAI color='--intergalactic-icon-primary-ai' ml={2} style={{ verticalAlign: -2 }} />
          </RadioFH.Text>
        </RadioFH>
        <Radio value={2} label='Second option' />
      </Flex>
    </RadioGroup>

  </Flex>
);

export default Demo;
