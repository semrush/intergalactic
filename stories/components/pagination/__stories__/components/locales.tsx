import React from 'react';
import Pagination from '@semcore/pagination';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  
  return (
    <Flex direction='column'>
      <Pagination
  totalPages={17824}
  locale = "de"
/>

<Pagination
  totalPages={178247}
  locale = "ko"
/>
</Flex>
  );
};

export default Demo;
