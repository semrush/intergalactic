---
title: Example
tabs: Notice('index'), A11y('notice-a11y'), API('notice-api'), Example('notice-code'), Changelog('notice-changelog')
---

## Basic usage

::: sandbox

<script lang="tsx">
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
</script>

:::

## NoticeSmart

It is an example that showcases the functionality of the [NoticeSmart](/components/notice/notice-api/#noticesmart) component.

::: sandbox

<script lang="tsx">
import React from 'react';
import { NoticeSmart } from '@semcore/ui/notice';
import QuestionAltM from '@semcore/ui/icon/Question/m';

const message = 'The reports are based on the data from the Russia Federation and CIS.';

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message,
    };

    this.show = () => {
      setTimeout(() => {
        this.changeText(message);
      }, 2000);
    };

    this.close = () => {
      this.show();
      this.changeText(null);
    };

    this.changeText = (message) => {
      this.setState({ message });
    };
  }
  render() {
    const { message } = this.state;
    return (
      <NoticeSmart closable label={<QuestionAltM />} onClose={this.close} hidden={!message}>
        {message}
      </NoticeSmart>
    );
  }
}
</script>

:::

## Custom notice

You have the flexibility to construct custom notices by utilizing individual components. For an example, refer to [FeedbackYesNo](/patterns/feedback-yes-no/feedback-yes-no-code/).
