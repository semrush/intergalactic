import Coffee from '@semcore/illustration/Coffee';
import MailSent from '@semcore/illustration/MailSent';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Notice from '@semcore/ui/notice';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={2}>
    <Notice aria-label='Notice' illustration={<Coffee />}>
      <Notice.Content>
        <Notice.Title>Your subscription has expired</Notice.Title>

        <Notice.Text>
          49 out of your 50 projects are now locked. They will be deleted in 7 days (on August 22).
          To unlock your projects, please upgrade your subscription.
        </Notice.Text>

        <Notice.Actions>
          <Button use='primary'>
            Button
          </Button>
          <Button>Button</Button>
        </Notice.Actions>
      </Notice.Content>
      <Notice.Close />
    </Notice>

    <Notice theme='muted' aria-label='New feature announcement' illustration={<MailSent />}>
      <Notice.Content>
        <Notice.Title>Your subscription has expired</Notice.Title>

        <Notice.Text>
          49 out of your 50 projects are now locked. They will be deleted in 7 days (on August 22).
          To unlock your projects, please upgrade your subscription.
        </Notice.Text>

        <Notice.Actions>
          <Button use='primary'>
            Button
          </Button>
          <Button>Button</Button>
        </Notice.Actions>
      </Notice.Content>
      <Notice.Close />
    </Notice>

    <Notice theme='warning' aria-label='New feature announcement' illustration={<MailSent />}>
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
          <Button use='primary' theme='success'>
            Button
          </Button>
          <Button>Button</Button>
        </Notice.Actions>
      </Notice.Content>
      <Notice.Close />
    </Notice>

    <Notice theme='danger' aria-label='New feature announcement' illustration={<Coffee />}>
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
          <Button use='primary' theme='danger'>
            Button
          </Button>
          <Button>Button</Button>
        </Notice.Actions>
      </Notice.Content>
      <Notice.Close />
    </Notice>

    <Notice theme='success' aria-label='New feature announcement' illustration={<Coffee />}>
      <Notice.Content>
        <Notice.Title>Your subscription has expired</Notice.Title>

        <Notice.Text>
          49 out of your 50 projects are now locked. They will be deleted in 7 days (on August 22).
          To unlock your projects, please upgrade your subscription.
        </Notice.Text>

        <Notice.Actions>
          <Button use='primary' theme='success'>
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
