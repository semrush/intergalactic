import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Flag, { iso2Name } from '@semcore/ui/flags';
import Input from '@semcore/ui/input';
import InputTags from '@semcore/ui/input-tags';
import Textarea from '@semcore/ui/textarea';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

type FormValues = {
  country: string;
  tags: string[];
  comment: string;
};

const defaultValues: FormValues = {
  country: '',
  tags: ['Tag name', 'Tag name'],
  comment: '',
};

type HorizontalFormRowProps = {
  size: 'm' | 'l';
};

const HorizontalFormRow = ({ size }: HorizontalFormRowProps) => {
  const { handleSubmit, control, getValues, setValue } = useForm({ defaultValues });
  const [valueTag, setValueTag] = React.useState('');

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data));
  };

  const handleAppendTags = (newTags: string[]) => {
    const tags = getValues('tags');
    setValue('tags', [...tags, ...newTags]);
    setValueTag('');
  };

  const handleRemoveTag = () => {
    const tags = getValues('tags');
    if (tags.length === 0) return;
    setValue('tags', tags.slice(0, -1));
    setValueTag(`${tags.slice(-1)[0]} ${valueTag}`);
  };

  const handleCloseTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tags = getValues('tags');
    const { dataset } = e.currentTarget;
    setValue(
      'tags',
      tags.filter((_tag, idx) => idx !== Number(dataset.id)),
    );
  };

  return (
    <Flex
      tag='form'
      onSubmit={handleSubmit(onSubmit)}
      direction='row'
      alignItems='flex-start'
      gap={2}
      w='100%'
    >
      <Controller
        render={({ field }) => (
          <Input w={241} size={size} flex='0 0 auto'>
            <Input.Addon>
              <Flag iso2='NO' role='img' aria-label={iso2Name['NO']} />
            </Input.Addon>
            <Input.Value
              {...field}
              placeholder='Placeholder'
              aria-label='Country'
            />
          </Input>
        )}
        control={control}
        name='country'
      />

      <Controller
        render={({ field: { value: tags = [] } }) => (
          <InputTags
            size={size}
            flex='1 1 0'
            aria-label='Tags'
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
              placeholder='Placeholder'
              value={valueTag}
              onChange={setValueTag}
            />
          </InputTags>
        )}
        control={control}
        name='tags'
      />

      <Controller
        render={({ field }) => (
          <Textarea
            {...field}
            size={size}
            minRows={2}
            flex='1 1 0'
            placeholder='Placeholder'
            aria-label='Comment'
          />
        )}
        control={control}
        name='comment'
      />

      <Button type='submit' use='primary' theme='info' size={size} flex='0 0 auto'>
        Primary button
      </Button>
    </Flex>
  );
};

const Demo = () => (
  <Flex direction='column' gap={4} w='60%'>
    <HorizontalFormRow size='m' />
    <HorizontalFormRow size='l' />
  </Flex>
);

export default Demo;
