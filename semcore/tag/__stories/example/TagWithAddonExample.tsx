import React from 'react';
import { TagContainer } from '@semcore/tag';
import Edit from '@semcore/icon/Edit/m';
import { Box } from '@semcore/flex-box';

export const TagWithAddonExample = () => {
  const [tags, setTags] = React.useState(['Facebook', 'X (Twitter)', 'Instagram']);

  const handleEditTag = (e: React.SyntheticEvent) => {
    const parent = e.currentTarget.parentElement;
    if (parent) {
      const { dataset } = parent;
      const allTags = [...tags];
      setTags(allTags.filter((tag, ind) => ind !== Number(dataset.id)));
    }

    return false;
  };

  return (
    <Box>
      {tags.map((tag, idx) => (
        <TagContainer theme='secondary' size='l' data-id={idx} key={idx} mr={1} interactive>
          <TagContainer.Tag>
            <TagContainer.Tag.Addon>
              <Edit />
            </TagContainer.Tag.Addon>
            <TagContainer.Tag.Text>{tag}</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close onClick={handleEditTag} />
        </TagContainer>
      ))}
    </Box>
  );
};
