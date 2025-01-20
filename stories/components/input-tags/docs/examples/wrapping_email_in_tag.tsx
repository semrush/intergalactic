import React from 'react';
import InputTags from '@semcore/input-tags';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const isValidEmail = (value: string) => /.+@.+\..+/i.test(value.toLowerCase());

const defaultTags = ['bob@email.com', 'alice@domain.net', 'mary@website.com', 'steve@company.com'];

const Demo = () => {
  const [tags, setTags] = React.useState(defaultTags);
  const [value, setValue] = React.useState('');

  const changeState = (tags?: string[], value?: string) => {
    if (tags !== undefined) {
      setTags(tags);
    }
    if (value !== undefined) {
      setValue(() => value);
    }
  };

  const handleAppendTags = (newTags: string[]) => {
    setTags((tags) => [...tags, ...newTags]);
    setValue(() => '');
  };

  const handleRemoveTag = () => {
    changeState(tags.slice(0, -1), tags.slice(-1)[0]);
  };

  const handleChange = (value: string) => {
    changeState(undefined, value);
  };

  const handleCloseTag = (e: React.SyntheticEvent<HTMLElement>) => {
    const { dataset } = e.currentTarget;
    changeState(
      tags.filter((tag, ind) => ind !== Number(dataset.id)),
      undefined,
    );
  };

  return (
    <Flex direction='column'>
      <Text tag='label' size={300} htmlFor='email'>
        Participants
      </Text>
      <InputTags mt={2} size='l' onAppend={handleAppendTags} onRemove={handleRemoveTag}>
        {tags.map((tag, idx) => (
          <InputTags.Tag
            key={idx}
            theme='primary'
            color={isValidEmail(tag) ? 'green-500' : 'red-500'}
          >
            <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
            <InputTags.Tag.Close data-id={idx} onClick={handleCloseTag} />
          </InputTags.Tag>
        ))}
        <InputTags.Value
          id='email'
          placeholder='Add email'
          type='email'
          autoComplete='email'
          value={value}
          onChange={handleChange}
        />
      </InputTags>
    </Flex>
  );
};

export default Demo;
