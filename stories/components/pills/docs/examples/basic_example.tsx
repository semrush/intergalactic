import React from 'react';
import Pills from '@semcore/pills';
import ThumbUpM from '@semcore/icon/ThumbUp/m';
import ThumbDownM from '@semcore/icon/ThumbDown/m';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  const [choice, setChoice] = React.useState(null);

  return (
    <Flex direction='column' alignItems='flex-start'>
      <Text size={200} id='pills-basic-usage'>
        Your opinion
      </Text>
      <Pills mt={2} value={choice} onChange={setChoice} aria-labelledby='pills-basic-usage'>
        <Pills.Item value={'like'}>
          <Pills.Item.Addon tag={ThumbUpM} />
          <Pills.Item.Text>Like</Pills.Item.Text>
        </Pills.Item>
        <Pills.Item value={null}>Don't care</Pills.Item>
        <Pills.Item value={'dislike'}>
          <Pills.Item.Addon tag={ThumbDownM} />
          <Pills.Item.Text>Dislike</Pills.Item.Text>
        </Pills.Item>
      </Pills>
    </Flex>
  );
};

export default Demo;
