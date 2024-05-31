import React from 'react';
import { NoticeSmart } from 'intergalactic/notice';
import QuestionAltM from 'intergalactic/icon/Question/m';
import WarningM from 'intergalactic/icon/Warning/m';
import ThumbUpM from 'intergalactic/icon/ThumbUp/m';
import FireM from 'intergalactic/icon/Fire/m';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import Button from 'intergalactic/button';

const Demo = () => {
  const [firstHidden, setFirstHidden] = React.useState(false);
  const [secondHidden, setSecondHidden] = React.useState(false);

  return (
    <Flex direction='column' gap={3}>
      <NoticeSmart
        label={<QuestionAltM />}
        aria-label='Report limited'
        closable
        onClose={() => setFirstHidden(true)}
        hidden={firstHidden}
      >
        The report is limited to the last 2,000 posts. Adjust the filters above to get the data you
        need.
      </NoticeSmart>
      <NoticeSmart
        theme='success'
        label={<ThumbUpM />}
        closable
        onClose={() => setSecondHidden(true)}
        hidden={secondHidden}
        actions={
          <Button use='primary' theme='success'>
            Reconnect
          </Button>
        }
      >
        <Text size={300} bold tag='div' mb={1}>
          Reconnect your locations to see a deep-dive Insights Report
        </Text>
        <Text size={200}>
          Switch to the new Google Connector to access the report right away. Stay tuned for more
          Google-powered insightsto arrive in the future!
        </Text>
      </NoticeSmart>
      <NoticeSmart theme='warning' label={<WarningM />}>
        Once you click Regenerate, the article will be rewritten. The previous version cannot be
        restored.
      </NoticeSmart>
      <NoticeSmart theme='danger'>
        The Link Building tool is under maintenance. Starting new campaigns is temporarily
        unavailable, but you can continue working with your existing Link Building campaigns.
      </NoticeSmart>
    </Flex>
  );
};

export default Demo;
