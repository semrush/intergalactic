import React from 'react';
import { useForm } from 'react-hook-form';
import { Flex } from '@semcore/ui/flex-box';
import Tooltip from '@semcore/ui/tooltip';
import Input from '@semcore/ui/input';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const { register, handleSubmit, errors, reset } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    reset({ email: '', password: '' });
    alert(JSON.stringify(data));
  };

  return (
    <>
      <Flex tag="form" onSubmit={handleSubmit(onSubmit)} direction="column">
        <Text size={300} tag="label" mb={1} htmlFor="email">
          Email
        </Text>
        <Tooltip>
          <Tooltip.Popper
            placement="right"
            theme="warning"
            visible={errors['email']}
            id="form-email-error"
          >
            {errors['email']?.message}
          </Tooltip.Popper>
          <Tooltip.Trigger
            tag={Input}
            w="100%"
            mb={2}
            size="l"
            state={errors['email'] ? 'invalid' : 'normal'}
            controlsLength={1}
          >
            {({ getTriggerProps }) => (
              <Input.Value
                {...getTriggerProps({
                  id: 'email',
                  name: 'email',
                  type: 'email',
                  ref: register({
                    required: 'Email is required',
                    pattern: {
                      value: /.+@.+\..+/i,
                      message: 'Email is not valid',
                    },
                  }),
                })}
                autoComplete="email"
                aria-invalid={Boolean(errors['email'])}
                aria-errormessage={errors['email'] ? 'form-email-error' : undefined}
              />
            )}
          </Tooltip.Trigger>
        </Tooltip>
        <Text size={300} tag="label" mb={1} htmlFor="password">
          Password
        </Text>
        <Tooltip>
          <Tooltip.Popper
            placement="right"
            theme="warning"
            visible={errors['password']}
            id="form-password-error"
          >
            {errors['password']?.message}
          </Tooltip.Popper>
          <Tooltip.Trigger
            tag={Input}
            w="100%"
            mb={4}
            size="l"
            state={errors['password'] ? 'invalid' : 'normal'}
            controlsLength={1}
          >
            {({ getTriggerProps }) => (
              <Input.Value
                {...getTriggerProps({
                  id: 'password',
                  name: 'password',
                  type: 'password',
                  ref: register({ required: 'Password is required' }),
                })}
                autoComplete="password"
                aria-invalid={Boolean(errors['password'])}
                aria-errormessage={errors['password'] ? 'form-password-error' : undefined}
              />
            )}
          </Tooltip.Trigger>
        </Tooltip>

        <Button type="submit" use="primary" theme="success" size="l" w="100%">
          Log in
        </Button>
      </Flex>
    </>
  );
};

export default Demo;
