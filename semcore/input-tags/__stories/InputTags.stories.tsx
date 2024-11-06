import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import InputTags from '@semcore/input-tags';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';
import CloseM from '@semcore/icon/Close/m';

const meta: Meta<typeof InputTags> = {
  title: 'Components/InputTags',
  component: InputTags,
};

export default meta;
type Story = StoryObj<typeof InputTags>;

const tagsSelect: string[] = ['LinkedIn', 'Facebook', 'TikTok', 'Instagram'];

export const SelectTagForFiltering: Story = {
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

    function onRemoveTag(index: number, e: React.MouseEvent<HTMLElement>) {
      e.stopPropagation();
      const newTags = tags.filter((tag, i) => i !== index);
      const selectTriggerRef = useRef<HTMLElement | null>(null);
      setTags(tags.filter((tag, i) => i !== index));
      if (newTags.length === index) {
        selectTriggerRef.current?.focus();
      }
    }

    function onChangeValue(value: React.SetStateAction<string>) {
      setValueInput(value);
      setVisible(true);
    }

    function onChange(value: React.SetStateAction<never[]>) {
      setTags(value);
      setValueInput('');
    }

    function onBlurValue() {
      setValueInput('');
    }

    const tagsFilter = tagsSelect.filter((tag: string) => {
      return (
        tag.toLowerCase().includes(valueInput.toLowerCase()) && !(tags as string[]).includes(tag)
      );
    });

    return (
      <Flex direction='column'>
        <Text tag='label' size={300} htmlFor='secondary-social-medias'>
          Social media
        </Text>
        <Select
          interaction='focus'
          size='l'
          visible={visible && tags.length < 4}
          onVisibleChange={(visible) => setVisible(visible)}
          multiselect={true}
          value={tags}
          onChange={onChange}
        >
          <Select.Trigger
            tag={InputTags}
            mt={2}
            w={300}
            size='l'
            onRemove={onRemoveLastTag}
            tabIndex={-1}
            delimiters={[]}
          >
            {tags.map((tag, i) => (
              <InputTags.Tag key={i} theme='primary'>
                <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
                <InputTags.Tag.Close onClick={onRemoveTag.bind(this, i)} />
              </InputTags.Tag>
            ))}
            <InputTags.Value
              ref={selectTriggerRef}
              value={valueInput}
              onChange={onChangeValue}
              id='secondary-social-medias'
              placeholder='Select social media'
              onBlur={onBlurValue}
            />
          </Select.Trigger>
          <Select.Menu>
            {tagsFilter.map((tag, i) => (
              <Select.Option value={tag} key={i}>
                {tag}
              </Select.Option>
            ))}
            {!tagsFilter.length && valueInput !== '' && (
              <Select.OptionHint>Nothing found</Select.OptionHint>
            )}
          </Select.Menu>
        </Select>
      </Flex>
    );
  },
};
