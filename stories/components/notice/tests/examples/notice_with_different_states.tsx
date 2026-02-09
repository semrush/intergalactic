import AlertM from '@semcore/icon/Book/m';
import InfoM from '@semcore/icon/Info/m';
import ThumbUpM from '@semcore/icon/ThumbUp/m';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Notice from '@semcore/ui/notice';
import React from 'react';

const NoticeSmokeDemo = () => {
  return (
    <Flex direction='column' gap={4}>
      {/* 1. Minimal Notice */}
      <Notice theme='info'>
        <Notice.Content>
          <Notice.Text>This is an info notice</Notice.Text>
        </Notice.Content>
      </Notice>

      {/* 2. Full Featured Notice */}
      <Notice theme='success' aria-label='Success Notice'>
        <Notice.Label>
          <ThumbUpM />
        </Notice.Label>
        <Notice.Content>
          <Notice.Title>Success!</Notice.Title>
          <Notice.Text>Everything worked just fine.</Notice.Text>
          <Notice.Actions>
            <Button use='primary' theme='success' mr={2}>Okay</Button>
            <Button>Cancel</Button>
          </Notice.Actions>
        </Notice.Content>
        <Notice.Close />
      </Notice>

      {/* 3. Title only + Close */}
      <Notice theme='warning'>
        <Notice.Content>
          <Notice.Title>Pay attention</Notice.Title>
        </Notice.Content>
        <Notice.Close />
      </Notice>

      {/* 4. Icon + Text only */}
      <Notice theme='danger'>
        <Notice.Label>
          <AlertM />
        </Notice.Label>
        <Notice.Content>
          <Notice.Text>Something went wrong.</Notice.Text>
        </Notice.Content>
      </Notice>

      {/* 5. Actions only */}
      <Notice theme='info'>
        <Notice.Content>
          <Notice.Actions>
            <Button use='primary'>Retry</Button>
          </Notice.Actions>
        </Notice.Content>
      </Notice>

      {/* 6. No Content (edge case) */}
      <Notice theme='warning'>
        <Notice.Label>
          <InfoM />
        </Notice.Label>
        <Notice.Close />
      </Notice>

      {/* 7. Long text, layout check */}
      <Notice theme='danger' w={300} aria-label='Auto wrap test'>
        <Notice.Content>
          <Notice.Text>
            This is a very long message that should ideally wrap and not break layout or overflow.
          </Notice.Text>
        </Notice.Content>
      </Notice>

      {/* 8. Aria-live announcement */}
      <Notice theme='info' aria-live='polite'>
        <Notice.Content>
          <Notice.Text>We'll notify you when it's ready.</Notice.Text>
        </Notice.Content>
      </Notice>

      {/* 9. Custom style */}
      <Notice style={{ backgroundColor: '#B388EB' }}>
        <Notice.Label>Purple</Notice.Label>
        <Notice.Content>
          <Notice.Text>
            Text Notice
          </Notice.Text>
        </Notice.Content>
        <Notice.Close />
      </Notice>

      {/* 10. Custom style */}
      <Notice duration={500}>
        <Notice.Label>Duration</Notice.Label>
        <Notice.Content>
          <Notice.Text>
            Text Notice
          </Notice.Text>
        </Notice.Content>
        <Notice.Close />
      </Notice>

      {/* 11. Hidden Notice */}
      <Notice theme='success' aria-label='hidden Notice' hidden>
        <Notice.Label>
          <ThumbUpM />
        </Notice.Label>
        <Notice.Content>
          <Notice.Title>Success!</Notice.Title>
          <Notice.Text>Everything worked just fine.</Notice.Text>
          <Notice.Actions>
            <Button use='primary' theme='success' mr={2}>Okay</Button>
            <Button>Cancel</Button>
          </Notice.Actions>
        </Notice.Content>
        <Notice.Close />
      </Notice>
    </Flex>
  );
};

export default NoticeSmokeDemo;
