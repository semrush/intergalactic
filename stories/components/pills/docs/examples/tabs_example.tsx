import React from 'react';
import Pills from '@semcore/pills';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const contentBLocks = [
  'Cats walk like camels and giraffes: They move both of their right feet first, then move both of their left feet. No other animals walk this way.',
  "According to Guinness World Records, a Great Dane named Zeus is the world's tallest male dog. Zeus is 3 feet, 5.18 inches tall.",
  "Since hamsters are nocturnal, they naturally sleep more during the day and are more active at twilight. Don't wake them up to play.",
];

const Demo = () => {
  const [tab, setTab] = React.useState(0);

  return (
    <Flex gap={2} direction='column' alignItems='start'>
      <Pills behavior='manual' value={tab} onChange={setTab}>
        <Pills.Item value={0} id='pills-tab-0'>
          Cats
        </Pills.Item>
        <Pills.Item value={1} id='pills-tab-1'>
          Dogs
        </Pills.Item>
        <Pills.Item value={2} id='pills-tab-2'>
          Hamsters
        </Pills.Item>
      </Pills>
      <Text size={200} role='tabpanel' aria-labelledby={`pills-tab-${tab}`} w={200}>
        {contentBLocks[tab]}
      </Text>
    </Flex>
  );
};

export default Demo;
