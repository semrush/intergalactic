import { Flex } from '@semcore/base-components';
import { ButtonFH } from '@semcore/feature-highlight';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import React from 'react';

const Demo = () => (
  <>
    <Flex flexWrap gap={4}>

      <ButtonFH use='primary' addonLeft={SummaryAI} size='l'>
        Primary Large
      </ButtonFH>

      <ButtonFH size='l'>
        <ButtonFH.Addon animatedSparkleCount={5} />
        <ButtonFH.Text>Secondary Large</ButtonFH.Text>
      </ButtonFH>

    </Flex>
    <Flex flexWrap gap={4} mt={4}>

      <ButtonFH use='primary' addonLeft={SummaryAI}>
        Primary Medium
      </ButtonFH>

      <ButtonFH>
        <ButtonFH.Addon animatedSparkleCount={5} />
        <ButtonFH.Text>Secondary Medium</ButtonFH.Text>
      </ButtonFH>

    </Flex>
  </>
);

export default Demo;
