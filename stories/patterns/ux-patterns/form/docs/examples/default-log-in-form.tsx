import React from 'react';
import { FormProvider, useForm, useFormContext, RegisterOptions } from 'react-hook-form';
import { Flex } from '@semcore/flex-box';
import Tooltip from '@semcore/tooltip';
import Input from '@semcore/input';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';

type FormValues = {
  email: string;
  password: string;
};

const defaultValues = { email: '', password: '' };

type FormControlProps = {
  name: keyof FormValues;
  type: string;
  options: RegisterOptions;
};

const FormControl = ({ name, type, options }: FormControlProps) => {
  const {
    register,
    trigger,
    getFieldState,
    resetField,
    getValues,
    formState: { isSubmitted, errors },
  } = useFormContext();
  const { isTouched } = getFieldState(name);
  const [active, setActive] = React.useState<boolean>(false);
  const error = errors[name];

  const hasError = () => {
    if (error?.type === 'required' && !isSubmitted) {
      return false;
    }

    return Boolean(error);
  };

  const invalid = (): boolean => {
    return isTouched && hasError();
  };

  const showErrorTooltip = (): boolean => {
    return invalid() && active;
  };

  const resetIfChangedToValid = (isValid: boolean) => {
    if (isValid) {
      resetField(name, { keepTouched: false, defaultValue: getValues(name) });
    }
  };

  const { onChange, ...restField } = register(name, {
    ...options,
    onBlur: () => setActive(false),
  });

  const field = {
    onChange: (_v: string, e: React.SyntheticEvent) => {
      // important: keep call order, otherwise validation breaks
      onChange(e);
      hasError() && trigger().then(resetIfChangedToValid);
    },
    ...restField,
  };

  return (
    <Tooltip placement='top' interaction={'none'} animationsDisabled>
      {({ getTriggerProps }) => {
        return (
          <Input
            w='100%'
            mb={2}
            size='l'
            state={invalid() ? 'invalid' : 'normal'}
            controlsLength={1}
          >
            <Tooltip.Popper visible={showErrorTooltip()} id={`form-${name}-error`} theme='warning'>
              {error?.message as any}
            </Tooltip.Popper>

            <Tooltip.Trigger
              {...getTriggerProps({
                id: name,
                type: type,
              })}
              {...field}
              tag={Input.Value}
              onFocus={() => setActive(true)}
              autoComplete={type}
              aria-invalid={invalid()}
              aria-describedby={invalid() ? 'form-project-error' : undefined}
              aria-errormessage={invalid() ? `form-${name}-error` : undefined}
            />
          </Input>
        );
      }}
    </Tooltip>
  );
};

const Demo = () => {
  const methods = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = (data: FormValues) => {
    reset(defaultValues, { keepIsSubmitted: false, keepTouched: false });
    alert(JSON.stringify(data));
  };

  return (
    <FormProvider {...methods}>
      <Flex tag='form' noValidate onSubmit={handleSubmit(onSubmit)} direction='column'>
        <Text size={300} tag='label' mb={1} htmlFor='email'>
          Email
        </Text>
        <FormControl
          name='email'
          type='email'
          options={{
            validate: {
              required: (v: string) => Boolean(v) || 'Email is required',
              email: (v: string) => {
                if (!v) {
                  return true;
                }

                return /.+@.+\..+/i.test(v) || 'Email is not valid';
              },
            },
          }}
        />

        <Text size={300} tag='label' mb={1} htmlFor='password'>
          Password
        </Text>

        <FormControl
          name='password'
          type='password'
          options={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters',
            },
          }}
        />

        <Button type='submit' use='primary' theme='success' size='l' w='100%'>
          Log in
        </Button>
      </Flex>
    </FormProvider>
  );
};

export default Demo;
