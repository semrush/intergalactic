import React, { useState } from 'react';
import Tag from '@semcore/tag';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  const [tags, updateTags] = useState(['vk', 'fk', 'twitter', 'instagram']);

  const handleEditTag = (e) => {
    const { dataset } = e.currentTarget.parentElement;
    let allTags = [...tags];
    updateTags(allTags.filter((tag, ind) => ind !== Number(dataset.id)));

    return false;
  };

  return (
    <Box>
      {tags.map((tag, idx) => (
        <Tag theme="primary" editable data-id={idx} key={idx}>
          <Tag.Text>{tag}</Tag.Text>
          <Tag.Close onClick={handleEditTag} />
        </Tag>
      ))}
    </Box>
  );
};

export default Demo;
