import { SwitchAF } from '@semcore/accent-feature';
import { Flex } from '@semcore/base-components';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import Switch from '@semcore/switch';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={4}>

    <SwitchAF>
      <SwitchAF.Value ml={0} />
      <SwitchAF.AnimatedSparkles count={5} />
      <SwitchAF.Addon>
        Medium switch
        <SummaryAI color='icon-primary-ai' ml={2} style={{ verticalAlign: 'middle' }} />
      </SwitchAF.Addon>
    </SwitchAF>

    <SwitchAF size='l'>
      <SwitchAF.Value defaultChecked ml={0} />
      <SwitchAF.AnimatedSparkles count={5} />
      <SwitchAF.Addon>
        Large switch
        <SummaryAI color='icon-primary-ai' ml={2} style={{ verticalAlign: -3 }} />
      </SwitchAF.Addon>
    </SwitchAF>

    <SwitchAF size='xl'>
      <SwitchAF.Value ml={0} />
      <SwitchAF.AnimatedSparkles count={5} />
      <SwitchAF.Addon>
        Extra large switch
        <SummaryAI color='icon-primary-ai' ml={2} style={{ verticalAlign: -3 }} />
      </SwitchAF.Addon>
    </SwitchAF>

  </Flex>
);

export default Demo;
