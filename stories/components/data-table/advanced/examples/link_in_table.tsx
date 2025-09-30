import { DataTable } from '@semcore/ui/data-table';
import { Flex } from '@semcore/ui/flex-box';
import LinkExternalM from '@semcore/ui/icon/LinkExternal/m';
import Link from '@semcore/ui/link';
import { Text } from '@semcore/ui/typography';
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
            <Text ellipsis={true}>{props.value}</Text>
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
