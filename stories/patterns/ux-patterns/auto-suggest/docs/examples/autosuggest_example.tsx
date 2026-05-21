import { Box } from '@semcore/ui/base-components';
import Input from '@semcore/ui/input';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Highlight = ({ highlight, children }: { highlight: string; children: string }) => {
  let html = children;
  if (highlight) {
    try {
      const re = new RegExp(highlight.toLowerCase(), 'g');
      html = html.replace(
        re,
        `<span style="font-weight: bold; padding: var(--intergalactic-spacing-05x) 0">${highlight}</span>`,
      );
    } catch (e) {}
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

const debounce = (func: Function, timeout: number) => {
  let timer: number;
  return (...args: any[]) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

type Suggestion = {
  value: string;
  title: string;
};

const fakeFetch = async (query: string): Promise<Suggestion[]> => {
  if (!query) return [];

  return [
    'persian',
    'maine coon',
    'ragdoll',
    'sphynx',
    'siamese',
    'bengal',
    'british shorthair',
    'abyssinian',
    'birman',
    'oriental shorthair',
    'scottish fold',
    'devon rex',
    'norwegian forest',
    'siberian',
    'russian blue',
    'savannah',
    'american shorthair',
    'exotic shorthair',
    'ragamuffin',
    'balinese',
  ]
    .filter((breed) => breed.toLowerCase().includes(query.toLowerCase()))
    .map((value) => ({ value, title: value }));
};

const Demo = () => {
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(-1);
  const [visible, setVisible] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const loadSuggestions = React.useCallback(
    debounce(
      (query: string) => fakeFetch(query).then((suggestions) => setSuggestions(suggestions)),
      300,
    ),
    [],
  );
  React.useEffect(() => {
    loadSuggestions(query);
  }, [query]);
  const handleSelect = React.useCallback((x: string) => {
    setQuery(x);
    setVisible(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.key.startsWith('Array')) {
      setHighlightedIndex(-1);
    }
  };

  const handleHighlightedIndexChange = (index: number | null) => {
    setHighlightedIndex(index);
  };

  const handleChangeVisible = (visible: boolean) => {
    setVisible(visible);
  };

  return (
    <>
      <Text tag='label' size={200} htmlFor='website-autosuggest'>
        Your pet breed
      </Text>
      <Box mt={2}>
        <Select
          interaction='focus'
          onChange={handleSelect}
          value={query}
          visible={visible}
          onVisibleChange={handleChangeVisible}
          highlightedIndex={highlightedIndex}
          onHighlightedIndexChange={handleHighlightedIndexChange}
          defaultHighlightedIndex={null}
        >
          <Select.Trigger tag={Input} w={250}>
            {() => (
              <Input.Value
                value={query}
                role='combobox'
                placeholder='Start typing for options'
                onChange={setQuery}
                id='website-autosuggest'
                onKeyDown={handleKeyDown}
                autoComplete='off'
              />
            )}
          </Select.Trigger>
          {suggestions.length > 0 && (
            <Select.Menu>
              {suggestions.map((option) => (
                <Select.Option value={option.value} key={option.value}>
                  <Highlight highlight={query}>{option.title}</Highlight>
                </Select.Option>
              ))}
            </Select.Menu>
          )}
        </Select>
      </Box>
    </>
  );
};

export default Demo;
