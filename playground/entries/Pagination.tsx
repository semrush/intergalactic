import type { NSPagination } from '@semcore/ui/pagination';
import Pagination from '@semcore/ui/pagination';
import React from 'react';

import type { JSXProps } from '../types/JSXProps';
import type { PlaygroundEntry } from '../types/Playground';
import createGithubLink from '../utils/createGHLink';

export type PaginationJSXProps = JSXProps<NSPagination.Props>;

function getJSX({ handleControlChange, ...paginationProps }: PaginationJSXProps) {
  return <Pagination onCurrentPageChange={(value) => handleControlChange?.('currentPage', value)} {...paginationProps} />;
}

const entry: PlaygroundEntry<PaginationJSXProps> = {
  JSX: (props) => getJSX(props),
  controls: {
    size: {
      type: 'inline-radio',
      value: 'm',
      options: ['m', 'l'],
      displayName: 'Size',
    },
    currentPage: {
      type: 'text-number',
      value: 1,
      min: 1,
      displayName: 'Current page',
    },
    totalPages: {
      type: 'text-number',
      value: 122360,
      min: 1,
      displayName: 'Total pages',
    },
  },
  link: createGithubLink('pagination'),
};

export default entry;
