import { Box } from '@semcore/ui/base-components';
import { AutoSuggest } from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const suggestions = [
  'Persian',
  '<img src=x onerror="alert(\'test\')">',
  '<b>cat</b>',
  'Sphynx/',
  '[Siamese',
  'Bengal]',
  'British Shorthair',
  'Abyssinian',
  'Birman',
  'Oriental Shorthair',
  'Scottish Fold',
  'Devon Rex',
  'Norwegian Forest',
  'Siberian',
  'Russian Blue',
  'Savannah',
  'American Shorthair',
  'Exotic Shorthair',
  'Ragamuffin',
  'Balinese',
];

export type AutosuggestTestProps = {
  suggestionsSource?: 'sync' | 'async';
  initialValue?: string;
  asyncDelay?: number;
  autoFocus?: boolean;
  width?: number;
  withPlaceholder?: boolean;
  placeholder?: string;
};

export const autosuggestTestDefaultProps: Required<AutosuggestTestProps> = {
  suggestionsSource: 'sync',
  initialValue: '',
  asyncDelay: 1000,
  autoFocus: false,
  width: 250,
  withPlaceholder: true,
  placeholder: 'Start typing to see options',
};

const fakeFetch = async (query: string, signal: AbortSignal, delay: number): Promise<string[]> => {
  if (!query) return [];

  if (signal.aborted) {
    return [];
  }

  return new Promise((resolve) => {
    const onAbort = () => {
      signal.removeEventListener('abort', onAbort);
      resolve([]);
    };
    signal.addEventListener('abort', onAbort);

    setTimeout(() => {
      signal.removeEventListener('abort', onAbort);

      resolve(suggestions.filter((breed) => breed.toLowerCase().includes(query.toLowerCase())));
    }, delay);
  });
};

const Demo = (props: AutosuggestTestProps) => {
  const {
    suggestionsSource,
    initialValue,
    asyncDelay,
    autoFocus,
    width,
    withPlaceholder,
    placeholder,
  } = {
    ...autosuggestTestDefaultProps,
    ...props,
  };
  const [query, setQuery] = React.useState(initialValue);

  React.useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const getSuggestions = React.useCallback(
    (query: string, signal: AbortSignal) => fakeFetch(query, signal, asyncDelay),
    [asyncDelay],
  );

  const placeholderProp = withPlaceholder ? { placeholder } : {};

  return (
    <>
      <Text tag='label' size={200} htmlFor='autosuggest'>
        Your pet breed
      </Text>
      <Box mt={2} w={width}>
        <AutoSuggest
          key={`${suggestionsSource}-${initialValue}-${asyncDelay}-${autoFocus}-${withPlaceholder}`}
          value={query}
          id='autosuggest'
          onChange={setQuery}
          suggestions={suggestionsSource === 'async' ? getSuggestions : suggestions}
          autoFocus={autoFocus}
          {...placeholderProp}
        />
      </Box>
    </>
  );
};

export default Demo;
