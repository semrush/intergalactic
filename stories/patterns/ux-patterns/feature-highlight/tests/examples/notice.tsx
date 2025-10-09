import { Flex } from '@semcore/ui/base-components';
import { ButtonFH, NoticeFH, BadgeFH } from '@semcore/ui/feature-highlight';
import MailSent from '@semcore/ui/illustration/MailSent';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <Flex gap={4} direction='column'>

      <NoticeFH
        closable
        aria-label='Highlighted notice'
        label={<MailSent />}
        title={<Text>Optimize your domain for AI search</Text>}
        actions={(
          <ButtonFH use='primary'> Optimize for AI search</ButtonFH>
        )}
      >
        Audit your domain and fix issues to get more traffic from AI search engines like ChatGPT.
      </NoticeFH>

    </Flex>
  );
};

export default Demo;
