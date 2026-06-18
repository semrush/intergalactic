import SearchIcon from '@semcore/icon/Search/m';
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
  const [query1, setQuery1] = React.useState('');
  const [query2, setQuery2] = React.useState('');

  return (
    <Box>
      <Text tag='label' size={200} htmlFor='async-autosuggest'>
        ASYNC Your pet breed
      </Text>
      <Box mt={2} w={300}>
        <AutoSuggest
          value={query1}
          id='async-autosuggest'
          onChange={setQuery1}
          suggestions={fakeFetch}
        />
      </Box>
      <br />
      <Text tag='label' size={200} htmlFor='sync-autosuggest'>
        SYNC Your pet breed
      </Text>
      <Box mt={2} w={300}>
        <AutoSuggest
          value={query2}
          id='sync-autosuggest'
          onChange={setQuery2}
          suggestions={suggestions}
          statusItemPlaceholder=''
        />
      </Box>
    </Box>
  );
};

export default Demo;
