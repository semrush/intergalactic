import Pagination from '@semcore/ui/pagination';
import type { NSPagination } from '@semcore/ui/pagination';
import React from 'react';

type PaginationPropsExample = NSPagination.Props & {};

const Demo = (props: PaginationPropsExample) => {
  const { totalPages, currentPage, onCurrentPageChange, size, locale } = props;

  return (
    <>
      <Pagination
        mb={4}
        totalPages={totalPages}
        currentPage={currentPage}
        onCurrentPageChange={onCurrentPageChange}
        size={size}
        locale={locale}
      >
        <Pagination.FirstPage />
        <Pagination.PrevPage />
        <Pagination.PageInput />
        <Pagination.TotalPages />
        <Pagination.NextPage />
      </Pagination>

      <Pagination currentPage={1} totalPages={1} mb={4} size={size} locale={locale} />
      <Pagination totalPages={1} size={size} locale={locale} mb={4} />
    </>
  );
};

export const defaultPaginationPropsExample: PaginationPropsExample = {
  totalPages: 100,
  currentPage: 1,
  onCurrentPageChange: undefined,
  size: 'm',
  locale: undefined,
};

Demo.defaultProps = defaultPaginationPropsExample;

export default Demo;
