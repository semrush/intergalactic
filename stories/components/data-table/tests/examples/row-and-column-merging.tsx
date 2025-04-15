import React from 'react';
import { DataTable, ROW_GROUP } from '@semcore/data-table';

const data = [
    {
        keyword: 'ebay buy',
        'kd/cpc/vol': 'These three columns are grouped.',
    },
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
        kd: '75.89',
        cpc: '$0',
        vol: '21,644,290',
    },
    {
        keyword: 'www.ebay.com',
        [ROW_GROUP]: [
            {
                kd: '11.2',
                'cpc/vol': 'These TWO columns are grouped.',
            },
            {
                kd: '10',
                cpc: '$0.65',
                vol: '47,354,640',
            },
        ],
    },
    {
        keyword: 'ebay buy',
        'kd/cpc/vol': 'These three columns are grouped.',
    },
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
        kd: '75.89',
        cpc: '$0',
        vol: '21,644,290',
    },
    {
        keyword: 'www.ebay.com',
        [ROW_GROUP]: [
            {
                kd: '11.2',
                'cpc/vol': 'These TWO columns are grouped.',
            },
            {
                kd: '10',
                cpc: '$0.65',
                vol: '47,354,640',
            },
        ],
    },
    {
        keyword: 'ebay buy',
        'kd/cpc/vol': 'These three columns are grouped.',
    },
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
        kd: '75.89',
        cpc: '$0',
        vol: '21,644,290',
    },
    {
        keyword: 'www.ebay.com',
        [ROW_GROUP]: [
            {
                kd: '11.2',
                'cpc/vol': 'These TWO columns are grouped.',
            },
            {
                kd: '10',
                cpc: '$0.65',
                vol: '47,354,640',
            },
        ],
    },
];

const Demo = () => {
    return (
        <DataTable data={data} aria-label={'Columns merging'} h={300}>
            <DataTable.Head>
                <DataTable.Head.Column name='keyword' children='Keyword' />
                <DataTable.Head.Column name='kd' children='KD,%' />
                <DataTable.Head.Column name='cpc' children='CPC' />
                <DataTable.Head.Column name='vol' children='Vol.' />
            </DataTable.Head>
            <DataTable.Body />
        </DataTable>
    );
};

export default Demo;
