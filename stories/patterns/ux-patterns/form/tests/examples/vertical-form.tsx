import { Flex } from '@semcore/ui/base-components';
import BulkTextarea from '@semcore/ui/bulk-textarea';
import Button from '@semcore/ui/button';
import Flag, { iso2Name } from '@semcore/ui/flags';
import Input from '@semcore/ui/input';
import InputTags from '@semcore/ui/input-tags';
import Textarea from '@semcore/ui/textarea';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type VerticalFormRowProps = {
  size: 'm' | 'l';
};

const VerticalFormRow = ({ size }: VerticalFormRowProps) => {
  const labelSize = size === 'm' ? 200 : 300;
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
      direction='column'
      alignItems='flex-start'
      gap={4}
      w='100%'
    >
      <Flex direction='column' w='100%'>
        <Text tag='label' size={labelSize} mb={2} htmlFor={`country-${size}`}>
          Country
        </Text>
        <Input w='100%' size={size}>
          <Input.Addon>
            <Flag iso2='NO' role='img' aria-label={iso2Name['NO']} />
          </Input.Addon>
          <Input.Value
            id={`country-${size}`}
            value={country}
            onChange={setCountry}
            placeholder='Placeholder'
          />
        </Input>
      </Flex>

      <Flex direction='column' w='100%'>
        <Text tag='label' size={labelSize} mb={2} htmlFor={`tags-${size}`}>
          Tags
        </Text>
        <InputTags
          size={size}
          w='100%'
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
            id={`tags-${size}`}
            placeholder='Placeholder'
            value={valueTag}
            onChange={setValueTag}
          />
        </InputTags>
      </Flex>

      <Flex direction='column' w='100%'>
        <Text tag='label' size={labelSize} mb={2} htmlFor={`comment-${size}`}>
          Comment
        </Text>
        <Textarea
          id={`comment-${size}`}
          value={comment}
          onChange={setComment}
          size={size}
          minRows={2}
          w='100%'
          placeholder='Placeholder'
        />
      </Flex>

      <Flex direction='column' w='100%'>
        <Text tag='label' size={labelSize} mb={2} id={`bulk-comment-label-${size}`}>
          Bulk comment
        </Text>
        <BulkTextarea
          value={bulkComment}
          onChange={setBulkComment}
          size={size}
          minRows={2}
          w='100%'
          placeholder='Placeholder'
        >
          <BulkTextarea.InputField
            aria-labelledby={`bulk-comment-label-${size}`}
            commonErrorMessage=''
          />
        </BulkTextarea>
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
