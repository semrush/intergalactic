import Question from '@semcore/icon/Question/m';
import ThumbUpM from '@semcore/icon/ThumbUp/m';
import Warning from '@semcore/icon/Warning/m';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Notice from '@semcore/ui/notice';
import React from 'react';

const Demo = () => (
  <Flex direction='column' gap={2}>
    <Notice aria-label='Notice' icon={<Question />}>
      <Notice.Content>
        <Notice.Title>New keyboard shortcuts are available</Notice.Title>

        <Notice.Text>
          You can now navigate dashboards, switch tabs, and create reports faster with updated keyboard
          shortcuts. Open the shortcuts panel anytime to explore the full list of available commands.
        </Notice.Text>

        <Notice.Actions>
          <Button use='primary'>
            Learn more
          </Button>
          <Button>Close</Button>
        </Notice.Actions>
      </Notice.Content>
      <Notice.Close />
    </Notice>

    <Notice theme='muted' aria-label='New muted feature announcement' icon={<Question />}>
      <Notice.Content>
        <Notice.Title>Data export is in progress</Notice.Title>

        <Notice.Text>
          Your report is being prepared and will be ready in a few minutes. You can continue working while
          we generate the export file in the background.
        </Notice.Text>

        <Notice.Actions>
          <Button use='primary'>
            View details
          </Button>
          <Button>Close</Button>
        </Notice.Actions>
      </Notice.Content>
      <Notice.Close />
    </Notice>

    <Notice theme='warning' aria-label='New warning feature announcement' icon={<Question />}>
      <Notice.Content>
        <Notice.Title>Payment method expires soon</Notice.Title>

        <Notice.Text>
          Your current payment method will expire in 5 days. Please update your billing information to
          avoid interruptions to your subscription and scheduled reports.
        </Notice.Text>

        <Notice.Actions>
          <Button use='primary' theme='success'>
            Update payment method
          </Button>
          <Button>Close</Button>
        </Notice.Actions>
      </Notice.Content>
      <Notice.Close />
    </Notice>

    <Notice theme='danger' aria-label='New danger feature announcement' icon={<Warning />}>
      <Notice.Content>
        <Notice.Title>API request limit reached</Notice.Title>

        <Notice.Text>
          Your workspace has reached the monthly API request limit. Some integrations may stop working
          until the limit resets or your subscription is upgraded.
        </Notice.Text>

        <Notice.Actions>
          <Button use='primary' theme='danger'>
            Increase limit
          </Button>
          <Button>Close</Button>
        </Notice.Actions>
      </Notice.Content>
      <Notice.Close />
    </Notice>

    <Notice theme='success' aria-label='New success feature announcement' icon={<ThumbUpM />}>
      <Notice.Content>
        <Notice.Title>Backup completed successfully</Notice.Title>

        <Notice.Text>
          Your project settings and reports were successfully backed up. You can restore this version at
          any time from the backup history page.
        </Notice.Text>

        <Notice.Actions>
          <Button use='primary' theme='success'>
            View backup history
          </Button>
          <Button>Close</Button>
        </Notice.Actions>
      </Notice.Content>
      <Notice.Close />
    </Notice>
  </Flex>
);

export default Demo;
