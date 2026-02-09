import SummaryAI from '@semcore/icon/SummaryAI/m';
import { Box, Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import { SwitchFH, BadgeFH } from '@semcore/ui/feature-highlight';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={4} alignItems='start'>

    <SwitchFH>
      <SwitchFH.Value aria-describedby='switch-aria-desc' ml={0} />
      <SwitchFH.AnimatedSparkles count={5} />
      <SwitchFH.Addon>
        Medium switch
        <Box
          tag={SummaryAI}
          color='--intergalactic-icon-primary-feature-highlight'
          ml={2}
          style={{ verticalAlign: 'middle' }}
        />
      </SwitchFH.Addon>
    </SwitchFH>
    <ScreenReaderOnly id='switch-aria-desc'>
      Powered by AI
    </ScreenReaderOnly>

    <SwitchFH size='l'>
      <SwitchFH.Value
        aria-describedby='switch-aria-desc'
        defaultChecked
        ml={0}
      />
      <SwitchFH.AnimatedSparkles count={5} />
      <SwitchFH.Addon>
        Large switch
        <Box
          tag={SummaryAI}
          color='--intergalactic-icon-primary-feature-highlight'
          ml={2}
          style={{ verticalAlign: -3 }}
        />
      </SwitchFH.Addon>
    </SwitchFH>

    <SwitchFH size='xl'>
      <SwitchFH.Value ml={0} />
      <SwitchFH.AnimatedSparkles count={5} />
      <SwitchFH.Addon>Extra large switch</SwitchFH.Addon>
      <BadgeFH ml={2}>AI-powered</BadgeFH>
    </SwitchFH>

  </Flex>
);

export default Demo;
