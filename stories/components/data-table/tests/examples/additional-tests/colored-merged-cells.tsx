import React from 'react';
import { DataTable , ROW_GROUP} from '@semcore/data-table';
import { Box } from '@semcore/flex-box';

const stylesMap = {
    5: 'success',
    6: 'info',
    7: 'muted',
    8: 'warning',
    9: 'danger',
}

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

export default function App() {

    return (
        <Box w={800}>
            <DataTable data={data} aria-label={'Table with fixed columns'} h={'500px'}
                       columns={[
                           {name: 'keyword', children: 'Column 1', fixed: 'left', borders: 'both', gtcWidth: '100px'},
                           {name: 'kd', children: 'Column 2', borders: 'both', gtcWidth: '100px'},
                           {name: 'cpc', children: 'Column 3', borders: 'both', gtcWidth: '100px'},
                           {name: 'vol', children: 'Column 4', borders: 'both', gtcWidth: '100px'},
                         
                       ]}
                       rowProps={(_, index) => {
                           return {
                               // @ts-ignore
                               theme: stylesMap[index],
                           };
                       }}
                       renderCell={(props) => {
                           if (props.columnIndex < 5) {
                               return {
                                   // @ts-ignore
                                   theme: stylesMap[props.columnIndex + 5],
                               };
                           }

                           if (props.rowIndex < 5) {
                               return {
                                   // @ts-ignore
                                   theme: stylesMap[props.rowIndex + 5],
                               };
                           }

                           return props.defaultRender();
                       }}
            />
        </Box>
    );
}
