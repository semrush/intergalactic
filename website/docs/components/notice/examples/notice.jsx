import React from 'react';
import Notice from '@semcore/notice';
import CloseAltS from '@semcore/icon/Close/m';
import ThumbUpS from '@semcore/icon/ThumbUp/m';
import ThumbDownS from '@semcore/icon/ThumbDown/m';
import Question from '@semcore/icon/Question/m';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';

export default () => (
  <Notice>
    <Notice.Label mt={1} mr={2} aria-hidden={true}>
      <Question />
    </Notice.Label>
    <Notice.Content style={{ display: 'flex', alignItems: 'center' }}>
      <Notice.Actions mt={0}>
        <Text mr={2}>Meet our SEO Dashboard! Is it working well for you?</Text>
        <Button mr={2}>
          <Button.Addon>
            <ThumbUpS />
          </Button.Addon>
          <Button.Text>Yes</Button.Text>
        </Button>
        <Button mr={2}>
          <Button.Addon>
            <ThumbDownS />
          </Button.Addon>
          <Button.Text>No</Button.Text>
        </Button>
        <Button use="tertiary">Ask me later</Button>
      </Notice.Actions>
    </Notice.Content>
    <Notice.CloseIcon>
      <CloseAltS />
    </Notice.CloseIcon>
  </Notice>
);
