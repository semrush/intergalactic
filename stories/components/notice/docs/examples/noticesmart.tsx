import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import QuestionAltM from '@semcore/ui/icon/Question/m';
import ThumbUpM from '@semcore/ui/icon/ThumbUp/m';
import WarningM from '@semcore/ui/icon/Warning/m';
import { NoticeSmart } from '@semcore/ui/notice';
import React from 'react';

const Demo = () => {
  const [firstHidden, setFirstHidden] = React.useState(false);
  const [secondHidden, setSecondHidden] = React.useState(false);

  return (
    <Flex direction='column' gap={3}>
      <NoticeSmart
        label={<QuestionAltM />}
        aria-label='New tool announcement'
        closable
        onClose={() => setFirstHidden(true)}
        hidden={firstHidden}
        title='New tool was launched'
      >
        Hi there! There a cool new tool was launched. Take a look!
      </NoticeSmart>
      <NoticeSmart theme='muted' label={<QuestionAltM />} hidden={secondHidden}>
        It's just a regular message or hint.
      </NoticeSmart>
      <NoticeSmart
        aria-label='New feature announcement'
        theme='success'
        label={<ThumbUpM />}
        title="We've released a cool new feature!"
        closable
        onClose={() => setSecondHidden(true)}
        hidden={secondHidden}
        actions={(
          <Button use='primary' theme='success'>
            Learn more
          </Button>
        )}
      >
        Unveiling a breakthrough feature, our latest product enhancement redefines the user
        experience with unparalleled innovation and functionality.
      </NoticeSmart>
      <NoticeSmart
        theme='warning'
        title='The Link Building tool is under maintenance.'
        label={<WarningM />}
        aria-label='Maintenance notice'
      >
        Starting new campaigns is temporarily unavailable, but you can continue working with your
        existing Link Building campaigns.
      </NoticeSmart>
      <NoticeSmart theme='danger'>
        Once you click Regenerate, the article will be rewritten. The previous version cannot be
        restored.
      </NoticeSmart>
    </Flex>
  );
};

export default Demo;
