import React from 'react';
import InputTags from '@semcore/input-tags';
import { Box } from '@semcore/flex-box';
import Notice from '@semcore/notice';
import { Text, List } from '@semcore/ui/typography';

const TAGUS = () => (
  <InputTags.Tag>
    <InputTags.Tag.Text><InputTags.Tag.Circle
        style={{
          background: '#2595e4'
        }}
      />123</InputTags.Tag.Text>
    <InputTags.Tag.Close />
  </InputTags.Tag>
);

type InputWrapperProps = {
  value: string;
  setValue: (value: string) => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => false | undefined;
  inputValueRef: React.RefObject<HTMLInputElement>;
};

const InputWrapper = ({
  value,
  setValue,
  handleInputKeyDown,
  inputValueRef,
}: InputWrapperProps) => {
  return (
    <InputTags.Value
      value={value}
      onChange={setValue}
      onKeyDown={handleInputKeyDown}
      ref={inputValueRef}
      id='add-new-social-media'
      placeholder='Add social media'
    />
  );
};


const Demo = () => {
  const inputValueRef = React.useRef<HTMLInputElement>(null);
  const [tags, setTags] = React.useState([
    'TikTok',
    'Facebook',
    'LinkedIn',
    'Instagram',
    'Social media with a very long name',
  ]);
  const [value, setValue] = React.useState('');

  const handleAppendTags = (newTags: string[]) => {
    setTags((tags) => [...tags, ...newTags]);
    setValue('');
  };

  const handleRemoveTag = () => {
    if (tags.length === 0) return;
    setTags(tags.slice(0, -1));
    setValue(`${tags.slice(-1)[0]} ${value}`);
  };

  const handleCloseTag = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
    <>
    {/* tagus+tagcontainer.+value */}
      <Notice mb={2} theme='success'>
        <Notice.Content>
        <Text size={200} mb={2} >
            Case1: Tagus function inside TagsContainer + InputTags.Value
          </Text>
          <InputTags mt={2} size='l' onAppend={handleAppendTags} onRemove={handleRemoveTag}>
            <InputTags.TagsContainer>
              {tags.map((tag, idx) => (
                <TAGUS key={tag} />
              ))}
              
            </InputTags.TagsContainer>
            <InputTags.Value
              value={value}
              onChange={setValue}
              onKeyDown={handleInputKeyDown}
              ref={inputValueRef}
              id='add-new-social-media'
              placeholder='Add social media'
            />
          </InputTags>
        </Notice.Content>
      </Notice>

      <Notice mb={2} theme='success'>
        <Notice.Content>
        <Text size={200} mb={2} >
            Case2: Tagus function without TagsContainer + InputTags.Value
          </Text>
          <InputTags mt={2} size='l' onAppend={handleAppendTags} onRemove={handleRemoveTag}>
            {tags.map((tag, idx) => (
              <TAGUS key={tag} />
            ))}
            <InputTags.Value
              value={value}
              onChange={setValue}
              onKeyDown={handleInputKeyDown}
              ref={inputValueRef}
              id='add-new-social-media'
              placeholder='Add social media'
            />
          </InputTags>
        </Notice.Content>
      </Notice>


      <Notice mb={2} theme='success'>
        <Notice.Content>
        <Text size={200} mb={2} >
            Case3: Tagus function inside TagsContainer + InputWrapper funcion
          </Text>
          <InputTags mt={2} size='l' onAppend={handleAppendTags} onRemove={handleRemoveTag}>
            <InputTags.TagsContainer>
              {tags.map((tag, idx) => (
                <TAGUS key={tag} />
              ))}
            </InputTags.TagsContainer>
            <InputWrapper
              value={value}
              setValue={setValue}
              handleInputKeyDown={handleInputKeyDown}
              inputValueRef={inputValueRef}
            />
          </InputTags>
        </Notice.Content>
      </Notice>


      <Notice mb={2} theme='danger'>
        <Notice.Content>
        <Text size={200} mb={2} >
            Case4: Tagus function without TagsContainer + InputWrapper funcion
          </Text>
          <InputTags mt={2} size='l' onAppend={handleAppendTags} onRemove={handleRemoveTag}>
            {tags.map((tag, idx) => (
              <TAGUS key={tag} />
            ))}
            <InputWrapper
              value={value}
              setValue={setValue}
              handleInputKeyDown={handleInputKeyDown}
              inputValueRef={inputValueRef}
            />
          </InputTags>
        </Notice.Content>
      </Notice>
    </>
  );
};

export default Demo;
