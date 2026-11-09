import Button from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import React from 'react';

export type LoadingInScrollProps = {
  virtualScroll?: boolean;
};

export const loadingInScrollProps: LoadingInScrollProps = {
  virtualScroll: false,
};

const Demo = (props: LoadingInScrollProps) => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const showTimeout = setTimeout(() => {
      setLoading(true);

      const hideTimeout = setTimeout(() => {
        setLoading(false);
      }, 3000);

      return () => clearTimeout(hideTimeout);
    }, 3000);

    return () => clearTimeout(showTimeout);
  }, []);

  return (
    <>
      <Button>Click</Button>
      <DataTable
        data={props.virtualScroll ? manyRows : data}
        aria-label='Scroll inside'
        loading={loading}
        wMax={800}
        hMax={200}
        virtualScroll={props.virtualScroll}
        columns={[
          {
            name: 'keyword',
            children: 'keyword',
          },
          {
            name: 'kd',
            children: 'KD,%',
          },
          {
            name: 'cpc',
            children: 'CPC',
          },
          {
            name: 'vol',
            children: 'Vol.',
          },
        ]}
      />
    </>
  );
};

const data = [
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: '21,644,290' },
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: '21,644,290' },
];

const manyRows = Array.from({ length: 500 }, (_, index) => data[index % data.length]);

export default Demo;
