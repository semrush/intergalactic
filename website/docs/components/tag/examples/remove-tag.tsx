import React, { useState } from 'react';
import Tag from '@semcore/ui/tag';
import { Box } from '@semcore/ui/flex-box';

const Demo = () => {
  const [tags, setTags] = useState(['vk', 'fk', 'twitter', 'instagram']);

  const handleEditTag = (e) => {
    const { dataset } = e.currentTarget.parentElement;
    const allTags = [...tags];
    setTags(allTags.filter((tag, ind) => ind !== Number(dataset.id)));

    return false;
  };

  return (
    <Box>
      {tags.map((tag, idx) => (
        <Tag theme='primary' interactive data-id={idx} key={idx} mr={1}>
          <Tag.Text>{tag}</Tag.Text>
          <Tag.Close onClick={handleEditTag} />
        </Tag>
      ))}
    </Box>
  );
};
