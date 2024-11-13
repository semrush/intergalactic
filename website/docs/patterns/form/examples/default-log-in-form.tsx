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
    mode: 'onChange',
  });
  const [focusedFieldName, setFocusedFieldName] = React.useState('');

  const onSubmit = (data) => {
    reset({ email: '', password: '' });
    alert(JSON.stringify(data));
  };

  const showError = (fieldName) => {
    return Boolean(errors[fieldName]?.message) && focusedFieldName === fieldName;
  };

  return (
    <>
      <Flex tag='form' noValidate onSubmit={handleSubmit(onSubmit)} direction='column'>
        <Text size={300} tag='label' mb={1} htmlFor='email'>
          Email
        </Text>
        <Tooltip
          placement='top'
          theme='warning'
          interaction={'none'}
          visible={showError('email')}
          animationsDisabled
        >
          <Tooltip.Popper id='form-email-error'>{errors['email']?.message}</Tooltip.Popper>
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
                onFocus={() => setFocusedFieldName('email')}
                onBlur={() => setFocusedFieldName('')}
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
        <Tooltip
          interaction={'none'}
          placement='top'
          theme='warning'
          visible={showError('password')}
          animationsDisabled
        >
          <Tooltip.Popper id='form-password-error'>{errors['password']?.message}</Tooltip.Popper>
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
                onFocus={() => setFocusedFieldName('password')}
                onBlur={() => setFocusedFieldName('')}
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
