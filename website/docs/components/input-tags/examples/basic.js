import React, { useState } from 'react';
import InputTags from '@semcore/input-tags';
import Tag from '@semcore/tag';
import Tooltip from '@semcore/tooltip';

const Demo = () => {
  const [tags, updateTags] = useState(['vk', 'fk', 'twitter', 'instagram']);
  const [value, updateValue] = useState('');

  const handleAddTag = (value) => {
    updateTags((tags) => [...tags, value]);
    updateValue('');
  };

  const handleRemoveTag = () => {
    if (tags.length === 0) return;
    updateTags(tags.slice(0, -1));
    updateValue(tags.slice(-1)[0] + ` ${value}`);
  };

  const handleCloseTag = (e) => {
    const { dataset } = e.currentTarget;
    updateTags(tags.filter((tag, ind) => ind !== Number(dataset.id)));
  };

  return (
    <InputTags size="l" onAdd={handleAddTag} onRemove={handleRemoveTag}>
      {tags.map((tag, idx) => (
        <Tooltip key={idx}>
          <Tooltip.Trigger tag={InputTags.Tag} use="primary" theme="asphalt" editable>
            <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
            <InputTags.Tag.Close data-id={idx} onClick={handleCloseTag} />
          </Tooltip.Trigger>
          <Tooltip.Popper>tag</Tooltip.Popper>
        </Tooltip>
      ))}
      <InputTags.Value value={value} onChange={updateValue} />
    </InputTags>
  );
};

export default Demo;
