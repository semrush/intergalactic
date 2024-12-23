import React from 'react';
import { NoticeSmart } from '@semcore/notice';
import QuestionAltM from '@semcore/icon/Question/m';
import WarningM from '@semcore/icon/Warning/m';
import ThumbUpM from '@semcore/icon/ThumbUp/m';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';

const Demo = () => {
  const [firstHidden, setFirstHidden] = React.useState(false);
  const [secondHidden, setSecondHidden] = React.useState(false);
  const [thirdHidden, setThirdHidden] = React.useState(false);

  return (
    <Flex direction='column' gap={3}>
      <NoticeSmart
        label={<QuestionAltM />}
        aria-label='New tool announcement'
        closable
        onClose={() => setFirstHidden(true)}
        hidden={firstHidden}
      >
        <Text size={300} bold tag='div' my={'2px'}>
          New tool was launched
        </Text>
        <Text tag='div' my={1}>
          Hi there! There a cool new tool was launched. Take a look!
        </Text>
      </NoticeSmart>
      <NoticeSmart
        theme='muted'
        label={<QuestionAltM />}
        closable
        onClose={() => setSecondHidden(true)}
        hidden={secondHidden}
      >
        <Text tag='div' my={1}>
          It's just a regular message or hint.
        </Text>
      </NoticeSmart>
      <NoticeSmart
        aria-label='New feature announcement'
        theme='success'
        label={<ThumbUpM />}
        closable
        onClose={() => setThirdHidden(true)}
        hidden={thirdHidden}
        actions={
          <Button use='primary' theme='success'>
            Learn more
          </Button>
        }
      >
        <Text size={300} bold tag='div' my={'2px'}>
          We've released a cool new feature!
        </Text>
        <Text tag='div' my={1}>
          Unveiling a breakthrough feature, our latest product enhancement redefines the user
          experience with unparalleled innovation and functionality.
        </Text>
      </NoticeSmart>
      <NoticeSmart
        theme='warning'
        title={'The Link Building tool is under maintenance.'}
        text={
          'Starting new campaigns is temporarily unavailable, but you can continue working with your existing Link Building campaigns.'
        }
        label={<WarningM />}
        aria-label='Maintenance notice'
      />
      <NoticeSmart theme='danger'>
        Once you click Regenerate, the article will be rewritten. The previous version cannot be
        restored.
      </NoticeSmart>
    </Flex>
  );
};

export default Demo;
