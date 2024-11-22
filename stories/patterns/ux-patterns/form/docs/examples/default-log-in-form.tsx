import React from 'react';
import { useForm } from 'react-hook-form';
import { Flex } from '@semcore/flex-box';
import Tooltip from '@semcore/tooltip';
import Input from '@semcore/input';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';

const Demo = () => {
  const {
    register,
    trigger,
    handleSubmit,
    errors,
    reset,
    formState: { dirtyFields, isSubmitted },
  } = useForm({
    mode: 'onBlur',
  });
  const [focusedFieldName, setFocusedFieldName] = React.useState('');

  const onSubmit = (data: { email: string; passwrod: string }) => {
    reset({ email: '', password: '' });
    alert(JSON.stringify(data));
  };

  const invalid = (fieldName: string): boolean => {
    const hasError = Boolean(errors[fieldName]);
    if (isSubmitted) {
      return hasError;
    }

    return dirtyFields[fieldName] && hasError;
  };

  const showError = (fieldName: string): boolean => {
    const isActive = focusedFieldName === fieldName;
    return invalid(fieldName) && isActive;
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
            state={invalid('email') ? 'invalid' : 'normal'}
            controlsLength={1}
          >
            {({ getTriggerProps }) => {
              return (
                <Input.Value
                  {...getTriggerProps({
                    id: 'email',
                    name: 'email',
                    type: 'email',
                    onChange: () => {
                      if (invalid('email')) {
                        trigger('email');
                      }
                    },
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
                  aria-invalid={invalid('email')}
                  aria-errormessage={invalid('email') ? 'form-email-error' : undefined}
                />
              );
            }}
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
            state={invalid('password') ? 'invalid' : 'normal'}
            controlsLength={1}
          >
            {({ getTriggerProps }) => (
              <Input.Value
                {...getTriggerProps({
                  id: 'password',
                  name: 'password',
                  type: 'password',
                  onChange: () => {
                    if (invalid('password')) {
                      trigger('password');
                    }
                  },
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
                aria-invalid={invalid('password')}
                aria-errormessage={invalid('password') ? 'form-password-error' : undefined}
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
