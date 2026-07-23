import { Flex } from '@semcore/ui/base-components';
import InputTags from '@semcore/ui/input-tags';
import React from 'react';

const TAGS = ['Facebook', 'Instagram'];

export default function AllSizes() {
  const [tagsM, setTagsM] = React.useState(TAGS);
  const [tagsL, setTagsL] = React.useState(TAGS);

  return (
    <Flex direction='column' gap={4}>
      <InputTags size='m' aria-label='InputTags size M'>
        {tagsM.map((tag) => (
          <InputTags.Tag key={tag} theme='primary'>
            <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
            <InputTags.Tag.Close
              onClick={() => setTagsM((current) => current.filter((item) => item !== tag))}
            />
          </InputTags.Tag>
        ))}
        <InputTags.Value placeholder='Add tag' />
      </InputTags>
      <InputTags size='l' aria-label='InputTags size L'>
        {tagsL.map((tag) => (
          <InputTags.Tag key={tag} theme='primary'>
            <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
            <InputTags.Tag.Close
              onClick={() => setTagsL((current) => current.filter((item) => item !== tag))}
            />
          </InputTags.Tag>
        ))}
        <InputTags.Value placeholder='Add tag' />
      </InputTags>
    </Flex>
  );
}
