import React from 'react';
import { DataTable, DataTableSort } from '@semcore/data-table';
type SortableColumn = Exclude<keyof typeof data[0], 'keyword'>;
import Ellipsis from '@semcore/ellipsis';
import WhatsAppM from '@semcore/icon/color/WhatsApp/m';
import { Hint } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import AmazonM from '@semcore/icon/color/Amazon/m';

const Demo = () => {
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['kd', 'desc']);
  const sortedData = React.useMemo(
      () =>
          [...data].sort((aRow, bRow) => {
              const [prop, sortDirection] = sort;
              const a = aRow[prop as SortableColumn];
              const b = bRow[prop as SortableColumn];
              if (a === b) return 0;
              if (sortDirection === 'asc') return a > b ? 1 : -1;
              else return a > b ? -1 : 1;
          }),
      [sort],
  );
  const numberFormat = React.useMemo(() => new Intl.NumberFormat('en-US'), []);
  const currencyFormat = React.useMemo(
      () => new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }),
      [],
  );

  return (
    <DataTable data={sortedData} use='secondary' aria-label={'Column expanded'} hMax={200} sort={sort} virtualScroll onSortChange={setSort} >
      <DataTable.Head sticky>
        <DataTable.Head.Column name='keyword' gtcWidth={'65px'} sortable>
          <Text noWrap>
            Keyword <Text color='text-secondary'>(Keyword 1-100)</Text>
          </Text>
        </DataTable.Head.Column>
        <DataTable.Head.Column name='kd' gtcWidth={'85px'}>
          <Text>
            Difficulty Difficlty 123
            <Hint tag={WhatsAppM} title='AmazonM non interactive' color='icon-secondary-neutral' />
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          </Text>
        </DataTable.Head.Column>
        <DataTable.Head.Column name='kd' gtcWidth={'85px'}>
          <Ellipsis>Difficulty Difficulty</Ellipsis>
          <Hint tag={WhatsAppM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
        </DataTable.Head.Column>

        <DataTable.Head.Column name='cpc' children='CPC CPC CPC CPC CPC' gtcWidth={'90px'} />
        <DataTable.Head.Column name='vol' children='Vol.' gtcWidth={'minmax(0, 300px)'} />
        <DataTable.Head.Column name='kd' gtcWidth={'90px'}>
          <Text>
            Marketing SEO
            <Text color='text-secondary'>(Marketing SEO Marketing SEO 1-100)</Text>
          </Text>
        </DataTable.Head.Column>
        <DataTable.Head.Column name='kd' gtcWidth={'90px'}>
          <Text>
            Marketing SEO
            <Text color='text-secondary'>(Marketing SEO Marketing SEO 1-100)</Text>
          </Text>
        </DataTable.Head.Column>
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

const keyword = ['ebay buy', 'www.ebay.com', 'ebay buy']
const kd = ['77.8', '10', '11.2', '-', '75.89'];
const cpc = ['$3.4', '$0.65', '$1.25', '$0', '$0'];
const vol = ['32,500,000', '65,457,920', '47,354,640', 'n/a', '21,644,290'];

const data = Array(10000)
  .fill(0)
  .map((_, index) => ({
    id: `#${index + 1}`,
    keyword: keyword[Math.floor(keyword.length * Math.random())],
    // [ROW_GROUP]: [
    //   {
        kd: kd[Math.floor(kd.length * Math.random())],
        cpc: cpc[Math.floor(cpc.length * Math.random())],
        vol: vol[Math.floor(vol.length * Math.random())],
      // },
    // ],
  }));

export default Demo;
