import React from 'react';
import { DataTable } from '@semcore/data-table';
import Button from '@semcore/ui/button';
import { ScreenReaderOnly } from '@semcore/ui/flex-box';

const Demo = (): any => {
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const toggleLoading = () => {
    setLoading(!loading);
    setMessage(loading ? 'Data loaded' : 'Loading started');
  };

  return (
    <>
      <ScreenReaderOnly role='status' aria-live='polite'>
        {message}
      </ScreenReaderOnly>
      <DataTable data={data} aria-label={'Loading using SpinContainer'} loading={loading}
                 h={150}
                 columns={[
                   {name: 'keyword', children: 'Keyword'},
                   {name: 'kd', children: 'KD,%'},
                   {name: 'cpc', children: 'CPC'},
                   {name: 'vol', children: 'Vol.'},
                 ]}
      />
      <Button onClick={toggleLoading} mt={3}>
        {loading ? 'Stop loading' : 'Start loading'}
      </Button>
    </>
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
