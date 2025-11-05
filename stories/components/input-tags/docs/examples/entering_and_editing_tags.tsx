import { Flex } from '@semcore/ui/base-components';
import Ellipsis from '@semcore/ui/ellipsis';
import InputTags from '@semcore/ui/input-tags';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const inputValueRef = React.useRef<HTMLInputElement>(null);
  const [tags, setTags] = React.useState([
    'TikTok',
    'Facebook',
    'LinkedIn',
    'Instagram',
    'Social media with a very long name',
  ]);
  const [value, setValue] = React.useState('');

  const handleAppendTags = (newTags: string[]) => {
    setTags((tags) => [...tags, ...newTags]);
    setValue('');
  };

  const handleRemoveTag = () => {
    if (tags.length === 0) return;
    setTags(tags.slice(0, -1));
    setValue(`${tags.slice(-1)[0]} ${value}`);
  };

  const handleCloseTag = (idx: number) => (e: React.SyntheticEvent) => {
    e.stopPropagation();

    setTags((tags) => tags.filter((_, tagIdx) => idx !== tagIdx));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      handleEditTag(e);
    }
    return false;
  };

  const handleEditTag = (
    e: React.SyntheticEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => {
    const { dataset } = e.currentTarget;
    let allTags = [...tags];
    if (value) {
      allTags = [...allTags, value];
    }
    setTags(allTags.filter((tag, ind) => ind !== Number(dataset.id)));
    if (!e.defaultPrevented && dataset.id !== undefined) {
      setValue(tags[Number(dataset.id)]);
      inputValueRef.current?.focus();
    }
    return false;
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.target instanceof HTMLInputElement ? e.target.value : null;
    if (e.key === 'Enter' && value) {
      handleAppendTags([value]);

      return false;
    }
  };

  return (
    <Flex direction='column'>
      <Text tag='label' size={300} htmlFor='add-new-social-media'>
        Social media
      </Text>
      <InputTags mt={2} size='l' onAppend={handleAppendTags} onRemove={handleRemoveTag}>
        {tags.map((tag, idx) => (
          <InputTags.Tag
            key={tag}
            tag={InputTags.Tag}
            theme='primary'
            data-id={idx}
            onClick={handleEditTag}
            onKeyDown={handleTagKeyDown}
            active={false}
          >
            <InputTags.Tag.Text>
              <Ellipsis wMax={100}>{tag}</Ellipsis>
            </InputTags.Tag.Text>
            <InputTags.Tag.Close onClick={handleCloseTag(idx)} />
          </InputTags.Tag>
        ))}
        <InputTags.Value
          value={value}
          onChange={setValue}
          onKeyDown={handleInputKeyDown}
          ref={inputValueRef}
          id='add-new-social-media'
          placeholder='Add social media'
        />
      </InputTags>
    </Flex>
  );
};

export default Demo;
