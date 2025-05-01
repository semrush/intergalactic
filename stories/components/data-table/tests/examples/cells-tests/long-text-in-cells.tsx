import React from 'react';
import { DataTable } from '@semcore/data-table';
import Ellipsis from '@semcore/ellipsis';
import Link from '@semcore/link';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import InfoM from '@semcore/icon/Info/m';
import CheckM from '@semcore/icon/Check/m';


const Demo = () => {
    return (
        <>
               <DataTable data={data} aria-label={'Access to cells'} hMax={200}
                columns={[
                    { name: 'keyword', children: 'Keyword', gtcWidth:'140px' },
                    { name: 'kd', children: 'KD,%', gtcWidth:'70px'},
                    { name: 'cpc', children: 'CPC' , gtcWidth:'150px'},
                    { name: 'vol', children: 'Vol.', gtcWidth:'150px' },
                ]}
                renderCell={(props) => {
                    if (props.columnName === 'keyword') {
                        return (
                            <Flex>

                                <Text noWrap={true}> NoWrapTrue {props.value}</Text>

                            </Flex>
                        );
                    }

                    if (props.columnName === 'cpc') {
                        return (
                            <Flex>

                                <Text noWrap={false}>No Wrap False {props.value}</Text>
                                <Link
                                    href='#'
                                    target='_blank'
                                    rel='noreferrer'
                                    addonLeft={InfoM}
                                    aria-label='test'
                                    color='gray-300'
                                    ml={1}
                                />
                            </Flex>
                        );
                    }
                    if (props.columnName === 'vol') {
                        return (
                            <>
                                <Ellipsis> {props.value}</Ellipsis>
                                <Link
                                    href='#'
                                    target='_blank'
                                    rel='noreferrer'
                                     aria-label='test2'
                                    addonLeft={InfoM}
                                    color='gray-300'
                                    ml={1}
                                />
                            </>
                        );
                    }
                    return props.defaultRender();
                }}
            />
            <Button addonLeft={CheckM} data-test-id='button-after-table'> Button</Button>
        </>
    );
};

const data = [
    {
        keyword: 'ebay buy',
        kd: '77.8',
        cpc: '$1.25',
        vol: '32,500,000,500,00032,500,000,500,00032,500,000,500,000',
    },
    {
        keyword: 'www.ebay.com',
        kd: '11.2',
        cpc: '$3.4',
        vol: '65,457,920,000,50032,500,000,500,00032,500,000,500,000',
    },
    {
        keyword: 'www.ebay.com',
        kd: '10',
        cpc: '$0.65',
        vol: '47,354,640,000,50032,500,000,500,00032,500,000,500,00032,500,000,500,000',
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
        vol: '21,644,290,000,500',
    },
];
export default Demo;
