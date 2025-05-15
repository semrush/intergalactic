import React from 'react';
import Pagination from '@semcore/pagination';
import { Flex } from '@semcore/flex-box';
import Return from '@semcore/icon/Return/m';

const Demo = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleApplyPage = () => {
    const newValue = Number(inputRef.current?.value);
    if (!isNaN(newValue)) {
      setCurrentPage(newValue);
    }
  };

  return (
    <Flex direction='column'>
      <Pagination currentPage={currentPage} totalPages={100} onCurrentPageChange={setCurrentPage} mt={4}>
        <Pagination.FirstPage />
        <Pagination.PrevPage />
        <Pagination.NextPage />
        <Pagination.PageInput>
          <Pagination.PageInput.Value ref={inputRef} data-testid='value' autoFocus />
          {/* @ts-ignore */}
          <Pagination.PageInput.Addon
            data-testid='selectPageButton'
            tag={Return}
            interactive
            onClick={handleApplyPage}
          />
        </Pagination.PageInput>
        <Pagination.TotalPages />
      </Pagination>
    </Flex>
  );
};

export default Demo;
