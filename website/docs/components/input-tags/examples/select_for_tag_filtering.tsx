import React from 'react';
import InputTags from 'intergalactic/input-tags';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';
import Select from 'intergalactic/select';

const tagsSelect = ['LinkedIn', 'Facebook', 'TikTok', 'Instagram'];

const Demo = () => {
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
};

export default Demo;
