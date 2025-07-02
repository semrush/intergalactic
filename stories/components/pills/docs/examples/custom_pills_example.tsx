import { Flex } from '@semcore/base-components';
import Pills from '@semcore/pills';
import { Text } from '@semcore/typography';
import React from 'react';
import type { CSSProperties } from 'react';

const contentBLocks = [
  'Only awake for snacks and existential crises. The rest of the time, she is contemplating the void from under a blanket.',
  'A yoga master: sleeps upside down without dropping a single thought. Scientists are still trying to understand how her brain stays so calm.',
  'Sleep is her full-time job. Occasionally wakes up just to sigh and go back to bed. Her alarm clock gave up and filed for early retirement.',
];

const pillStyles: CSSProperties = {
  height: 'fit-content',
  alignItems: 'stretch',
  textAlign: 'inherit',
  whiteSpace: 'normal',
} as const;

const Demo = () => {
  const [tab, setTab] = React.useState<number>(0);

  return (
    <Flex direction='column' alignItems='flex-start' gap={2}>
      <Text size={300} semibold id='king-pills'>
        Average sleep per day
      </Text>
      <Pills mb={4} behavior='manual' value={tab} onChange={setTab} aria-labelledby='king-pills'>
        <Pills.Item value={0} style={pillStyles} p={5} id='custom-pills-tab-0'>
          <Pills.Item.Text tag={Flex} direction='column' m={0}>
            <Text mb={1}>Wombat</Text>
            <Text size={500} bold>16 hours</Text>
          </Pills.Item.Text>
        </Pills.Item>
        <Pills.Item value={1} style={pillStyles} p={5} id='custom-pills-tab-1'>
          <Pills.Item.Text tag={Flex} direction='column' m={0}>
            <Text mb={1}>Bat</Text>
            <Text size={500} bold>20 hours</Text>
          </Pills.Item.Text>
        </Pills.Item>
        <Pills.Item value={2} style={pillStyles} p={5} id='custom-pills-tab-2'>
          <Pills.Item.Text tag={Flex} direction='column' m={0}>
            <Text mb={1}>Koala</Text>
            <Text size={500} bold>22 hours</Text>
          </Pills.Item.Text>
        </Pills.Item>
      </Pills>
      <Text size={300} role='tabpanel' aria-labelledby={`custom-pills-tab-${tab}`}>
        {contentBLocks[tab]}
      </Text>
    </Flex>
  );
};

export default Demo;
