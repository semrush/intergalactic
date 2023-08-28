---
title: Example
fileSource: input-tags
tabs: InputTags('input-tags'), A11y('input-tags-a11y'), API('input-tags-api'), Example('input-tags-code'), Changelog('input-tags-changelog')
---

## Entering and editing tags

Here's an example where tags have a limited width and can be edited by clicking on them.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import InputTags from '@semcore/ui/input-tags';
import Tooltip from '@semcore/ui/tooltip';

const Demo = () => {
  const [tags, setTags] = useState(['vk', 'fk', 'twitter', 'instagram']);
  const [value, setValue] = useState('');

  const handleAppendTags = (newTags) => {
    setTags((tags) => [...tags, ...newTags]);
    setValue('');
  };

  const handleRemoveTag = () => {
    if (tags.length === 0) return;
    setTags(tags.slice(0, -1));
    setValue(`${tags.slice(-1)[0]} ${value}`);
  };

  const handleCloseTag = (e) => {
    e.preventDefault();
  };

  const handleEditTag = (e) => {
    const { dataset } = e.currentTarget;
    let allTags = [...tags];
    if (value) {
      allTags = [...allTags, value];
    }
    setTags(allTags.filter((tag, ind) => ind !== Number(dataset.id)));
    if (!e.defaultPrevented) {
      setValue(tags[dataset.id]);
    }
    return false;
  };

  const handleBlurInput = (e) => {
    const { value } = e.currentTarget;
    if (value) handleAppendTags([value]);
  };

  return (
    <InputTags size='l' onAppend={handleAppendTags} onRemove={handleRemoveTag}>
      {tags.map((tag, idx) => (
        <Tooltip key={idx}>
          <Tooltip.Trigger
            tag={InputTags.Tag}
            theme='primary'
            editable
            data-id={idx}
            onClick={handleEditTag}
          >
            <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
            <InputTags.Tag.Close onClick={handleCloseTag} />
          </Tooltip.Trigger>
          <Tooltip.Popper>tag</Tooltip.Popper>
        </Tooltip>
      ))}
      <InputTags.Value
        value={value}
        onChange={setValue}
        onBlur={handleBlurInput}
        aria-label='Input with tags'
      />
    </InputTags>
  );
};


</script>

:::

## Wrapping email in tag

In this example, emails are wrapped in tags without any width limitation.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import InputTags from '@semcore/ui/input-tags';
import Select from '@semcore/ui/select';

const isValidEmail = (value) => /.+@.+\..+/i.test(value.toLowerCase());

const defaultTags = ['bob@vk.com', 'wolf@instagram.dot', 'fekla@fk.com', 'tuz@twitter.net'];

const Demo = () => {
  const [tags, setTags] = useState(defaultTags);
  const [value, setValue] = useState('');

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
    <Select interaction='focus' onChange={handleSelect}>
      <Select.Trigger
        tag={InputTags}
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
          placeholder='bob@company.com, johndoe@domain.com'
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


</script>

:::

## Input with DropdownMenu for tag filtering

In this example, selected options from the dropdown menu are wrapped in tags within the input field.

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import InputTags from '@semcore/ui/input-tags';
import DropdownMenu from '@semcore/ui/dropdown-menu';

const tagsSelect = ['vk', 'fk', 'twitter', 'instagram'];

const Demo = () => {
  const [tags, setTags] = useState([]);
  const [valueInput, setValueInput] = useState('');
  const [visible, setVisible] = useState(false);

  function onRemoveLastTag() {
    if (tags.length) {
      setValueInput(tags[tags.length - 1]);
      setTags(tags.slice(0, -1));
    }
  }

  function onRemoveTag(index) {
    setTags(tags.filter((tag, i) => i !== index));
  }

  function onChangeValue(value) {
    setValueInput(value);
    setVisible(true);
  }

  function onSelectTag(value) {
    setTags(tags.concat(value));
    setValueInput('');
  }

  const tagsFilter = tagsSelect.filter((tag) => tag.includes(valueInput));

  return (
    <DropdownMenu
      interaction='focus'
      size='l'
      visible={visible}
      onVisibleChange={(visible) => setVisible(visible)}
    >
      <DropdownMenu.Trigger>
        {({ getTriggerProps }) => (
          <InputTags w={200} size='l' onRemove={onRemoveLastTag} {...getTriggerProps({})}>
            {tags.map((tag, i) => (
              <InputTags.Tag key={i} theme='primary'>
                <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
                <InputTags.Tag.Close onClick={onRemoveTag.bind(this, i)} />
              </InputTags.Tag>
            ))}
            <InputTags.Value
              value={valueInput}
              onChange={onChangeValue}
              aria-label='input with tags'
            />
          </InputTags>
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        {tagsFilter.map((tag, i) => (
          <DropdownMenu.Item key={i} onClick={() => onSelectTag(tag)}>
            {tag}
          </DropdownMenu.Item>
        ))}
        {!tagsFilter.length && <DropdownMenu.ItemHint>Not found</DropdownMenu.ItemHint>}
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
}
</script>

:::
