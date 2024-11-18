import React from 'react';
import Pagination from '@semcore/pagination';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  
  return (
    <Flex direction='column'>
      <Pagination
  currentPage={1}
  totalPages={1}
/>

<Pagination totalPages={1} locale = "de" />
</Flex>
  );
};

export default Demo;
