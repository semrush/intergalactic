import React from 'react';
import DataTable from '@semcore/data-table';
import { Flex } from '@semcore/ui/flex-box';
import LinkExternalM from '@semcore/ui/icon/LinkExternal/m';
import Link from '@semcore/ui/link';
import Ellipsis from '@semcore/ui/ellipsis';
import Button from '@semcore/ui/button';

const Demo = () => {
  return (
    <DataTable data={data} aria-label={'Table title. Access to cells'}>
      <DataTable.Head>
        <DataTable.Column name='testCol' children='Text column' />
      </DataTable.Head>
      <DataTable.Body>
        <DataTable.Cell data={data} name='testCol'>
          {(props, row, index) => {
            return {
              children: (
                <Flex>
                  dsome asd
                  {/*<Ellipsis>{row[props.name]}</Ellipsis>*/}
                  {/*<Link*/}
                  {/*  href='#'*/}
                  {/*  target='_blank'*/}
                  {/*  rel='noreferrer'*/}
                  {/*  addonLeft={LinkExternalM}*/}
                  {/*  color='gray-300'*/}
                  {/*  ml={1}*/}
                  {/*/>*/}
                  <Button>QQQ</Button>
                </Flex>
              ),
            };
          }}
        </DataTable.Cell>
      </DataTable.Body>
    </DataTable>
  );
};

const data = [
  {
    testCol: "can't copy this text",
  },
];

export default Demo;
