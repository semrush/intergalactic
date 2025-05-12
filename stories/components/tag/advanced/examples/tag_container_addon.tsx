import React from 'react';
import { TagContainer } from '@semcore/tag';
import Edit from '@semcore/icon/Edit/m';
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
        <TagContainer theme='secondary' size='xl' data-id={idx} key={idx} mr={1} interactive>
          <TagContainer.Tag>
            <TagContainer.Tag.Text>{tag}</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close onClick={handleEditTag} />
        </TagContainer>
      ))}
      {tags.map((tag, idx) => (
        <TagContainer theme='secondary' size='l' data-id={idx} key={idx} mr={1} interactive>
          <TagContainer.Tag>
            <TagContainer.Tag.Text>{tag}</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close onClick={handleEditTag} />
        </TagContainer>
      ))}
      {tags.map((tag, idx) => (
        <TagContainer theme='secondary' size='m' data-id={idx} key={idx} mr={1} interactive>
          <TagContainer.Tag>
            <TagContainer.Tag.Text>{tag}</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close onClick={handleEditTag} />
        </TagContainer>
      ))}

      {tags.map((tag, idx) => (
        <TagContainer theme='secondary' size='xl' data-id={idx} key={idx} mr={1} interactive>
          <TagContainer.Tag>
            <TagContainer.Addon>
              <Edit />
            </TagContainer.Addon>
            <TagContainer.Tag.Text>{tag}</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close onClick={handleEditTag} />
        </TagContainer>
      ))}
      {tags.map((tag, idx) => (
        <TagContainer theme='secondary' size='l' data-id={idx} key={idx} mr={1} interactive>
          <TagContainer.Tag>
            <TagContainer.Addon>
              <Edit />
            </TagContainer.Addon>
            <TagContainer.Tag.Text>{tag}</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close onClick={handleEditTag} />
        </TagContainer>
      ))}
            {tags.map((tag, idx) => (
        <TagContainer theme='secondary' size='m' data-id={idx} key={idx} mr={1} interactive>
          <TagContainer.Tag>
            <TagContainer.Addon>
              <Edit />
            </TagContainer.Addon>
            <TagContainer.Tag.Text>{tag}</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close onClick={handleEditTag} />
        </TagContainer>
      ))}
            {tags.map((tag, idx) => (
        <TagContainer theme='secondary' size='xl' data-id={idx} key={idx} mr={1} interactive>
          <TagContainer.Tag>
            <TagContainer.Addon>
              <Edit />
            </TagContainer.Addon>
            <TagContainer.Tag.Text>{tag}</TagContainer.Tag.Text>
          </TagContainer.Tag>
        </TagContainer>
      ))}
      {tags.map((tag, idx) => (
        <TagContainer theme='secondary' size='l' data-id={idx} key={idx} mr={1} interactive>
          <TagContainer.Tag>
            <TagContainer.Addon>
              <Edit />
            </TagContainer.Addon>
            <TagContainer.Tag.Text>{tag}</TagContainer.Tag.Text>
          </TagContainer.Tag>
        </TagContainer>
      ))}
      {tags.map((tag, idx) => (
        <TagContainer theme='secondary' size='m' data-id={idx} key={idx} mr={1} interactive>
          <TagContainer.Tag>
            <TagContainer.Addon>
              <Edit />
            </TagContainer.Addon>
            <TagContainer.Tag.Text>{tag}</TagContainer.Tag.Text>
          </TagContainer.Tag>
        </TagContainer>
      ))}
    </Box>
  );
};

export default Demo;
