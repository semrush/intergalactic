import React from 'react';
import Notice from '@semcore/notice';
import Question from '@semcore/icon/Question/m';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';

const Demo = () => (
  <Flex direction='column'>
    <Notice aria-label='Notice' mb={2}>
      <Notice.Label>
        <Question />
      </Notice.Label>

      <Notice.Content>
        <Notice.Title>Your subscription has expired</Notice.Title>

        <Notice.Text>
          49 out of your 50 projects are now locked. They will be deleted in 7 days (on August 22).
          To unlock your projects, please upgrade your subscription.Please tell us how to improve
          something. 49 out of your Star Wars: The Force Awakens shattered box office records upon
          its debut becoming the biggest film of all time in. The reports are based on the data from
          the Russian Federation and the CIS.
        </Notice.Text>

        <Notice.Actions>
          <Button use='primary' mr={2}>
            Button
          </Button>
          <Button>Button</Button>
        </Notice.Actions>
      </Notice.Content>
      <Notice.Close />
    </Notice>

    <Notice theme='muted' aria-label='New feature announcement'>
      <Notice.Label>
        <Question />
      </Notice.Label>

      <Notice.Content>
        <Notice.Title>Your subscription has expired</Notice.Title>

        <Notice.Text>
          49 out of your 50 projects are now locked. They will be deleted in 7 days (on August 22).
          To unlock your projects, please upgrade your subscription.Please tell us how to improve
          something. 49 out of your Star Wars: The Force Awakens shattered box office records upon
          its debut becoming the biggest film of all time in. The reports are based on the data from
          the Russian Federation and the CIS.
        </Notice.Text>

        <Notice.Actions>
          <Button use='primary' mr={2}>
            Button
          </Button>
          <Button>Button</Button>
        </Notice.Actions>
      </Notice.Content>
      <Notice.Close />
    </Notice>
  </Flex>
);

export default Demo;
