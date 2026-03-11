import { ButtonLink } from '@semcore/button';
import Return from '@semcore/icon/Return/m';
import { Flex } from '@semcore/ui/base-components';
import Pagination from '@semcore/ui/pagination';
import React from 'react';

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
            tag={ButtonLink}
            onClick={handleApplyPage}
            p={0}
            h='calc(100% - 8px)'
          >
            <ButtonLink.Addon tag={Return} />
          </Pagination.PageInput.Addon>
        </Pagination.PageInput>
        <Pagination.TotalPages />
      </Pagination>
    </Flex>
  );
};

export default Demo;
