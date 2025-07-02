import { Flex } from '@semcore/base-components';
import { SwitchFH } from '@semcore/feature-highlight';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={4}>

    <SwitchFH>
      <SwitchFH.Value ml={0} />
      <SwitchFH.AnimatedSparkles count={5} />
      <SwitchFH.Addon>
        Medium switch
        <SummaryAI color='--intergalactic-icon-primary-ai' ml={2} style={{ verticalAlign: 'middle' }} />
      </SwitchFH.Addon>
    </SwitchFH>

    <SwitchFH size='l'>
      <SwitchFH.Value defaultChecked ml={0} />
      <SwitchFH.AnimatedSparkles count={5} />
      <SwitchFH.Addon>
        Large switch
        <SummaryAI color='--intergalactic-icon-primary-ai' ml={2} style={{ verticalAlign: -3 }} />
      </SwitchFH.Addon>
    </SwitchFH>

    <SwitchFH size='xl'>
      <SwitchFH.Value ml={0} />
      <SwitchFH.AnimatedSparkles count={5} />
      <SwitchFH.Addon>
        Extra large switch
        <SummaryAI color='--intergalactic-icon-primary-ai' ml={2} style={{ verticalAlign: -3 }} />
      </SwitchFH.Addon>
    </SwitchFH>

  </Flex>
);

export default Demo;
