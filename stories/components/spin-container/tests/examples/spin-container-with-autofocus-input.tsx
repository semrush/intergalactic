import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import SpinContainer from '@semcore/ui/spin-container';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const spinContainerRef = React.useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      spinContainerRef.current?.focus();
    });
  }, []);

  const handleClick = React.useCallback(() => {
    if (isLoading === false) {
      spinContainerRef.current?.focus();
    }
    setIsLoading(!isLoading);
  }, [isLoading]);

  return (
    <Flex direction='column' gap={2}>
      <Button onClick={handleClick} w={200}>change loading</Button>

      <SpinContainer loading={isLoading} ref={spinContainerRef} aria-live='polite' role='status'>
        <Flex direction='column' gap={2} w={150} h={300}>
          <Text htmlFor='spin-container-input' size={200} tag='label'>
            Input
          </Text>
          {!isLoading && (
            <Input>
              <Input.Value id='spin-container-input' autoFocus={true} />
            </Input>
          )}
        </Flex>
      </SpinContainer>
    </Flex>
  );
};

export default Demo;
