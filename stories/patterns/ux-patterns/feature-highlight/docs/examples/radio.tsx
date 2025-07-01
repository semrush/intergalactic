import { RadioAF } from '@semcore/accent-feature';
import { Flex } from '@semcore/base-components';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import Radio, { RadioGroup } from '@semcore/radio';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={6}>

    <RadioGroup
      name='radio'
      aria-labelledby='radioGroup'
    >
      <Text id='radioGroup' size={200} mb={2}>
        Highlighted radio button
      </Text>
      <Flex gap={3} direction='column'>
        <RadioAF value={1}>
          <RadioAF.Value />
          <RadioAF.Text>
            First option
            <SummaryAI color='icon-primary-ai' ml={2} style={{ verticalAlign: -3 }} />
          </RadioAF.Text>
          <RadioAF.AnimatedSparkles count={5} />
        </RadioAF>
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
        <RadioAF value={1}>
          <RadioAF.Value />
          <RadioAF.AnimatedSparkles count={5} />
          <RadioAF.Text>
            First option
            <SummaryAI color='icon-primary-ai' ml={2} style={{ verticalAlign: -2 }} />
          </RadioAF.Text>
        </RadioAF>
        <Radio value={2} label='Second option' />
      </Flex>
    </RadioGroup>

  </Flex>
);

export default Demo;
