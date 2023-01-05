import React, { useState } from 'react';
import InputTags from '@semcore/ui/input-tags';
import Tooltip from '@semcore/ui/tooltip';

const Demo = () => {
  const [tags, updateTags] = useState(['vk', 'fk', 'twitter', 'instagram']);
  const [value, updateValue] = useState('');

  const handleAppendTags = (newTags) => {
    updateTags((tags) => [...tags, ...newTags]);
    updateValue('');
  };

  const handleRemoveTag = () => {
    if (tags.length === 0) return;
    updateTags(tags.slice(0, -1));
    updateValue(tags.slice(-1)[0] + ` ${value}`);
  };

  const handleCloseTag = (e) => {
    e.preventDefault();
  };

  const handleEditTag = (e) => {
    const { dataset } = e.currentTarget;
    let allTags = [...tags];
    if (value) {
      allTags = [...allTags, value];
    }
    updateTags(allTags.filter((tag, ind) => ind !== Number(dataset.id)));
    if (!e.defaultPrevented) {
      updateValue(tags[dataset.id]);
    }
    return false;
  };

  const handleBlurInput = (e) => {
    const { value } = e.currentTarget;
    if (value) handleAppendTags([value]);
  };

  return (
    <InputTags size="l" onAppend={handleAppendTags} onRemove={handleRemoveTag}>
      {tags.map((tag, idx) => (
        <Tooltip key={idx}>
          <Tooltip.Trigger
            tag={InputTags.Tag}
            theme="primary"
            editable
            data-id={idx}
            onClick={handleEditTag}
          >
            <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
            <InputTags.Tag.Close onClick={handleCloseTag} />
          </Tooltip.Trigger>
          <Tooltip.Popper>tag</Tooltip.Popper>
        </Tooltip>
      ))}
      <InputTags.Value
        value={value}
        onChange={updateValue}
        onBlur={handleBlurInput}
        aria-label="Input with tags"
      />
    </InputTags>
  );
};

export default Demo;
