---
title: Example
tabs: Form('form'), A11y('form-a11y'), Example('form-code')
---

These examples use [`react-hook-form@6`](https://github.com/react-hook-form/react-hook-form/tree/v6.15.8) library.

## Default log in form

::: sandbox

<script lang="tsx">
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
      <Flex tag='form' onSubmit={handleSubmit(onSubmit)} direction='column'>
        <Text size={300} tag='label' mb={1} htmlFor='email'>
          Email
        </Text>
        <Tooltip animationsDisabled>
          <Tooltip.Popper
            placement='right'
            theme='warning'
            visible={errors['email']}
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
            visible={errors['password']}
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
                  }) as React.ForwardedRef<HTMLInputElement>,
                })}
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


</script>

:::

## InputTags and Select

::: sandbox

<script lang="tsx">
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Select from '@semcore/ui/select';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import Counter from '@semcore/ui/counter';
import Tooltip from '@semcore/ui/tooltip';
import InputTags from '@semcore/ui/input-tags/';
import Button from '@semcore/ui/button';

const Demo = () => {
  const defaultValues = {
    period: 'Weekly',
    day_week: 'Monday',
    emails: ['first@react.hook.form', 'first@react.hook.form'],
  };
  const { handleSubmit, getValues, setValue, control, setError, errors, reset } = useForm({
    defaultValues,
  });
  const [valueTag, setValueTag] = React.useState('');

  const changeInputTagsValue = (value) => {
    reset(defaultValues);
    setValueTag(value);
  };

  const onSubmit = (data) => {
    reset(defaultValues);
    alert(JSON.stringify(data));
  };

  const handleAppendTags = (newTags) => {
    const tags = getValues('emails');
    if (newTags.some((tag) => !/.+@.+\..+/i.test(tag))) {
      setError('emails', { message: "Email don't valid" });
      return;
    }
    if (tags.length + newTags.length > 5) {
      setError('emails', { message: 'Max emails is 5' });
      return;
    }
    setValue('emails', [...tags, ...newTags]);
    changeInputTagsValue('');
  };

  const handleRemoveTag = () => {
    const tags = getValues('emails');
    if (tags.length === 0) return;
    setValue('emails', tags.slice(0, -1));
    changeInputTagsValue(`${tags.slice(-1)[0]} ${valueTag}`);
  };

  const handleCloseTag = (e) => {
    const tags = getValues('emails');
    const { dataset } = e.currentTarget;
    setValue(
      'emails',
      tags.filter((tag, ind) => ind !== Number(dataset.id)),
    );
  };

  const periods = ['Daily', 'Weekly'].map((value) => ({ value, children: value }));
  const daysWeek = ['Monday', 'Tuesday', 'Wednesday', 'Wednesday', 'Friday'].map((value) => ({
    value,
    children: value,
  }));

  return (
    <Flex tag='form' onSubmit={handleSubmit(onSubmit)} direction='column' alignItems='flex-start'>
      <Text size={300} tag='label' mb={1}>
        Email frequency
      </Text>

      <Flex mb={4}>
        <Controller
          render={(props) => <Select tag={ButtonTrigger} options={periods} {...props} />}
          control={control}
          name='period'
        />
        <Controller
          render={(props) => <Select ml={4} tag={ButtonTrigger} options={daysWeek} {...props} />}
          control={control}
          name='day_week'
        />
      </Flex>

      <Controller
        render={({ value: tags = [] }) => (
          <>
            <Text size={300} tag='label' mb={1}>
              Emails
              <Counter ml={1} size='l'>{`${tags.length}/5`}</Counter>
            </Text>
            <Tooltip
              interaction='none'
              placement='right'
              theme='warning'
              w='100%'
              animationsDisabled
            >
              <Tooltip.Popper id='form-emails-error' visible={Boolean(errors['emails'])}>
                {String(errors['emails']?.[0])}
              </Tooltip.Popper>
              <InputTags
                tag={Tooltip.Trigger}
                size='l'
                state={errors['emails'] ? 'invalid' : 'normal'}
                onAppend={handleAppendTags}
                onRemove={handleRemoveTag}
                aria-invalid={Boolean(errors['emails'])}
                aria-errormessage={errors['emails'] ? 'form-emails-error' : undefined}
              >
                {tags.map((tag, idx) => (
                  <InputTags.Tag key={tag + idx}>
                    <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
                    <InputTags.Tag.Close data-id={idx} onClick={handleCloseTag} />
                  </InputTags.Tag>
                ))}
                <InputTags.Value value={valueTag} onChange={changeInputTagsValue} />
              </InputTags>
            </Tooltip>
          </>
        )}
        control={control}
        name='emails'
      />

      <Button mt={4} type='submit' use='primary' theme='success' size='l'>
        Save
      </Button>
    </Flex>
  );
};


</script>

:::

## DatePicker and Timepicker

::: sandbox

<script lang="tsx">
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import { DatePicker } from '@semcore/ui/date-picker';
import TimePicker from '@semcore/time-picker';
import Checkbox from '@semcore/ui/checkbox';
import Button from '@semcore/ui/button';

const Demo = () => {
  const [period, setPeriod] = React.useState(false);
  const defaultValues = {
    start_date: new Date(),
    start_time: '12:00',
    due_date: new Date(),
    due_time: '12:00',
  };
  const { handleSubmit, control, reset } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const onReset = () => {
    reset(defaultValues);
  };

  const onPreventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <Flex tag='form' onSubmit={handleSubmit(onSubmit)} direction='column' alignItems='flex-start'>
      <Flex mb={4}>
        <Flex direction='column'>
          <Text size={300} tag='label' mb={1}>
            Start date
          </Text>
          <Controller
            render={(props) => <DatePicker size='l' {...props} />}
            control={control}
            name='start_date'
          />
        </Flex>
        <Flex direction='column' ml={2}>
          <Text size={300} tag='label' mb={1}>
            Time
          </Text>
          <Controller
            render={(props) => (
              <TimePicker size='l' is12Hour {...props}>
                <TimePicker.Hours />
                <TimePicker.Separator />
                <TimePicker.Minutes />
                <TimePicker.Format onClick={onPreventDefault} />
              </TimePicker>
            )}
            control={control}
            name='start_time'
          />
        </Flex>
      </Flex>

      <Checkbox mb={4} size='l'>
        <Checkbox.Value onChange={setPeriod} />
        <Checkbox.Text>Period</Checkbox.Text>
      </Checkbox>

      {period && (
        <Flex mb={4}>
          <Flex direction='column'>
            <Text size={300} tag='label' mb={1}>
              Due date
            </Text>
            <Controller
              render={(props) => <DatePicker size='l' {...props} />}
              control={control}
              name='due_date'
            />
          </Flex>
          <Flex direction='column' ml={2}>
            <Text size={300} tag='label' mb={1}>
              Time
            </Text>
            <Controller
              render={(props) => (
                <TimePicker size='l' is12Hour {...props}>
                  <TimePicker.Hours />
                  <TimePicker.Separator />
                  <TimePicker.Minutes />
                  <TimePicker.Format onClick={onPreventDefault} />
                </TimePicker>
              )}
              control={control}
              name='due_time'
            />
          </Flex>
        </Flex>
      )}

      <Flex>
        <Button type='submit' use='primary' theme='success' size='l'>
          Create
        </Button>
        <Button ml={2} size='l' onClick={onReset}>
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};


</script>

:::

## Checkbox and Radio

::: sandbox

<script lang="tsx">
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import Checkbox from '@semcore/ui/checkbox';
import Select from '@semcore/ui/select';
import { ButtonTrigger } from '@semcore/ui/base-trigger';
import Button from '@semcore/ui/button';

const Demo = () => {
  const [selected, setSelected] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [selectedFirst, setSelectedFirst] = React.useState(0);
  const defaultValues = {
    export: 'all',
  };
  const { handleSubmit, control, reset, errors, setError } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    if (data.export === 'first') {
      if (!selectedFirst) {
        setError('export', { message: 'Require enter value' });
        return;
      } else {
        data.export = `first ${selectedFirst}`;
      }
    }
    if (data.export === 'selected') {
      if (!selectedValue.length) {
        setError('export', { message: 'Require chouse value' });
        return;
      } else {
        data.export = `selected [${selectedValue.join(',')}]`;
      }
    }
    reset(defaultValues);
    setSelected(false);
    setSelectedValue([]);
    setSelectedFirst(0);
    alert(JSON.stringify(data));
  };

  const optionsFirst = [100, 500].map((value) => ({ value, children: value }));
  const onChangeSelect = (value) => {
    reset({ export: 'first' });
    setSelectedFirst(value);
  };
  const onChangCheckbox = (checked, e) => {
    const { value } = e.target;
    const tmpArray = checked ? [...selectedValue, value] : selectedValue.filter((v) => v !== value);
    tmpArray.length && reset({ export: 'selected' });
    setSelectedValue(tmpArray);
  };
  const onSelectedRadio = () => {
    setSelected(!selected);
  };

  return (
    <Flex tag='form' onSubmit={handleSubmit(onSubmit)} direction='column' alignItems='flex-start'>
      <Flex direction='column' mb={4}>
        <Text size={300} tag='label' mb={4}>
          Export data
        </Text>
        <Controller
          render={({ value, ...props }) => (
            <RadioGroup {...props} value={value} size='l'>
              <Radio mb={3}>
                <Radio.Value value='all' />
                <Radio.Text>All</Radio.Text>
              </Radio>
              <Radio mb={3}>
                <Radio.Value value='selected' onChange={onSelectedRadio} />
                <Radio.Text>Selected</Radio.Text>
                {selected &&
                  [100, 500].map((v) => (
                    <Checkbox
                      size='l'
                      ml={2}
                      key={v}
                      state={value.includes('selected') && errors['export'] ? 'invalid' : 'normal'}
                    >
                      <Checkbox.Value value={v} onChange={onChangCheckbox} />
                      <Checkbox.Text children={v} />
                    </Checkbox>
                  ))}
              </Radio>
              <Radio style={{ alignItems: 'center' }}>
                <Radio.Value value='first' />
                <Radio.Text>First</Radio.Text>
                <Select
                  size='l'
                  ml={2}
                  state={value.includes('first') && errors['export'] ? 'invalid' : 'normal'}
                  tag={ButtonTrigger}
                  options={optionsFirst}
                  onChange={onChangeSelect}
                />
              </Radio>
            </RadioGroup>
          )}
          control={control}
          name='export'
        />
      </Flex>

      <Button type='submit' use='primary' theme='info' size='l'>
        Excel
      </Button>
    </Flex>
  );
};


</script>

:::
