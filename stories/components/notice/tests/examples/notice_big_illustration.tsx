import React from 'react';
import Notice from '@semcore/notice';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import Coffee from '@semcore/illustration/Coffee';
import MailSent from '@semcore/illustration/MailSent';



const Demo = () => (
  <Flex direction='column'>
    <Notice aria-label='Notice' mb={2}>
      <Notice.Label>
        <Coffee width = '130' height = '130' />
      </Notice.Label>

      <Notice.Content>
        <Notice.Title>Your subscription has expired</Notice.Title>

        <Notice.Text>
        49 out of your 50 projects are now locked. They will be deleted in 7 days (on August 22). To unlock your projects, please upgrade your subscription.
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

    <Notice theme='muted' aria-label='New feature announcement' mb={2}>
      <Notice.Label>
        <MailSent width = '130' height = '130' />
      </Notice.Label>

      <Notice.Content>
        <Notice.Title>Your subscription has expired</Notice.Title>

        <Notice.Text>
        49 out of your 50 projects are now locked. They will be deleted in 7 days (on August 22). To unlock your projects, please upgrade your subscription.
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

    <Notice theme='warning' aria-label='New feature announcement' mb={2}>
      <Notice.Label>
        <MailSent width = '130' height = '130' />
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
          <Button use='primary' theme='success' mr={2}>
            Button
          </Button>
          <Button>Button</Button>
        </Notice.Actions>
      </Notice.Content>
      <Notice.Close />
    </Notice>

    <Notice theme='danger' aria-label='New feature announcement' mb={2}>
      <Notice.Label>
        <Coffee width = '130' height = '130' />
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
          <Button use='primary' theme='danger' mr={2}>
            Button
          </Button>
          <Button>Button</Button>
        </Notice.Actions>
      </Notice.Content>
      <Notice.Close />
    </Notice>

    <Notice theme='success' aria-label='New feature announcement' mb={2}>
      <Notice.Label>
        <Coffee width = '130' height = '130' />
      </Notice.Label>

      <Notice.Content>
        <Notice.Title>Your subscription has expired</Notice.Title>

        <Notice.Text>
        49 out of your 50 projects are now locked. They will be deleted in 7 days (on August 22). To unlock your projects, please upgrade your subscription.
        </Notice.Text>

        <Notice.Actions>
          <Button use='primary' theme='success' mr={2}>
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
