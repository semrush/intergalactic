import { Flex } from '@semcore/ui/base-components';
import CheckM from '@semcore/ui/icon/Check/m';
import Return from '@semcore/ui/icon/Return/m';
import Pagination from '@semcore/ui/pagination';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='column'>
      <Pagination totalPages={1000}>
        <Pagination.FirstPage addonLeft={CheckM} />
        <Pagination.PrevPage use='primary' theme='brand' addonLeft={CheckM} />
        <Pagination.NextPage addonLeft={CheckM} use='primary' theme='success' size='l' />
        <Pagination.PageInput placeholder='123' state='invalid' size='l'>
          <Pagination.PageInput.Value />
        </Pagination.PageInput>
        <Pagination.TotalPages bold use='secondary' />
      </Pagination>

      <Pagination currentPage={1} totalPages={122360} m={8}>
        <Pagination.PageInput>
          <Pagination.PageInput.Value data-testid='value' autoFocus />
          {/* @ts-ignore */}
          <Pagination.PageInput.Addon data-testid='selectPageButton' tag={Return} interactive />
        </Pagination.PageInput>
      </Pagination>

    </Flex>
  );
};

export default Demo;
