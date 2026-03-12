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
        text='Hi there! There a cool new tool was launched. Take a look!'
      />
      <NoticeSmart theme='muted' label={<QuestionAltM />} hidden={secondHidden} text="It's just a regular message or hint." />
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
        text='Unveiling a breakthrough feature, our latest product enhancement redefines the user experience with unparalleled innovation and functionality.'
      />
      <NoticeSmart
        theme='warning'
        title='The Link Building tool is under maintenance.'
        label={<WarningM />}
        aria-label='Maintenance notice'
        text='Starting new campaigns is temporarily unavailable, but you can continue working with your existing Link Building campaigns.'
      />
      <NoticeSmart
        theme='danger'
        text='Once you click Regenerate, the article will be rewritten. The previous version cannot be restored.'
      />
    </Flex>
  );
};

export default Demo;
