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
    setTags(tags.filter((tag, i) => i !== index));
    selectTriggerRef.current?.focus();
  }

  function onChangeValue(value) {
    setValueInput(value);
    setVisible(true);
  }

  function onChange(value) {
    setTags(value);
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
        visible={visible}
        onVisibleChange={(visible) => setVisible(visible)}
        multiselect={true}
        value={tags}
        onChange={onChange}
      >
        <Select.Trigger tag={InputTags} mt={2} w={300} size='l' onRemove={onRemoveLastTag}>
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
          />
        </Select.Trigger>
        <Select.Menu>
          {tagsFilter.map((tag, i) => (
            <Select.Option value={tag} key={i}>
              {tag}
            </Select.Option>
          ))}
          {!tagsFilter.length && <Select.Option.Hint>Not found</Select.Option.Hint>}
        </Select.Menu>
      </Select>
    </Flex>
  );
};

export default Demo;
