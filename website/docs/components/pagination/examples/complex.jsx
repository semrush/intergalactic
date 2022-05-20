import React, { useState } from 'react';
import Pagination from '@semcore/pagination';
import { Text } from '@semcore/typography';
import Select from '@semcore/select';

const TOTAL_PAGE_COUNT = 122360;

const Demo = () => {
  const [pageRangeDisplayed, updatePageRangeDisplayed] = useState(10);
  const [currentPage, updateCurrentPage] = useState(1);

  const handleSelect = (value) => {
    updatePageRangeDisplayed(value);
    updateCurrentPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCurrentPage(currentPage);
  };

  const pageCount = Math.round(TOTAL_PAGE_COUNT / pageRangeDisplayed);

  return (
    <form onSubmit={handleSubmit}>
      <Text tag="p" size={300}>{`Page number: ${currentPage}`}</Text>
      <Pagination
        currentPage={currentPage}
        onCurrentPageChange={updateCurrentPage}
        totalPages={pageCount}
      >
        <Pagination.FirstPage />
        <Pagination.PrevPage />
        <Pagination.NextPage />
        <Pagination.PageInput />
        <Pagination.TotalPages mr={4} />
        <Select
          value={pageRangeDisplayed}
          onChange={handleSelect}
          options={[80, 40, 20, 10].map((value) => ({ value, children: value }))}
        />
      </Pagination>
    </form>
  );
};

export default Demo;
