import { Flex } from '@semcore/ui/base-components';
import BulkTextarea from '@semcore/ui/bulk-textarea';
import Button from '@semcore/ui/button';
import Flag, { iso2Name } from '@semcore/ui/flags';
import Input from '@semcore/ui/input';
import InputTags from '@semcore/ui/input-tags';
import Textarea from '@semcore/ui/textarea';
import React from 'react';

type HorizontalFormRowProps = {
  size: 'm' | 'l';
};

const HorizontalFormRow = ({ size }: HorizontalFormRowProps) => {
  const [country, setCountry] = React.useState('');
  const [tags, setTags] = React.useState(['Tag name', 'Tag name']);
  const [valueTag, setValueTag] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [bulkComment, setBulkComment] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(JSON.stringify({ country, tags, comment, bulkComment }));
  };

  const handleAppendTags = (newTags: string[]) => {
    setTags((currentTags) => [...currentTags, ...newTags]);
    setValueTag('');
  };

  const handleRemoveTag = () => {
    setTags((currentTags) => {
      if (currentTags.length === 0) return currentTags;
      setValueTag((currentValueTag) => `${currentTags.slice(-1)[0]} ${currentValueTag}`);
      return currentTags.slice(0, -1);
    });
  };

  const handleCloseTag = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(event.currentTarget.dataset.index);
    setTags((currentTags) => currentTags.filter((_, tagIndex) => tagIndex !== index));
  };

  return (
    <Flex
      tag='form'
      onSubmit={handleSubmit}
      alignItems='flex-start'
      gap={2}
      w='100%'
    >
      <Input size={size}>
        <Input.Addon>
          <Flag iso2='NO' role='img' aria-label={iso2Name['NO']} />
        </Input.Addon>
        <Input.Value
          value={country}
          onChange={setCountry}
          placeholder='Placeholder'
          aria-label='Country'
        />
      </Input>

      <InputTags
        size={size}
        aria-label='Tags'
        onAppend={handleAppendTags}
        onRemove={handleRemoveTag}
      >
        {tags.map((tag, idx) => (
          <InputTags.Tag key={idx}>
            <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
            <InputTags.Tag.Close data-index={idx} onClick={handleCloseTag} />
          </InputTags.Tag>
        ))}
        <InputTags.Value
          placeholder='Placeholder'
          value={valueTag}
          onChange={setValueTag}
        />
      </InputTags>

      <Textarea
        value={comment}
        onChange={setComment}
        size={size}
        minRows={2}
        placeholder='Placeholder'
        aria-label='Comment'
      />

      <BulkTextarea
        value={bulkComment}
        onChange={setBulkComment}
        size={size}
        minRows={2}
        w='100%'
        placeholder='Placeholder'
      >
        <BulkTextarea.InputField aria-label='Bulk comment' commonErrorMessage='' />
      </BulkTextarea>

      <Button type='submit' use='primary' theme='info' size={size}>
        Primary button
      </Button>
    </Flex>
  );
};

const Demo = () => (
  <Flex direction='column' gap={4} w='100%'>
    <HorizontalFormRow size='m' />
    <HorizontalFormRow size='l' />
  </Flex>
);

export default Demo;
