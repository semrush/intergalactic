import React from 'react';
import Tag, { TagContainer } from '@semcore/tag';
import { Box } from '@semcore/flex-box';

const Demo = () => {
  const [tags, setTags] = React.useState(['Facebook', 'X (Twitter)', 'Instagram']);

  const handleEditTag = (e: React.SyntheticEvent) => {
    const parent = e.currentTarget.parentElement;
    const dataset = parent ? parent.dataset : null;
    const allTags = [...tags];
    setTags(allTags.filter((tag, ind) => ind !== Number(dataset?.id)));

    return false;
  };

  return (
    <Box>
      {tags.map((tag, idx) => (
        <TagContainer theme='primary' size='l' data-id={idx} key={idx} mr={1}>
          <TagContainer.Tag>
            <TagContainer.Tag.Text>{tag}</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close onClick={handleEditTag} />
        </TagContainer>
      ))}
    </Box>
  );
};

export default Demo;
