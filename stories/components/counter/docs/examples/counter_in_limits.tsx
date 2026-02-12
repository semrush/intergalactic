import WarningM from '@semcore/icon/Warning/m';
import { Flex } from '@semcore/ui/base-components';
import ProgressBar from '@semcore/ui/progress-bar';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const limitsMax = 10;
const limitsUsed = 10;
const warning = limitsUsed >= limitsMax;

const Demo = () => (
  <Flex direction='column' w={350}>
    <Flex mb={1} justifyContent='space-between'>
      <Text size={200}>SEO Ideas Units</Text>
      <Flex alignItems='center'>
        {warning ? <WarningM color='icon-primary-warning' /> : null}
        <Text size={200} ml={1} bold aria-hidden>
          {limitsUsed}
          <Text color='text-secondary'>
            /
            {limitsMax}
          </Text>
        </Text>
      </Flex>
    </Flex>
    <ProgressBar
      value={(limitsUsed / limitsMax) * 100}
      aria-valuetext={`${limitsUsed} out of ${limitsMax}`}
      aria-label={`limits used ${warning ? ', warning' : ''}`}
      size='s'
    >
      <ProgressBar.Value theme={warning ? 'bg-primary-warning' : 'bg-primary-success'} />
    </ProgressBar>
  </Flex>
);

export default Demo;
