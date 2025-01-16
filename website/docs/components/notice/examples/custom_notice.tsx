import React from 'react';
import Notice from '@semcore/notice';
import ThumbUpM from '@semcore/icon/ThumbUp/m';
import ThumbDownM from '@semcore/icon/ThumbDown/m';
import Question from '@semcore/icon/Question/m';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';

const Demo = () => (
  <Notice aria-label='Leave feedback'>
    <Notice.Label mr={2}>
      <Question />
    </Notice.Label>
    <Notice.Content display='flex'>
      <Text my={1} mr={2}>
        Meet our SEO Dashboard! Is it working well for you?
      </Text>
      <Notice.Actions mt={0}>
        <Button mr={2} addonLeft={ThumbUpM}>
          Yes
        </Button>
        <Button mr={2} addonLeft={ThumbDownM}>
          No
        </Button>
      </Notice.Actions>
    </Notice.Content>
    <Notice.Close />
  </Notice>
);

export default Demo;
