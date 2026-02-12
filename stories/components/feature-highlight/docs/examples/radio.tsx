import SummaryAI from '@semcore/icon/SummaryAI/m';
import { Box, Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import { RadioFH, BadgeFH } from '@semcore/ui/feature-highlight';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import { Text } from '@semcore/ui/typography';
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
      <Flex gap={3} direction='column' alignItems='start'>
        <RadioFH value={1}>
          <RadioFH.Value>
            <Radio.Value.Control aria-describedby='radio-aria-desc' />
            <Radio.Value.RadioMark />
          </RadioFH.Value>
          <RadioFH.AnimatedSparkles count={5} />
          <RadioFH.Text>
            First option
            <Box
              tag={SummaryAI}
              color='--intergalactic-icon-primary-feature-highlight'
              ml={2}
              style={{ verticalAlign: -3 }}
            />
          </RadioFH.Text>
        </RadioFH>
        <ScreenReaderOnly id='radio-aria-desc'>
          Powered by AI
        </ScreenReaderOnly>
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
      <Flex gap={3} direction='column' alignItems='start'>
        <RadioFH value={1}>
          <RadioFH.Value />
          <RadioFH.AnimatedSparkles count={5} />
          <RadioFH.Text>
            First option
            <BadgeFH ml={2}>AI-powered</BadgeFH>
          </RadioFH.Text>
        </RadioFH>
        <Radio value={2} label='Second option' />
      </Flex>
    </RadioGroup>

  </Flex>
);

export default Demo;
