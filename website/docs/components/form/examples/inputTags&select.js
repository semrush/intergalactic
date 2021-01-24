import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Select from '@semcore/select';
import { ButtonTrigger } from '@semcore/base-trigger';
import Counter from '@semcore/counter';
import Tooltip from '@semcore/tooltip';
import InputTags from '@semcore/input-tags/';
import Button from '@semcore/button';

const Demo = () => {
  const defaultValues = {
    period: 'Weekly',
    day_week: 'Monday',
    emails: ['first@react.hook.form', 'first@react.hook.form'],
  };
  const { register, handleSubmit, getValues, setValue, control, setError, errors, reset } = useForm(
    {
      defaultValues,
    },
  );
  const [valueTag, updateValueTag] = React.useState('');

  const changeInputTagsValue = (value) => {
    const emails = getValues('emails');
    reset(defaultValues);
    updateValueTag(value);
  };

  const onSubmit = (data) => {
    reset(defaultValues);
    alert(JSON.stringify(data));
  };

  const handleAddTag = (value) => {
    const tags = getValues('emails');
    if (!/.+@.+\..+/i.test(value)) {
      setError('emails', { message: "Email don't valid" });
      return;
    }
    if (tags.length === 5) {
      setError('emails', { message: 'Max emails is 5' });
      return;
    }
    setValue('emails', [...tags, value]);
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
    setValue('emails', tags.filter((tag, ind) => ind !== Number(dataset.id)));
  };

  const periods = ['Daily', 'Weekly'].map((value) => ({ value, children: value }));
  const daysWeek = ['Monday', 'Tuesday', 'Wednesday', 'Wednesday', 'Friday'].map((value) => ({
    value,
    children: value,
  }));

  return (
    <Flex tag="form" onSubmit={handleSubmit(onSubmit)} direction="column" alignItems="flex-start">
      <Text size={200} tag="label" mb={1}>
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
            <Text size={200} tag="label" mb={1}>
              Emails
              <Counter ml={1} size="l">{`${tags.length}/5`}</Counter>
            </Text>
            <Tooltip
              interaction="none"
              visible={Boolean(errors['emails'])}
              placement="right"
              theme="warning"
              title={errors['emails']?.message}
              w="100%"
            >
              <InputTags
                size="l"
                state={errors['emails'] ? 'invalid' : 'normal'}
                onAdd={handleAddTag}
                onRemove={handleRemoveTag}
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
