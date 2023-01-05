import React, { useState } from 'react';
import InputTags from '@semcore/ui/input-tags';
import Tag from '@semcore/ui/tag';
import Select from '@semcore/ui/select';

const isValidEmail = (value) => /.+@.+\..+/i.test(value.toLowerCase());

const defaultTags = ['bob@vk.com', 'wolf@instagram.dot', 'fekla@fk.com', 'tuz@twitter.net'];

const Demo = () => {
  const [tags, updateTags] = useState(defaultTags);
  const [value, updateValue] = useState('');

  const changeState = (tags, value) => {
    if (tags !== undefined) {
      updateTags(tags);
    }
    if (value !== undefined) {
      updateValue(() => value);
    }
  };

  const handleAppendTags = (newTags) => {
    updateTags((tags) => [...tags, ...newTags]);
    updateValue(() => '');
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
    <Select interaction="focus" onChange={handleSelect}>
      <Select.Trigger
        tag={InputTags}
        size="l"
        onAppend={handleAppendTags}
        onRemove={handleRemoveTag}
      >
        {tags.map((tag, idx) => (
          <InputTags.Tag
            key={idx}
            theme="primary"
            color={isValidEmail(tag) ? 'green-500' : 'red-500'}
          >
            <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
            <InputTags.Tag.Close data-id={idx} onClick={handleCloseTag} />
          </InputTags.Tag>
        ))}
        <InputTags.Value
          placeholder="bob@company.com, johndoe@domain.com"
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
  );
};

export default Demo;
