import React from 'react';
import { DataTable, ACCORDION, DataTableData } from '@semcore/data-table';
import { Box } from '@semcore/flex-box';
import { NoData } from '@semcore/widget-empty';

const stylesMap = {
    5: 'success',
    6: 'info',
    7: 'muted',
    8: 'warning',
    9: 'danger',
}


const ChartExample = () => {
    return (

        <NoData type='nothing-found' my={7} mx='auto'>

        </NoData>

    );
};

export default function App() {

    return (
        <Box w={800}>
            <DataTable data={data} aria-label={'Table with fixed columns'} h={'600px'}
                columns={[
                    { name: 'keyword', children: 'Column 4', borders: 'both', gtcWidth: '100px' },
                    { name: 'kd', children: 'Column 5', borders: 'both', gtcWidth: '100px' },
                    { name: 'cpc', children: 'Column 6', borders: 'both', gtcWidth: '100px' },
                    { name: 'vol', children: 'Column 7', borders: 'both', gtcWidth: '100px' },
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

const data: DataTableData = [
    {
        keyword: 'ebay buy',
        kd: '77.8',
        cpc: '$1.25',
        vol: '32,500,000',
        [ACCORDION]: (<ChartExample />),
    },
    {
        keyword: 'www.ebay.com',
        kd: '11.2',
        cpc: '$3.4',
        vol: {
            toString: () => '65,457,920',
            [ACCORDION]: (<ChartExample />),
        },
    },
    {
        keyword: 'www.ebay.com',
        kd: '10',
        cpc: '$0.65',
        vol: '47,354,640',
        [ACCORDION]: (<ChartExample />),
    },
    {
        keyword: 'ebay buy',
        kd: '-',
        cpc: '$0',
        vol: 'n/a',
        [ACCORDION]: (<ChartExample />),
    },
    {
        keyword: 'ebay buy',
        kd: '75.89',
        cpc: '$0',
        vol: '21,644,290',
        [ACCORDION]: (<ChartExample />),
    },
];
