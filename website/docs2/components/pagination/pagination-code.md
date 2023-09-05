---
title: Example
tabs: Pagination('index'), A11y('pagination-a11y'), API('pagination-api'), Example('pagination-code'), Changelog('pagination-changelog')
---

### Basic usage

::: sandbox

<script lang="tsx">
import React from 'react';
import Pagination from '@semcore/ui/pagination';

const Demo = () => <Pagination totalPages={122360} />;
</script>

:::

### Extended usage

::: sandbox

<script lang="tsx">
import React, { useState } from 'react';
import Pagination from '@semcore/ui/pagination';
import { Text } from '@semcore/ui/typography';

const pageCount = 122360;

const Demo = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text tag='p' size={200} mb={2}>{`Page number: ${currentPage}`}</Text>
      <Pagination
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        totalPages={pageCount}
      >
        <Pagination.FirstPage />
        <Pagination.PrevPage />
        <Pagination.NextPage />
        <Pagination.PageInput />
        <Pagination.TotalPages />
      </Pagination>
    </form>
  );
};
</script>

:::
