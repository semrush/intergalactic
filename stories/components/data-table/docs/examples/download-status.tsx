import React from 'react';
import DataTable from '@semcore/data-table';
import SpinContainer from '@semcore/spin-container';

const Demo = (): any => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setLoading(!loading);
    }, 1500);
    return () => {
      clearInterval(timer);
    };
  }, [loading]);
  return (
    <DataTable data={data} aria-label={'Table title. Download status'}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <SpinContainer
        loading={loading}
        style={{ overflow: 'initial' }}
        use:aria-busy={undefined}
        // @ts-ignore
        inert={loading ? '' : undefined}
      >
        <DataTable.Body aria-busy={loading} />
        <SpinContainer.Overlay />
      </SpinContainer>
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];

export default Demo;
