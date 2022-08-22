import React, { useState } from 'react';
import Tag from '@semcore/tag';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  const [tags, updateTags] = useState(['vk', 'fk', 'twitter', 'instagram']);

  const handleKey = (e) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      handleEditTag(e);
    }
  };

  const handleEditTag = (e) => {
    const { dataset } = e.currentTarget.parentElement;
    let allTags = [...tags];
    updateTags(allTags.filter((tag, ind) => ind !== Number(dataset.id)));

    return false;
  };

  return (
    <Box>
      {tags.map((tag, idx) => (
        <Tag theme="primary" editable data-id={idx}>
          <Tag.Text>{tag}</Tag.Text>
          <Tag.Close onClick={handleEditTag} onKeyDown={handleKey} />
        </Tag>
      ))}
    </Box>
  );
};

export default Demo;
