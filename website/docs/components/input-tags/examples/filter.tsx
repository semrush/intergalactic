import React, { useState } from 'react';
import InputTags from '@semcore/ui/input-tags';
import DropdownMenu from '@semcore/ui/dropdown-menu';

const tagsSelect = ['vk', 'fk', 'twitter', 'instagram'];

export default function () {
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
      interaction="focus"
      size="l"
      visible={visible}
      onVisibleChange={(visible) => setVisible(visible)}
    >
      <DropdownMenu.Trigger>
        {({ getTriggerProps }) => (
          <InputTags w={200} size="l" onRemove={onRemoveLastTag} {...getTriggerProps({})}>
            {tags.map((tag, i) => (
              <InputTags.Tag key={i} theme="primary">
                <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
                <InputTags.Tag.Close onClick={onRemoveTag.bind(this, i)} />
              </InputTags.Tag>
            ))}
            <InputTags.Value
              value={valueInput}
              onChange={onChangeValue}
              aria-label="input with tags"
            />
          </InputTags>
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        {tagsFilter.map((tag, i) => (
          <DropdownMenu.Item key={i} use="primary" onClick={() => onSelectTag(tag)}>
            {tag}
          </DropdownMenu.Item>
        ))}
        {!tagsFilter.length && <DropdownMenu.ItemHint>Not found</DropdownMenu.ItemHint>}
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
}
