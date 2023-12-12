import React from 'react';
import Notice from '@semcore/ui/notice';
import CloseAltM from '@semcore/ui/icon/Close/m';
import ThumbUpM from '@semcore/ui/icon/ThumbUp/m';
import ThumbDownM from '@semcore/ui/icon/ThumbDown/m';
import Question from '@semcore/ui/icon/Question/m';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';

const Demo = () => (
  <Notice>
    <Notice.Label mt={1} mr={2} aria-hidden={true}>
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