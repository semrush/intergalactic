import React from 'react';
import Tag from 'intergalactic/tag';
import { Box } from 'intergalactic/flex-box';

const Demo = () => {
  const [tags, setTags] = React.useState(['Facebook', 'X (Twitter)', 'Instagram']);

  const handleEditTag = (e) => {
    const { dataset } = e.currentTarget.parentElement;
    const allTags = [...tags];
    setTags(allTags.filter((tag, ind) => ind !== Number(dataset.id)));

    return false;
  };

  return (
    <Box>
      {tags.map((tag, idx) => (
        <Tag theme='primary' size='l' interactive data-id={idx} key={idx} mr={1}>
          <Tag.Text>{tag}</Tag.Text>
          <Tag.Close onClick={handleEditTag} />
        </Tag>
      ))}
    </Box>
  );
};

export default Demo;
