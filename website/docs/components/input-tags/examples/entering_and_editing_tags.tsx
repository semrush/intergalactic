import React from 'react';
import InputTags from 'intergalactic/input-tags';
import Tooltip from 'intergalactic/tooltip';

const Demo = () => {
  const inputValueRef = React.useRef<HTMLInputElement>();
  const [tags, setTags] = React.useState(['vk', 'fk', 'twitter', 'instagram']);
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
    <InputTags size='l' onAppend={handleAppendTags} onRemove={handleRemoveTag}>
      {tags.map((tag, idx) => (
        <Tooltip key={idx}>
          <Tooltip.Trigger
            tag={InputTags.Tag}
            theme='primary'
            editable
            data-id={idx}
            onClick={handleEditTag}
            onKeyDown={handleTagKeyDown}
          >
            <InputTags.Tag.Text tabIndex={0}>{tag}</InputTags.Tag.Text>
            <InputTags.Tag.Close onClick={handleCloseTag} />
          </Tooltip.Trigger>
          <Tooltip.Popper>tag</Tooltip.Popper>
        </Tooltip>
      ))}
      <InputTags.Value
        value={value}
        onChange={setValue}
        onKeyDown={handleInputKeyDown}
        ref={inputValueRef}
        aria-label='Input with tags'
      />
    </InputTags>
  );
};

export default Demo;
