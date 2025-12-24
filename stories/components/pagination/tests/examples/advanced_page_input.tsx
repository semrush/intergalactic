import Pagination from '@semcore/ui/pagination';
import React from 'react';

const Demo = () => {
  return (
    <Pagination totalPages={122360}>
      <Pagination.PageInput>
        <Pagination.PageInput.Value />
      </Pagination.PageInput>
    </Pagination>
  );
};

export default Demo;
