import { Box } from '@semcore/ui/base-components';
import { AutoSuggest } from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import { suggestions } from './autosuggest_sync_example.tsx';

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
    <Box>
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
    </Box>
  );
};

export default Demo;
