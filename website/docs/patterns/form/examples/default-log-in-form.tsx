import React from 'react';
import { useForm } from 'react-hook-form';
import { Flex } from 'intergalactic/flex-box';
import Tooltip from 'intergalactic/tooltip';
import Input from 'intergalactic/input';
import Button from 'intergalactic/button';
import { Text } from 'intergalactic/typography';

const Demo = () => {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    formState: { dirtyFields, touched },
  } = useForm({
    mode: 'onSubmit',
  });
  const emailRef = React.useRef<HTMLInputElement>();
  const passwordRef = React.useRef<HTMLInputElement>();

  const onSubmit = (data) => {
    reset({ email: '', password: '' });
    alert(JSON.stringify(data));
  };

  const showError = (fieldName, ref: typeof emailRef) => {
    return (
      Boolean(touched[fieldName] && errors[fieldName]?.message) &&
      document.activeElement === ref.current
    );
  };

  return (
    <>
      <Flex tag='form' noValidate onSubmit={handleSubmit(onSubmit)} direction='column'>
        <Text size={300} tag='label' mb={1} htmlFor='email'>
          Email
        </Text>
        <Tooltip animationsDisabled>
          <Tooltip.Popper
            placement='right'
            theme='warning'
            visible={showError('email', emailRef)}
            id='form-email-error'
          >
            {errors['email']?.message}
          </Tooltip.Popper>
          <Tooltip.Trigger
            tag={Input}
            w='100%'
            mb={2}
            size='l'
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
                  }) as React.ForwardedRef<HTMLInputElement>,
                })}
                ref={emailRef}
                autoComplete='email'
                aria-invalid={Boolean(errors['email'])}
                aria-errormessage={errors['email'] ? 'form-email-error' : undefined}
              />
            )}
          </Tooltip.Trigger>
        </Tooltip>
        <Text size={300} tag='label' mb={1} htmlFor='password'>
          Password
        </Text>
        <Tooltip animationsDisabled>
          <Tooltip.Popper
            placement='right'
            theme='warning'
            visible={showError('password', passwordRef)}
            id='form-password-error'
          >
            {errors['password']?.message}
          </Tooltip.Popper>
          <Tooltip.Trigger
            tag={Input}
            w='100%'
            mb={4}
            size='l'
            state={errors['password'] ? 'invalid' : 'normal'}
            controlsLength={1}
          >
            {({ getTriggerProps }) => (
              <Input.Value
                {...getTriggerProps({
                  id: 'password',
                  name: 'password',
                  type: 'password',
                  ref: register({
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must have at least 8 characters',
                    },
                  }) as React.ForwardedRef<HTMLInputElement>,
                })}
                ref={passwordRef}
                autoComplete='password'
                aria-invalid={Boolean(errors['password'])}
                aria-errormessage={errors['password'] ? 'form-password-error' : undefined}
              />
            )}
          </Tooltip.Trigger>
        </Tooltip>

        <Button type='submit' use='primary' theme='success' size='l' w='100%'>
          Log in
        </Button>
      </Flex>
    </>
  );
};

export default Demo;
