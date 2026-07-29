import { Flex } from '@semcore/ui/base-components';
import BulkTextarea from '@semcore/ui/bulk-textarea';
import Button from '@semcore/ui/button';
import Flag, { iso2Name } from '@semcore/ui/flags';
import Input from '@semcore/ui/input';
import InputTags from '@semcore/ui/input-tags';
import Textarea from '@semcore/ui/textarea';
import { Text } from '@semcore/ui/typography';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

type FormValues = {
  country: string;
  tags: string[];
  comment: string;
  bulkComment: string;
};

const defaultValues: FormValues = {
  country: '',
  tags: ['Tag name', 'Tag name'],
  comment: '',
  bulkComment: '',
};

type VerticalFormRowProps = {
  size: 'm' | 'l';
};

const VerticalFormRow = ({ size }: VerticalFormRowProps) => {
  const labelSize = size === 'm' ? 200 : 300;
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
      direction='column'
      alignItems='flex-start'
      gap={4}
      w='100%'
    >
      <Flex direction='column' w='100%'>
        <Text tag='label' size={labelSize} mb={2} htmlFor={`country-${size}`}>
          Country
        </Text>
        <Controller
          render={({ field }) => (
            <Input w='100%' size={size}>
              <Input.Addon>
                <Flag iso2='NO' role='img' aria-label={iso2Name['NO']} />
              </Input.Addon>
              <Input.Value
                {...field}
                id={`country-${size}`}
                placeholder='Placeholder'
              />
            </Input>
          )}
          control={control}
          name='country'
        />
      </Flex>

      <Flex direction='column' w='100%'>
        <Text tag='label' size={labelSize} mb={2} htmlFor={`tags-${size}`}>
          Tags
        </Text>
        <Controller
          render={({ field: { value: tags = [] } }) => (
            <InputTags
              size={size}
              w='100%'
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
                id={`tags-${size}`}
                placeholder='Placeholder'
                value={valueTag}
                onChange={setValueTag}
              />
            </InputTags>
          )}
          control={control}
          name='tags'
        />
      </Flex>

      <Flex direction='column' w='100%'>
        <Text tag='label' size={labelSize} mb={2} htmlFor={`comment-${size}`}>
          Comment
        </Text>
        <Controller
          render={({ field }) => (
            <Textarea
              {...field}
              id={`comment-${size}`}
              size={size}
              minRows={2}
              w='100%'
              placeholder='Placeholder'
            />
          )}
          control={control}
          name='comment'
        />
      </Flex>

      <Flex direction='column' w='100%'>
        <Text tag='label' size={labelSize} mb={2} id={`bulk-comment-label-${size}`}>
          Bulk comment
        </Text>
        <Controller
          render={({ field }) => (
            <BulkTextarea
              {...field}
              size={size}
              minRows={2}
              w='100%'
              placeholder='Placeholder'
            >
              <BulkTextarea.InputField
                aria-labelledby={`bulk-comment-label-${size}`}
              />
            </BulkTextarea>
          )}
          control={control}
          name='bulkComment'
        />
      </Flex>

      <Button type='submit' use='primary' theme='info' size={size} wMin={120}>
        Primary button
      </Button>
    </Flex>
  );
};

const Demo = () => (
  <Flex direction='row' gap={8} w='100%'>
    <VerticalFormRow size='m' />
    <VerticalFormRow size='l' />
  </Flex>
);

export default Demo;
