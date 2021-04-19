import React from 'react';
import { useForm } from 'react-hook-form';
import { Flex } from '@semcore/flex-box';
import Tooltip from '@semcore/tooltip';
import Input from '@semcore/input';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';

const Demo = () => {
  const { register, handleSubmit, errors, reset } = useForm({
    mode: 'onBlur',
    shouldFocusError: false,
  });

  const onSubmit = (data, e) => {
    reset({ email: '', password: '' });
    alert(JSON.stringify(data));
  };

  return (
    <>
      <Flex tag="form" onSubmit={handleSubmit(onSubmit)} direction="column">
        <Text size={200} tag="label" mb={1} htmlFor="email">
          Email
        </Text>
        <Tooltip
          interaction={errors['email'] ? 'focus' : 'none'}
          placement="right"
          theme="warning"
          title={errors['email']?.message}
          w="100%"
          tag={Input}
          mb={2}
          size="l"
          state={errors['email'] ? 'invalid' : 'normal'}
        >
          <Input.Value
            id="email"
            name="email"
            ref={register({
              pattern: {
                value: /.+@.+\..+/i,
                message: "Email don't valid",
              },
            })}
          />
        </Tooltip>
        <Text size={200} tag="label" mb={1} htmlFor="password">
          Password
        </Text>
        <Tooltip
          interaction={errors['password'] ? 'focus' : 'none'}
          placement="right"
          theme="warning"
          title={errors['password']?.message}
          w="100%"
          tag={Input}
          mb={4}
          size="l"
          state={errors['password'] ? 'invalid' : 'normal'}
        >
          <Input.Value
            id="password"
            name="password"
            type="password"
            ref={register({ required: 'Require password' })}
          />
        </Tooltip>

        <Button type="submit" use="primary" theme="success" size="l" w="100%">
          Log in
        </Button>
      </Flex>
    </>
  );
};

export default Demo;
