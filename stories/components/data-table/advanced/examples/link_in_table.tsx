import React from 'react';
import { DataTable } from '@semcore/data-table';
import { Flex } from '@semcore/ui/flex-box';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import Link from '@semcore/ui/link';
import Ellipsis from '@semcore/ui/ellipsis';

const Demo = () => {
  return (
    <DataTable data={data} aria-label={'Table title. Access to cells'}
               columns={[
                   {name: 'testCol', children: 'Text column'},
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
    testCol: "can't copy this text",
  },
];

export default Demo;
