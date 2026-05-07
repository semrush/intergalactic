import { Box } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import React, { useState } from 'react';

const Demo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box tag='form' onSubmit={onSubmit}>
      <Box mb={4}>
        <Text tag='label' htmlFor='password-example1' size={200} mr={2}>
          Label
        </Text>
        <Input w={240}>
          <Input.Value
            defaultValue='I_like_cats'
            placeholder='Password'
            id='password-example1'
            disabled={isLoading}
          />
        </Input>
      </Box>
      <Box mb={4}>
        <Text tag='label' htmlFor='password-example' size={200} mr={2}>
          Label
        </Text>
        <Input w={240}>
          <Input.Value
            defaultValue='I_like_cats'
            placeholder='Password'
            id='password-example'
            disabled={isLoading}
          />
        </Input>
      </Box>
      <Button loading={isLoading} type='submit'>
        Submit
      </Button>
    </Box>
  );
};

export default Demo;
