import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { Flex } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import Ellipsis from '@semcore/ui/ellipsis';
import Link from '@semcore/ui/link';
import React from 'react';

const Demo = () => {
  return (
    <DataTable
      data={data}
      aria-label='Table title. Access to cells'
      columns={[
        { name: 'testCol', children: 'Text column' },
      ]}
      renderCell={(props) => {
        return (
          <Flex>
            <Ellipsis>{props.value}</Ellipsis>
            <Link
              href='#'
              target='_blank'
              rel='noreferrer'
              addonLeft={LinkExternalM}
              color='gray-300'
              ml={1}
            />
          </Flex>
        );
      }}
    />
  );
};

const data = [
  {
    testCol: 'can\'t copy this text',
  },
];

export default Demo;
