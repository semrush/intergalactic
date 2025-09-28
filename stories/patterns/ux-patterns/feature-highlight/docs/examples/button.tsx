import SummaryAI from '@semcore/icon/SummaryAI/m';
import { Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import { ButtonFH, BadgeFH } from '@semcore/ui/feature-highlight';
import React from 'react';

const Demo = () => (
  <>
    <Flex flexWrap gap={4}>

      <ButtonFH
        aria-describedby='button-aria-desc'
        use='primary'
        addonLeft={SummaryAI}
        size='l'
      >
        Primary Large
      </ButtonFH>
      <ScreenReaderOnly id='button-aria-desc'>
        Powered by AI
      </ScreenReaderOnly>

      <ButtonFH size='l'>
        <ButtonFH.Addon animatedSparkleCount={5} />
        <ButtonFH.Text>
          Secondary Large
        </ButtonFH.Text>
        <ButtonFH.Addon>
          <BadgeFH>AI-powered</BadgeFH>
        </ButtonFH.Addon>
      </ButtonFH>

    </Flex>
    <Flex flexWrap gap={4} mt={4}>

      <ButtonFH
        aria-describedby='button-aria-desc'
        use='primary'
        addonLeft={SummaryAI}
      >
        Primary Medium
      </ButtonFH>

      <ButtonFH aria-describedby='button-aria-desc'>
        <ButtonFH.Addon animatedSparkleCount={5} />
        <ButtonFH.Text>Secondary Medium</ButtonFH.Text>
      </ButtonFH>
    </Flex>
  </>
);

export default Demo;
