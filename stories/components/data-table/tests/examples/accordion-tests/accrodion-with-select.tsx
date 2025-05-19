import React from 'react';
import { DataTable, ACCORDION, DataTableData } from '@semcore/data-table';
import { NoData } from '@semcore/widget-empty';
import Select from '@semcore/select';

const options = Array(6)
    .fill('')
    .map((_, index) => ({
        value: index,
        label: `Option ${index}`,
        children: `Option ${index}`,
    }));

const stopPropagation = (event: React.SyntheticEvent) => {
    event.stopPropagation();
}

const CustomSelect = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    return (
        <Select visible={isVisible} onVisibleChange={setIsVisible} mt={2} mr='auto' options={options} placeholder='Select option' id='basic-select'
            onKeyDown={(e) => {
                if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !isVisible) {
                    return false
                }
                if (e.key.startsWith('Arrow') && isVisible) {
                    e.stopPropagation();
                }
            }}
            onClick={stopPropagation}
        />
    );
};

const Demo = () => {
    return (
        <DataTable data={data} aria-label={'Accordion inside table'} h={'100%'}
            columns={[
                { name: 'keyword', children: 'Keyword', gtcWidth: 'minmax(60%, 80%)' },
                {
                    children: 'Organic Sessions',
                    borders: 'both',
                    columns: [
                        { name: 'kd', children: 'KD,%' },
                        { name: 'cpc', children: 'CPC' },
                        { name: 'vol', children: 'Vol.' },
                    ]
                }
            ]}

            renderCell={(props) => {
                if (props.dataKey === 'keyword') {
                    return (<CustomSelect />);
                }

                if (props.dataKey === 'kd') {
                    return {
                        'data-test-id': 'kd cell',
                    };
                }

                return props.defaultRender();
            }}
        />
    );
};

const ChartExample = () => {
    return (
        <NoData type='nothing-found' my={7} mx='auto'>

        </NoData>
    );
};

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

export default Demo;
