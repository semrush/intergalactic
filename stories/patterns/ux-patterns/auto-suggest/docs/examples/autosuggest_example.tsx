import { Box } from '@semcore/ui/base-components';
import { AutoSuggest } from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const suggestions = [
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
];

const fakeFetch = async (query: string, signal: AbortSignal): Promise<string[]> => {
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
    }, 2000);
  });
};

const Demo = () => {
  const [query, setQuery] = React.useState('');

  return (
    <>
      <Text tag='label' size={200} htmlFor='async-autosuggest'>
        ASYNC Your pet breed
      </Text>
      <Box mt={2} w={300}>
        <AutoSuggest
          value={query}
          id='async-autosuggest'
          onChange={setQuery}
          suggestions={fakeFetch}
        />
      </Box>
      <br />
      <br />
      <Text tag='label' size={200} htmlFor='sync-autosuggest'>
        SYNC Your pet breed
      </Text>
      <Box mt={2} w={300}>
        <AutoSuggest
          value={query}
          id='sync-autosuggest'
          onChange={setQuery}
          suggestions={suggestions}
        />
      </Box>
    </>
  );
};

export default Demo;
