import React from 'react';
import InputTags from 'intergalactic/input-tags';
import Ellipsis from 'intergalactic/ellipsis';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const Demo = () => {
  const inputValueRef = React.useRef<HTMLInputElement>();
  const [tags, setTags] = React.useState([
    'TikTok',
    'Facebook',
    'LinkedIn',
    'Instagram',
    'Some secret social network with a very long name',
  ]);
  const [value, setValue] = React.useState('');

  const handleAppendTags = (newTags) => {
    setTags((tags) => [...tags, ...newTags]);
    setValue('');
  };

  const handleRemoveTag = () => {
    if (tags.length === 0) return;
    setTags(tags.slice(0, -1));
    setValue(`${tags.slice(-1)[0]} ${value}`);
  };

  const handleCloseTag = (e) => {
    e.preventDefault();
  };

  const handleTagKeyDown = (e) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      handleEditTag(e);
    }
    return false;
  };

  const handleEditTag = (e) => {
    const { dataset } = e.currentTarget;
    let allTags = [...tags];
    if (value) {
      allTags = [...allTags, value];
    }
    setTags(allTags.filter((tag, ind) => ind !== Number(dataset.id)));
    if (!e.defaultPrevented) {
      setValue(tags[dataset.id]);
      inputValueRef.current?.focus();
    }
    return false;
  };

  const handleInputKeyDown = (e) => {
    const { value } = e.target;
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
            key={idx}
            tag={InputTags.Tag}
            theme='primary'
            editable
            data-id={idx}
            onClick={handleEditTag}
            onKeyDown={handleTagKeyDown}
            active={false}
          >
            <InputTags.Tag.Text>
              <Ellipsis wMax={100}>{tag}</Ellipsis>
            </InputTags.Tag.Text>
            <InputTags.Tag.Close onClick={handleCloseTag} />
          </InputTags.Tag>
        ))}
        <InputTags.Value
          value={value}
          onChange={setValue}
          onKeyDown={handleInputKeyDown}
          ref={inputValueRef}
          id='add-new-social-media'
        />
      </InputTags>
    </Flex>
  );
};

export default Demo;
