import React from 'react';
import InputTags from 'intergalactic/input-tags';
import Select from 'intergalactic/select';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const isValidEmail = (value) => /.+@.+\..+/i.test(value.toLowerCase());

const defaultTags = ['bob@email.com', 'alice@domain.net', 'mary@website.com', 'steve@company.com'];

const Demo = () => {
  const [tags, setTags] = React.useState(defaultTags);
  const [value, setValue] = React.useState('');

  const changeState = (tags, value) => {
    if (tags !== undefined) {
      setTags(tags);
    }
    if (value !== undefined) {
      setValue(() => value);
    }
  };

  const handleAppendTags = (newTags) => {
    setTags((tags) => [...tags, ...newTags]);
    setValue(() => '');
  };

  const handleRemoveTag = () => {
    changeState(tags.slice(0, -1), tags.slice(-1)[0]);
  };

  const handleChange = (value) => {
    changeState(undefined, value);
  };

  const handleCloseTag = (e) => {
    const { dataset } = e.currentTarget;
    changeState(
      tags.filter((tag, ind) => ind !== Number(dataset.id)),
      undefined,
    );
  };

  const handleSelect = (value) => {
    changeState([...tags, value], '');
  };

  return (
    <Flex direction='column'>
      <Text tag='label' size={300} htmlFor='add-email'>
        Participants
      </Text>
      <Select interaction='focus' onChange={handleSelect}>
        <Select.Trigger
          tag={InputTags}
          mt={2}
          size='l'
          onAppend={handleAppendTags}
          onRemove={handleRemoveTag}
        >
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
            id='add-email'
            placeholder='Add email'
            value={value}
            onChange={handleChange}
          />
        </Select.Trigger>
        {value && (
          <Select.Menu>
            <Select.Option value={value}>{value}</Select.Option>
          </Select.Menu>
        )}
      </Select>
    </Flex>
  );
};

export default Demo;
