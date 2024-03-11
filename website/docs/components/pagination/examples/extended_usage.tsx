import React from 'react';
import Pagination from 'intergalactic/pagination';
import { Text } from 'intergalactic/typography';

const pageCount = 122360;

const Demo = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

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

export default Demo;
