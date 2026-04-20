import { Flex } from '@semcore/ui/base-components';
import type { InputTagsProps, InputTagsValueProps, InputTagsTagProps } from '@semcore/ui/input-tags';
import InputTags from '@semcore/ui/input-tags';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleInputTagsProps = InputTagsProps & InputTagsValueProps & InputTagsTagProps & {
  hintPlacement?: 'top' | 'bottom' | 'left' | 'right';
  hintProps?: false;
};

const Demo = (props: ExampleInputTagsProps) => {
  const inputValueRef = React.useRef<HTMLInputElement>(null);
  const [tags, setTags] = React.useState([
    'TikTok',
    'Facebook',
    'LinkedIn',
    'Instagram',
    'Social media with a very long name',
  ]);
  const [value, setValue] = React.useState(props.value);

  const handleAppendTags = (newTags: string[]) => {
    setTags((tags) => [...tags, ...newTags]);
    setValue('');
  };

  const handleRemoveTag = () => {
    if (tags.length === 0) return;
    setTags(tags.slice(0, -1));
    setValue(`${tags.slice(-1)[0]} ${value}`);
  };

  const handleCloseTag = (idx: number) => (e: React.SyntheticEvent) => {
    e.stopPropagation();

    setTags((tags) => tags.filter((_, tagIdx) => idx !== tagIdx));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      handleEditTag(e);
    }
    return false;
  };

  const handleEditTag = (
    e: React.SyntheticEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => {
    if (props.disabled) return;

    const { dataset } = e.currentTarget;
    let allTags = [...tags];
    if (value) {
      allTags = [...allTags, value];
    }
    setTags(allTags.filter((tag, ind) => ind !== Number(dataset.id)));
    if (!e.defaultPrevented && dataset.id !== undefined) {
      setValue(tags[Number(dataset.id)]);
      inputValueRef.current?.focus();
    }
    return false;
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.target instanceof HTMLInputElement ? e.target.value : null;
    if (e.key === 'Enter' && value) {
      handleAppendTags([value]);

      return false;
    }
  };

  return (
    <Flex direction='column'>
      <Text tag='label' size={300} htmlFor='add-new-social-media'>
        Social media
      </Text>
      <InputTags disabled={props.disabled} mt={2} size={props.size} state={props.state} delimiters={props.delimiters} onAppend={handleAppendTags} onRemove={handleRemoveTag}>
        {tags.map((tag, idx) => (
          <InputTags.Tag
            editable={!props.disabled}
            key={tag}
            tag={InputTags.Tag}
            theme='primary'
            data-id={idx}
            onClick={handleEditTag}
            onKeyDown={handleTagKeyDown}
            active={props.active}
          >
            <InputTags.Tag.Text>
              <InputTags.Tag.Text.Content wMax={100} ellipsis:cropPosition='end' hint={props.hintProps} hint:placement={props.hintPlacement}>{tag}</InputTags.Tag.Text.Content>
            </InputTags.Tag.Text>
            <InputTags.Tag.Close onClick={handleCloseTag(idx)} />
          </InputTags.Tag>
        ))}
        <InputTags.Value
          readOnly={props.readOnly}
          value={value}
          onChange={setValue}
          onKeyDown={handleInputKeyDown}
          defaultValue={props.defaultValue}
          ref={inputValueRef}
          id='add-new-social-media'
          placeholder={props.placeholder}
        />
      </InputTags>
    </Flex>
  );
};

export const defaultProps: ExampleInputTagsProps = {
  size: 'l',
  placeholder: 'Add social media',
  defaultValue: undefined,
  state: undefined,
  disabled: false,
  delimiters: undefined,
  editable: undefined,
  readOnly: undefined,
  active: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
