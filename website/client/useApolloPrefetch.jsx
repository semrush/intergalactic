import React from 'react';
import { useApolloClient } from '@apollo/client';
import { PAGE_QUERY } from './pages/Page';

export default function useApolloPrefetch() {
  const { query } = useApolloClient();
  return {
    prefetch: (category, slug) =>
      query({
        query: PAGE_QUERY,
        variables: { slug, category },
      }),
  };
}
