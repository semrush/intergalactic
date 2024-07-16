import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';
import Select from 'intergalactic/select';
import { ButtonTrigger } from 'intergalactic/base-trigger';
import Counter from 'intergalactic/counter';
import Tooltip from 'intergalactic/tooltip';
import InputTags from 'intergalactic/input-tags/';
import Button from 'intergalactic/button';

const Demo = () => {
  const defaultValues = {
    period: 'Weekly',
    day_week: 'Monday',
    emails: ['first@react.hook.form', 'first@react.hook.form'],
  };
  const { handleSubmit, getValues, setValue, control, setError, errors } = useForm({
    defaultValues,
  });
  const [valueTag, setValueTag] = React.useState('');

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const handleAppendTags = (newTags) => {
    const tags = getValues('emails');
    if (newTags.some((tag) => !/.+@.+\..+/i.test(tag))) {
      setError('emails', { message: "Email isn't valid" });
      return;
    }
    if (tags.length + newTags.length > 5) {
      setError('emails', { message: 'Max emails is 5' });
      return;
    }
    setValue('emails', [...tags, ...newTags]);
    setValueTag('');
  };

  const handleRemoveTag = () => {
    const tags = getValues('emails');
    if (tags.length === 0) return;
    setValue('emails', tags.slice(0, -1));
    setValueTag(`${tags.slice(-1)[0]} ${valueTag}`);
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
              placement='bottom'
              theme='warning'
              w='100%'
              animationsDisabled
              visible={Boolean(errors['emails'])}
            >
              <Tooltip.Trigger
                tag={InputTags}
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
                <InputTags.Value value={valueTag} onChange={setValueTag} />
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

      <Button mt={4} type='submit' use='primary' theme='success' size='l'>
        Save
      </Button>
    </Flex>
  );
};

export default Demo;
