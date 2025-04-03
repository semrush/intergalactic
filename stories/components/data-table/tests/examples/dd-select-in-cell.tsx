import React from 'react';
import { DataTable } from '@semcore/data-table';
import Checkbox from '@semcore/checkbox';
import { Flex } from '@semcore/flex-box';
import Button from '@semcore/button';
import Dropdown from '@semcore/ui/dropdown';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import { Hint } from '@semcore/tooltip';
import InfoM from '@semcore/icon/Info/m';

const options = Array(6)
    .fill('')
    .map((_, index) => ({
        value: index,
        label: `Option ${index}`,
        children: `Option ${index}`,
    }));

const Demo = () => {
    return (
        <DataTable data={data} aria-label={'Access to cells'} hMax={200}>
            <DataTable.Head sticky>
                <DataTable.Head.Column name='keyword' children='Keyword' />
                <DataTable.Head.Column name='kd' children='KD,%' />
                <DataTable.Head.Column name='cpc' children='CPC' />
                <DataTable.Head.Column name='vol' children='Vol.' />
            </DataTable.Head>
            <DataTable.Body
                renderCell={(props) => {
                    if (props.name === 'keyword') {
                        return (
                            <Flex alignItems='center'>
                                <Checkbox label="Option 1" />
                                <Text noWrap>
                                    Keyword <Text color='text-secondary'>(100)</Text>
                                </Text>
                                <Hint
                                    ml={1}
                                    tag={InfoM}
                                    interactive
                                    title='Go to our awesome article'
                                    data-test-id='interactive-icon'
                                    color='icon-secondary-neutral'
                                />
                                <Select mt={2} mr='auto' options={options} placeholder='Select option' id='basic-select' />

                            </Flex>
                        );
                    }


                    if (props.name === 'kd') {
                        return (
                            <>

                                <Select mt={2} mr='auto' options={options} placeholder='Select option' id='basic-select' />

                            </>
                        );
                    }




                    if (props.name === 'cpc') {
                        return (
                            <>
                                <Dropdown>
                                    <Dropdown.Trigger id='dropdown-basic' tag={Button}>
                                        {props.value}
                                    </Dropdown.Trigger>
                                    <Dropdown.Popper p={4} wMax={260} aria-labelledby='dropdown-basic'>
                                        <Text size={200}>You can export up to 300 records in CSV or PDF format.</Text>
                                    </Dropdown.Popper>
                                </Dropdown>
                            </>
                        );
                    }


                    return props.defaultRender();
                }}
            />
            {/*  <DataTable.Body.Cell data={data} name='keyword'>*/}
            {/*    {(props, row, index) => {*/}
            {/*      return {*/}
            {/*        children: (*/}
            {/*          <ButtonLink*/}
            {/*            onClick={() => {*/}
            {/*              alert(`Click row */}
            {/*            props: ${JSON.stringify(Object.keys(props), null, '  ')};*/}
            {/*            row: ${JSON.stringify(row, null, '  ')};*/}
            {/*            index: ${index};`);*/}
            {/*            }}*/}
            {/*          >*/}
            {/*            {row[props.name]}*/}
            {/*          </ButtonLink>*/}
            {/*        ),*/}
            {/*      };*/}
            {/*    }}*/}
            {/*  </DataTable.Body.Cell>*/}
            {/*</DataTable.Body>*/}
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
