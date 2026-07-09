import { Box } from '@semcore/ui/base-components';
import { AutoSuggest } from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export const suggestions = [
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

const Demo = () => {
  const [query, setQuery] = React.useState('');

  return (
    <Box>
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
    </Box>
  );
};

export default Demo;
