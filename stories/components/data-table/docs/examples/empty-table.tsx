import React from 'react';
import { DataTable } from '@semcore/data-table';

const Demo = () => {
    return (
        <DataTable
            data={[]}
            aria-label={'Empty table example'}
            defaultGridTemplateColumnWidth={'auto'}
            wMax={'800px'}
            headerProps={{
                sticky: true,
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
