import React from 'react';
import Notice from 'intergalactic/notice';
import ThumbUpM from 'intergalactic/icon/ThumbUp/m';
import ThumbDownM from 'intergalactic/icon/ThumbDown/m';
import Question from 'intergalactic/icon/Question/m';
import Button from 'intergalactic/button';
import { Text } from 'intergalactic/typography';

const Demo = () => (
  <Notice aria-label='Feedback'>
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
    <Notice.CloseIcon />
  </Notice>
);

export default Demo;
