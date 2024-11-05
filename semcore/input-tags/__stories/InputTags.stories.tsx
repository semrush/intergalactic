import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import InputTags from '@semcore/input-tags';
import DropdownMenu from '@semcore/dropdown-menu';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';

const meta: Meta<typeof InputTags> = {
  title: 'Components/InputTags',
  component: InputTags
};

export default meta;
type Story = StoryObj<typeof InputTags>;

const tagsSelect = ['LinkedIn', 'Facebook', 'TikTok', 'Instagram'];


export const OneSection: Story = {
  render: () => {
    const selectTriggerRef = React.useRef(null);
const [tags, setTags] = React.useState([]);
const [valueInput, setValueInput] = React.useState('');
const [visible, setVisible] = React.useState(false);

function onRemoveLastTag() {
  if (tags.length) {
    setValueInput(tags[tags.length - 1]);
    setTags(tags.slice(0, -1));
  }
}

function onRemoveTag(index, e) {
  e.stopPropagation();
  const newTags = tags.filter((tag, i) => i !== index);
  setTags(tags.filter((tag, i) => i !== index));
  if (newTags.length === index) {
    selectTriggerRef.current?.focus();
  }
}

function onChangeValue(value) {
  setValueInput(value);
  setVisible(true);
}

function onChange(value) {
  setTags(value);
  setValueInput('');
}

function onBlurValue() {
  setValueInput('');
}

const tagsFilter = tagsSelect.filter((tag) => {
  return tag.toLowerCase().includes(valueInput.toLowerCase()) && !tags.includes(tag);
});

    return (
      <Flex direction='column'>
        <Text tag='label' size={300} htmlFor='secondary-social-medias'>
          Social media
        </Text>
        <DropdownMenu
          interaction='focus'
          size='l'
          visible={visible}
          onVisibleChange={(visible) => setVisible(visible)}>
          <DropdownMenu.Trigger tag={InputTags} mt={2} w={300} size='l' onRemove={onRemoveLastTag}>
            {tags.map((tag, i) => (
              <InputTags.Tag key={i} theme='primary'>
                <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
                <InputTags.Tag.Close onClick={onRemoveTag.bind(this, i)} />
              </InputTags.Tag>
            ))}
            <InputTags.Value
              value={valueInput}
              onChange={onChangeValue}
              id='secondary-social-medias'
            />
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
      </Flex>
    );
  },
};
