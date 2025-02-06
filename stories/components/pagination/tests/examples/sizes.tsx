import React from 'react';
import Pagination from '@semcore/pagination';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <Flex direction='column' gap={4}>
      <Pagination totalPages={17824} />

      <Pagination totalPages={178247} size={'l'} />
    </Flex>
  );
};

export default Demo;
