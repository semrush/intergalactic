import React from 'react';
import { DataTable } from '@semcore/data-table';

const keywords = ['ebay buy', 'www.ebay.com'];
const kdValues = ['77.8', '11.2', '10', '75.89', '-', '65.3'];
const cpcValues = ['$1.25', '$3.4', '$0.65', '$0', '$2.15'];
const volPatterns = [
  () => 'n/a',
  () => '21,644,290,000,500',
  () => '32,500,000,500,000'.repeat(Math.floor(Math.random() * 3) + 1),
  () => '65,457,920,000,500'.repeat(Math.floor(Math.random() * 3) + 1),
  () => '47,354,640,000,500'.repeat(Math.floor(Math.random() * 4) + 1),
];

function generateData(count:any) {
  return Array.from({ length: count }, () => ({
    keyword: keywords[Math.floor(Math.random() * keywords.length)],
    kd: kdValues[Math.floor(Math.random() * kdValues.length)],
    cpc: cpcValues[Math.floor(Math.random() * cpcValues.length)],
    vol: volPatterns[Math.floor(Math.random() * volPatterns.length)](),
  }));
}
const data = generateData(500);

const Demo = () => {
  return (
    <DataTable
        data={data}
        aria-label={'Base table example'}
        defaultGridTemplateColumnWidth={'auto'}
        wMax={'800px'}
        hMax={'400px'}
        headerProps={{
          sticky: true,
          h: 38,
        }}
        columns={[
          {
            name: 'keyword',
            children: 'keyword'
          },
          {
            name: 'kd',
            children: 'KD,%'
          },
          {
            name: 'cpc',
            children: 'CPC'
          },
          {
            name: 'hiddenColumn',
            children: 'HC'
          },
          {
            name: 'vol',
            children: 'Vol.'
          }
        ]}
    />
  );

};

export default Demo;
