import React from 'react';
import { DataTable, ACCORDION, DataTableData } from '@semcore/data-table';
import { ButtonLink } from '@semcore/button';
import { NoData } from '@semcore/widget-empty';
import Checkbox from '@semcore/checkbox';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Link from '@semcore/link';
import InfoM from '@semcore/icon/Info/m';
import { DescriptionTooltip, Hint } from '@semcore/tooltip';

const stopPropagation = (event: React.SyntheticEvent) => {
    event.stopPropagation();
}

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
                    return (
                        <Flex alignItems='center'>
                            <Checkbox label="Option 1" onClick={stopPropagation} />
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
                                onClick={stopPropagation}
                            />
                            <DescriptionTooltip onClick={stopPropagation}>
                                <DescriptionTooltip.Trigger tag={ButtonLink} use={'secondary'}>
                                    About fastest animals
                                </DescriptionTooltip.Trigger>
                                <DescriptionTooltip.Popper aria-label='About fastest animals'>
                                    <Text tag='p' mb={3}>
                                        The <Link href='https://en.wikipedia.org/wiki/Peregrine_falcon'>peregrine falcon</Link>{' '}
                                        is the fastest bird, and the fastest member of the animal kingdom, with a diving speed
                                        of over 300 km/h (190 mph).
                                    </Text>

                                </DescriptionTooltip.Popper>
                            </DescriptionTooltip>
                        </Flex>
                    );
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
