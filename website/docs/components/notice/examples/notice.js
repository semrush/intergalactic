import React from 'react';
import Notice from '@semcore/notice';
import CloseAltS from '@semcore/icon/lib/CloseAlt/s';
import ThumbUpS from '@semcore/icon/lib/ThumbUp/s';
import ThumbDownS from '@semcore/icon/lib/ThumbDown/s';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';

export default () => (
  <Notice>
    <Notice.Label mr={3}>
      <img
        src="data:image/png;base64,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"
        alt="Hey"
      />
    </Notice.Label>
    <Notice.Content style={{ display: 'flex', alignItems: 'center' }}>
      <Notice.Actions mt={0}>
        <Text mr={1}>Meet our SEO Dashboard! Is it working well for you?</Text>
        <Button>
          <Button.Addon tag={ThumbUpS} />
          <Button.Text>Yes</Button.Text>
        </Button>
        <Button>
          <Button.Addon tag={ThumbDownS} />
          <Button.Text>No</Button.Text>
        </Button>
        <Button use="tertiary">Ask me later</Button>
      </Notice.Actions>
    </Notice.Content>
    <Notice.CloseIcon tag={CloseAltS} />
  </Notice>
);
