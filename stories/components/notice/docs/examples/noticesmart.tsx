import React from 'react';
import { NoticeSmart } from '@semcore/notice';
import QuestionAltM from '@semcore/icon/Question/m';
import WarningM from '@semcore/icon/Warning/m';
import ThumbUpM from '@semcore/icon/ThumbUp/m';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';

const Demo = () => {
  const [firstHidden, setFirstHidden] = React.useState(false);
  const [secondHidden, setSecondHidden] = React.useState(false);
  const [thirdHidden, setThirdHidden] = React.useState(false);

  return (
    <Flex direction='column' gap={3}>
      <NoticeSmart
        label={<div style={{ width: '16px', height: '16px', background: 'orange' }} />}
        actions={<button type='button'>Wow, so cool!</button>}
        closable
      >
        Look at this cool notice!
      </NoticeSmart>

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
      <NoticeSmart
        theme='muted'
        label={<QuestionAltM />}
        closable
        onClose={() => setSecondHidden(true)}
        hidden={secondHidden}
      >
        It's just a regular message or hint.
      </NoticeSmart>
      <NoticeSmart
        aria-label='New feature announcement'
        theme='success'
        label={<ThumbUpM />}
        title="We've released a cool new feature!"
        closable
        onClose={() => setThirdHidden(true)}
        hidden={thirdHidden}
        actions={
          <Button use='primary' theme='success'>
            Learn more
          </Button>
        }
      >
        Unveiling a breakthrough feature, our latest product enhancement redefines the user
        experience with unparalleled innovation and functionality.
      </NoticeSmart>
      <NoticeSmart
        theme='warning'
        title={'The Link Building tool is under maintenance.'}
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
