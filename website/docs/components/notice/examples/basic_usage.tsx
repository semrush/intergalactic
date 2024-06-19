import React from 'react';
import Notice from 'intergalactic/notice';
import CloseAltM from 'intergalactic/icon/Close/m';
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
    <Notice.Content style={{ display: 'flex', alignItems: 'center' }}>
      <Text mr={2}>Meet our SEO Dashboard! Is it working well for you?</Text>
      <Notice.Actions mt={0}>
        <Button mr={2}>
          <Button.Addon>
            <ThumbUpM />
          </Button.Addon>
          <Button.Text>Yes</Button.Text>
        </Button>
        <Button mr={2}>
          <Button.Addon>
            <ThumbDownM />
          </Button.Addon>
          <Button.Text>No</Button.Text>
        </Button>
        <Button use='tertiary'>Ask me later</Button>
      </Notice.Actions>
    </Notice.Content>
    <Notice.CloseIcon>
      <CloseAltM />
    </Notice.CloseIcon>
  </Notice>
);

export default Demo;
