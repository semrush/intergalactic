import React from 'react';
import Pagination from '@semcore/pagination';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Flex direction='column'>
      <Pagination currentPage={1} totalPages={1} mb={4} size={'l'} locale='ko' />
      <Pagination totalPages={1} locale='de' mb={4} />
      <Pagination totalPages={178247} locale='de' mb={4} />
      <Pagination totalPages={178247} locale='ko' size={'l'} />
    </Flex>
  );
};

export default Demo;
