import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import SpinContainer from '@semcore/ui/spin-container';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Flex direction='column' gap={2}>
      <Button onClick={() => setLoading(!loading)} w={200}>
        {loading ? 'Stop loading' : 'Start loading'}
      </Button>

      <SpinContainer loading={loading} w={200} h={150} aria-live='polite' role='status'>
        {!loading && (
          <Flex direction='column' gap={2}>
            <Text htmlFor='spin-container-input' size={200} tag='label'>
              Input
            </Text>
            <Input>
              <Input.Value id='spin-container-input' autoFocus />
            </Input>
          </Flex>
        )}
      </SpinContainer>
    </Flex>
  );
};

export default Demo;
