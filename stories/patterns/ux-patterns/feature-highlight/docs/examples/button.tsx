import { ButtonAF } from '@semcore/accent-feature';
import { Flex } from '@semcore/base-components';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import React from 'react';

const Demo = () => (
  <>
    <Flex flexWrap gap={4}>

      <ButtonAF use='primary' addonLeft={SummaryAI} size='l'>
        Primary Large
      </ButtonAF>

      <ButtonAF size='l'>
        <ButtonAF.AccentAddon animatedSparkleCount={5} />
        <ButtonAF.Text>Secondary Large</ButtonAF.Text>
      </ButtonAF>

    </Flex>
    <Flex flexWrap gap={4} mt={4}>

      <ButtonAF use='primary' addonLeft={SummaryAI}>
        Primary Medium
      </ButtonAF>

      <ButtonAF>
        <ButtonAF.AccentAddon animatedSparkleCount={5} />
        <ButtonAF.Text>Secondary Medium</ButtonAF.Text>
      </ButtonAF>

    </Flex>
  </>
);

export default Demo;
