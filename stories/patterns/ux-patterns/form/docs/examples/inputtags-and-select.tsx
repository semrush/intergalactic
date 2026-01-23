import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Counter from '@semcore/ui/counter';
import InputTags from '@semcore/ui/input-tags/';
import Select from '@semcore/ui/select';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const Demo = () => {
  const defaultValues = {
    period: 'Weekly',
    day_week: 'Monday',
    emails: ['first@react.hook.form', 'second@react.hook.form'],
  };
  const {
    handleSubmit,
    getValues,
    setValue,
    control,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues,
  });
  const [valueTag, setValueTag] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);

  const onSubmit = (data: typeof defaultValues) => {
    alert(JSON.stringify(data));
  };

  const isEmailValid = (val: string) => /.+@.+\..+/i.test(val);

  const handleAppendTags = (newTags: string[]) => {
    const tags = getValues('emails');
    if (newTags.some((tag) => !isEmailValid(tag))) {
      setError('emails', { message: 'Email isn\'t valid.' });
      return;
    }
    if (tags.length + newTags.length > 5) {
      setError('emails', { message: 'There must be no more than 5 emails.' });
      return;
    }
    setValue('emails', [...tags, ...newTags]);
    setValueTag('');
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value && !isEmailValid(e.target.value)) {
      setError('emails', { message: 'Email isn\'t valid.' });
    }
    setIsFocused(false);
  };

  const handleInputChange = (value: string) => {
    setValueTag(value);

    if (!value || isEmailValid(value)) {
      clearErrors();
    }
  };

  const handleRemoveTag = () => {
    const tags = getValues('emails');
    if (tags.length === 0) return;
    setValue('emails', tags.slice(0, -1));
    setValueTag(`${tags.slice(-1)[0]} ${valueTag}`);
  };

  const handleCloseTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tags = getValues('emails');
    const { dataset } = e.currentTarget;
    setValue(
      'emails',
      tags.filter((_tag, idx) => idx !== Number(dataset.id)),
    );
  };

  const periods = ['Daily', 'Weekly'].map((value) => ({ value, children: value }));
  const daysWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((value) => ({
    value,
    children: value,
  }));

  const emailInvalid = Boolean(errors.emails);
  const showError = isFocused && emailInvalid;

  return (
    <Flex tag='form' onSubmit={handleSubmit(onSubmit)} direction='column' alignItems='flex-start'>
      <Text size={300} tag='label' mb={2} htmlFor='period'>
        Email frequency
      </Text>

      <Flex mb={4} gap={4}>
        <Controller
          render={({ field }) => <Select size='l' id='period' options={periods} {...field} />}
          control={control}
          name='period'
        />
        {watch('period') === 'Weekly' && (
          <Controller
            render={({ field }) => (
              <Select size='l' aria-label='Day' options={daysWeek} {...field} />
            )}
            control={control}
            name='day_week'
          />
        )}
      </Flex>

      <Controller
        render={({ field: { value: tags = [] } }) => (
          <>
            <Flex>
              <Text size={300} tag='label' mb={2} htmlFor='emails'>
                Emails
              </Text>

              <Counter
                ml={1}
                size='l'
                theme={tags.length < 5 ? '' : 'warning'}
              >
                {`${tags.length}/5`}
              </Counter>
            </Flex>
            <Tooltip
              interaction='none'
              placement='right'
              theme='warning'
              w='100%'
              animationsDisabled
              visible={showError}
            >
              <Tooltip.Trigger
                tag={InputTags}
                size='l'
                state={emailInvalid ? 'invalid' : 'normal'}
                onAppend={handleAppendTags}
                onRemove={handleRemoveTag}
              >
                {tags.map((tag, idx) => (
                  <InputTags.Tag key={idx}>
                    <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
                    <InputTags.Tag.Close data-id={idx} onClick={handleCloseTag} />
                  </InputTags.Tag>
                ))}
                <InputTags.Value
                  id='emails'
                  name='email'
                  type='email'
                  autoComplete='email'
                  value={valueTag}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onFocus={() => setIsFocused(true)}
                  aria-invalid={emailInvalid}
                  aria-describedby={showError ? 'form-emails-error' : undefined}
                  __excludeProps={['aria-haspopup']}
                />
              </Tooltip.Trigger>
              <Tooltip.Popper id='form-emails-error'>
                {String((errors['emails'] as any)?.message)}
              </Tooltip.Popper>
            </Tooltip>
          </>
        )}
        control={control}
        name='emails'
      />

      <Button mt={6} type='submit' use='primary' theme='success' size='l' wMin={120}>
        Save
      </Button>
    </Flex>
  );
};

export default Demo;
