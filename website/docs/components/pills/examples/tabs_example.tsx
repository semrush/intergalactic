import React from 'react';
import Pills from '@semcore/pills';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const contentBLocks = [
  'Lorem ipsum odor amet, consectetuer adipiscing elit. Platea cursus varius interdum convallis torquent finibus phasellus integer. Massa erat aliquet elementum vivamus leo pharetra. ',
  'Tincidunt lacinia nulla etiam; venenatis purus rutrum. Velit commodo volutpat ultrices, ultrices suspendisse facilisis taciti. Venenatis pulvinar sodales maximus justo curabitur.',
  'Aliquam class arcu semper maximus; tincidunt mi. Eros eleifend habitant scelerisque dui nec imperdiet penatibus nostra. Dolor mauris laoreet quis viverra lectus vulputate. ',
];

const Demo = () => {
  const [tab, setTab] = React.useState(0);

  return (
    <Flex gap={5}>
      <Flex gap={2} direction='column'>
        <Pills behavior='manual' value={tab} onChange={setTab}>
          <Pills.Item value={0} id='pills-tab-0'>
            Lorem
          </Pills.Item>
          <Pills.Item value={1} id='pills-tab-1'>
            Tincidunt
          </Pills.Item>
          <Pills.Item value={2} id='pills-tab-2'>
            Aliquam
          </Pills.Item>
        </Pills>
        <Text role='tabpanel' aria-labelledby={`pills-tab-${tab}`} w={200}>
          {contentBLocks[tab]}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Demo;
