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
    changeInputTagsValue(tags.slice(-1)[0] + ` ${valueTag}`);
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
    <Flex tag="form" onSubmit={handleSubmit(onSubmit)} direction="column" alignItems="flex-start">
      <Text size={300} tag="label" mb={1}>
        Email frequency
      </Text>

      <Flex mb={4}>
        <Controller
          render={(props) => <Select tag={ButtonTrigger} options={periods} {...props} />}
          control={control}
          name="period"
        />
        <Controller
          render={(props) => <Select ml={4} tag={ButtonTrigger} options={daysWeek} {...props} />}
          control={control}
          name="day_week"
        />
      </Flex>

      <Controller
        render={({ value: tags = [] }) => (
          <>
            <Text size={300} tag="label" mb={1}>
              Emails
              <Counter ml={1} size="l">{`${tags.length}/5`}</Counter>
            </Text>
            <Tooltip interaction="none" placement="right" theme="warning" w="100%">
              <Tooltip.Popper id="form-emails-error" visible={Boolean(errors['emails'])}>
                {errors['emails']?.message}
              </Tooltip.Popper>
              <InputTags
                size="l"
                state={errors['emails'] ? 'invalid' : 'normal'}
                onAppend={handleAppendTags}
                onRemove={handleRemoveTag}
                aria-invalid={Boolean(errors['emails'])}
                aria-errormessage={errors['emails'] ? 'form-emails-error' : undefined}
              >
                {tags.map((tag, idx) => (
                  <InputTags.Tag key={tag + idx} use="primary" theme="asphalt">
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
        name="emails"
      />

      <Button mt={4} type="submit" use="primary" theme="success" size="l">
        Save
      </Button>
    </Flex>
  );
};

export default Demo;
