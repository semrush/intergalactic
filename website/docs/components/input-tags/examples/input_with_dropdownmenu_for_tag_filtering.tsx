import React from 'react';
import InputTags from 'intergalactic/input-tags';
import DropdownMenu from 'intergalactic/dropdown-menu';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const tagsSelect = ['LinkedIn', 'Facebook', 'TikTok', 'Instagram'];

const Demo = () => {
  const [tags, setTags] = React.useState([]);
  const [valueInput, setValueInput] = React.useState('');
  const [visible, setVisible] = React.useState(false);

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
    <Flex direction='column'>
      <Text tag='label' size={300} htmlFor='secondary-social-medias'>
        Social media
      </Text>
      <DropdownMenu
        interaction='focus'
        size='l'
        visible={visible}
        onVisibleChange={(visible) => setVisible(visible)}
      >
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
};

export default Demo;
