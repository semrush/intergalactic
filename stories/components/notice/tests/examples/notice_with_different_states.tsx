import React from 'react';
import Notice from '@semcore/notice';
import Question from '@semcore/icon/Question/m';
import Warning from '@semcore/icon/Warning/m';
import Button from '@semcore/button';
import { Flex } from '@semcore/flex-box';
import ThumbUpM from '@semcore/icon/ThumbUp/m';
import Badge from '@semcore/badge';

const Demo = () => {
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <Flex direction='column'>
      <Notice visible={visible} aria-label='Leave feedback' mb={2} w={400}>
        <Notice.Label mr={2}>
          <Badge bg='gray-400' color='white'>
            soon
          </Badge>
        </Notice.Label>
        <Notice.Content display='flex'>
          <Notice.Text>Your subscription has expired</Notice.Text>
          <Notice.Actions mt={0}>
            <Button mr={2} addonLeft={ThumbUpM}>
              Yes
            </Button>
            <Button mr={2} addonLeft={ThumbUpM}>
              No
            </Button>
          </Notice.Actions>
        </Notice.Content>
        <Notice.Close onClick={() => setVisible(false)} />
      </Notice>

      <Notice aria-label='Leave feedback' mb={2}>
        <Notice.Label mr={2}>
          <Question />
        </Notice.Label>
        <Notice.Content display='flex'>
          <Notice.Text>Your subscription has expired</Notice.Text>
          <Notice.Actions mt={0}>
            <Button mr={2} addonLeft={ThumbUpM}>
              Yes
            </Button>
            <Button mr={2} addonLeft={ThumbUpM}>
              No
            </Button>
          </Notice.Actions>
        </Notice.Content>
      </Notice>

      <Notice aria-label='Notice' mb={2}>
        <Notice.Label>
          <Question />
        </Notice.Label>

        <Notice.Content display='flex'>
          <Notice.Title>Your subscription has expired</Notice.Title>
          <Notice.Actions mt={0}>
            <Button use='primary' mr={2}>
              Button
            </Button>
            <Button mr={2}>Button</Button>
          </Notice.Actions>
        </Notice.Content>
        <Notice.Close />
      </Notice>

      <Notice theme='warning' aria-label='New feature announcement' mb={2}>
        <Notice.Label>
          <Question />
        </Notice.Label>

        <Notice.Content>
          <Notice.Title>Your subscription has expired</Notice.Title>

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
          <Warning />
        </Notice.Label>

        <Notice.Content>
          <Notice.Text>
            49 out of your 50 projects are now locked. They will be deleted in 7 days (on August
            22). To unlock your projects, please upgrade your subscription.Please tell us how to
            improve something. 49 out of your Star Wars: The Force Awakens shattered box office
            records upon its debut becoming the biggest film of all time in. The reports are based
            on the data from the Russian Federation and the CIS.
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
          <ThumbUpM />
        </Notice.Label>

        <Notice.Content>
          <Notice.Title>Your subscription has expired</Notice.Title>

          <Notice.Text>
            49 out of your 50 projects are now locked. They will be deleted in 7 days (on August
            22). To unlock your projects, please upgrade your subscription.Please tell us how to
            improve something. 49 out of your Star Wars: The Force Awakens shattered box office
            records upon its debut becoming the biggest film of all time in. The reports are based
            on the data from the Russian Federation and the CIS.
          </Notice.Text>
        </Notice.Content>
        <Notice.Close />
      </Notice>

      <Notice theme='success' aria-label='New feature announcement' mb={2}>
        <Notice.Label>
          <ThumbUpM />
        </Notice.Label>

        <Notice.Content>
          <Notice.Title>Your subscription has expired</Notice.Title>
        </Notice.Content>
        <Notice.Close />
      </Notice>

      <Notice theme='success' aria-label='New feature announcement' mb={2} w={300}>
        <Notice.Label>
          <ThumbUpM />
        </Notice.Label>

        <Notice.Content>
          <Notice.Title>Your subscription has expired</Notice.Title>

          <Notice.Text>
            49 out of your 50 projects are now locked. They will be deleted in 7 days (on August
            22).
          </Notice.Text>
          <Notice.Actions>
            <Button use='primary' theme='success' mr={2}>
              Button
            </Button>
            <Button>Button</Button>
          </Notice.Actions>
        </Notice.Content>
      </Notice>

      <Notice theme='success' aria-label='New feature announcement' mb={2} w={300}>
        <Notice.Label>
          <ThumbUpM />
        </Notice.Label>

        <Notice.Content>
          <Notice.Title>Your subscription has expired</Notice.Title>

          <Notice.Text>
            49 out of your 50 projects are now locked. They will be deleted in 7 days (on August
            22).
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
};

export default Demo;
