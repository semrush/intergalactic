import { Flex } from '@semcore/ui/flex-box';
import Pagination from '@semcore/ui/pagination';
import React from 'react';

const Demo = () => {
  const [pageSmall, setPageSmall] = React.useState(10);
  const [pageLarge, setPageLarge] = React.useState(178247);

  return (
    <Flex direction='column' gap={4}>
      <Pagination
        totalPages={17824}
        currentPage={pageSmall}
        onCurrentPageChange={setPageSmall}
      />
      <Pagination
        totalPages={178247}
        size='l'
        currentPage={pageLarge}
        onCurrentPageChange={setPageLarge}
      />
    </Flex>
  );
};

export default Demo;
