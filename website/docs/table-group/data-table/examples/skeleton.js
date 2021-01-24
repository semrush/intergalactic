import React, { useEffect, useState } from 'react';
import DataTable from '@semcore/data-table';
import Skeleton from '@semcore/skeleton';

function getSkeleton() {
  return ['keyword', 'kd', 'cpc', 'vol'].map((c) => ({
    name: c,
    data: (
      <Skeleton height={17}>
        <Skeleton.Text y="5" width="60%" />
      </Skeleton>
    ),
  }));
}

export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      setLoading(!loading);
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [loading]);
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name="keyword" children="Keyword" />
        <DataTable.Column name="kd" children="KD,%" />
        <DataTable.Column name="cpc" children="CPC" />
        <DataTable.Column name="vol" children="Vol." />
      </DataTable.Head>
      <DataTable.Body
        {...(loading ? { rows: [getSkeleton(), getSkeleton(), getSkeleton()] } : {})}
      />
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
];
