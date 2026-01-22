import { Flex } from '@semcore/ui/base-components';
import Counter from '@semcore/ui/counter';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Ellipsis from '@semcore/ui/ellipsis';
import InputTags from '@semcore/ui/input-tags';
import { Text } from '@semcore/ui/typography';
import React, { useState, useRef } from 'react';

const TAGS_MAX_COUNT = 3;

const SAMPLE_SUGGESTIONS = [
  'marketing',
  'seo',
  'analytics',
  'content',
  'social media',
  'advertising',
  'conversion',
  'branding',
  'email marketing',
  'ppc',
];

type TagListProps = {
  tags: string[];
  onRemoveTag: (tag: string) => void;
  validateTag: (tag: string) => {
    isValid: boolean;
    error: string | null;
  };
};

const TagsList = ({ tags, onRemoveTag, validateTag }: TagListProps) => {
  const handleCloseClick = (event: React.SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();
    const tagIndex = Number(event.currentTarget.dataset.index);
    const tagToRemove = tags[tagIndex];
    onRemoveTag(tagToRemove);
  };

  return (
    <>
      {tags.map((tag, index) => {
        const isValid = validateTag ? validateTag(tag).isValid : true;

        return (
          <InputTags.Tag
            key={index}
            size='l'
            wMax={166}
            theme='primary'
            color={isValid ? 'gray-500' : 'red-500'}
          >
            <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
            <InputTags.Tag.Close
              data-index={index}
              onClick={handleCloseClick}
            />
          </InputTags.Tag>
        );
      })}
    </>
  );
};

const Demo = () => {
  // State definitions
  const [tags, setTags] = useState(['existing', 'tags']);
  const [newTag, setNewTag] = useState('');

  const dropdownHighlightedIndex = useRef(null);
  const inputRef = useRef(null);

  // Simple validation function
  const validateTag = (tag: string) => {
    const isValid = tag.length > 0 && tag.length <= 20 && !tag.includes(' ');
    return {
      isValid,
      error: isValid ? null : 'invalid-tag',
    };
  };

  // Filter suggestions based on current input and existing tags
  const tagSuggestions = SAMPLE_SUGGESTIONS.filter(
    (suggestion) =>
      !tags.includes(suggestion) &&
      suggestion.toLowerCase().includes(newTag.toLowerCase()),
  );

  const isTagsLengthReached = tags.length >= TAGS_MAX_COUNT;
  const isDisabled = !tagSuggestions.length || isTagsLengthReached;

  const handleNewTagChange = (value: string) => {
    setNewTag(value);
  };

  const handleAppend = (newTags: string[]) => {
    if (dropdownHighlightedIndex.current === null) {
      addTags(newTags);
    }
  };

  const addTags = (newTags: string[]) => {
    const validTags = newTags.filter(
      (tag) =>
        tag.trim() &&
        !tags.includes(tag.trim()) &&
        tags.length + newTags.length <= TAGS_MAX_COUNT,
    );

    if (validTags.length > 0) {
      setTags((prev) => [...prev, ...validTags.map((tag) => tag.trim())]);
      setNewTag('');
    }
  };

  const removeLast = () => {
    if (newTag === '' && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleTagClick = (tag: string) => {
    addTags([tag]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2>Mange Tags</h2>

      <Flex alignItems='center' justifyContent='space-between'>
        <Text tag='label' size={300}>
          Tags
        </Text>
        <Counter size='l' theme={isTagsLengthReached ? 'warning' : ''}>
          {`${tags.length}/${TAGS_MAX_COUNT}`}
        </Counter>
      </Flex>

      <DropdownMenu
        disabled={isDisabled}
        visible={isDisabled ? false : undefined}
        interaction='focus'
        size='m'
        stretch='fixed'
      >
        <DropdownMenu.Trigger
          w='100%'
          tag={InputTags}
          mt={2}
          size='l'
          onAppend={handleAppend}
          onRemove={removeLast}
          data-testid='manage-tags-input'
          h={72}
        >
          <TagsList
            tags={tags}
            onRemoveTag={removeTag}
            validateTag={validateTag}
          />

          <InputTags.Value
            value={newTag}
            onChange={handleNewTagChange}
            ref={inputRef}
            placeholder={tags.length === 0 ? 'Enter tags...' : ''}
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Menu hMax={192}>
          {tagSuggestions.map((tag, index) => (
            <DropdownMenu.Item
              key={index}
              onClick={() => handleTagClick(tag)}
            >
              <Ellipsis>{tag}</Ellipsis>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Menu>
      </DropdownMenu>

      {/* Debug info */}
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>
          <strong>Current tags:</strong> {JSON.stringify(tags)}
        </p>
        <p>
          <strong>New tag input:</strong> "{newTag}"
        </p>
        <p>
          <strong>Available suggestions:</strong> {tagSuggestions.length}
        </p>
        <p>
          <strong>Tags limit reached:</strong>
          {' '}
          {isTagsLengthReached ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  );
};

export default Demo;
