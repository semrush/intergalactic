import React from 'react';
import { DataTable } from '@semcore/data-table';
import { ButtonLink } from '@semcore/button';
import Checkbox from '@semcore/checkbox';
import Link from '@semcore/link';
import Button from '@semcore/button';
import Ellipsis from '@semcore/ellipsis';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/flex-box';
import { DescriptionTooltip, Hint } from '@semcore/tooltip';
import InfoM from '@semcore/icon/Info/m';
import CheckM from '@semcore/icon/Check/m';


const Demo = () => {
    return (
        <>
            <DataTable data={data} aria-label={'Access to cells'} hMax={200} virtualScroll
                columns={[
                    { name: 'keyword', children: 'Keyword' },
                    { name: 'kd', children: 'KD,%' },
                    { name: 'cpc', children: 'CPC' },
                    { name: 'vol', children: 'Vol.' },
                ]}
                renderCell={(props) => {
                    if (props.columnName === 'keyword') {
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
                                <DescriptionTooltip>
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
                    if (props.columnName === 'kd') {
                        return (
                            <>
                                <DescriptionTooltip>
                                    <DescriptionTooltip.Trigger tag={ButtonLink} use={'secondary'}>
                                        {props.value}
                                    </DescriptionTooltip.Trigger>
                                    <DescriptionTooltip.Popper aria-label='About fastest animals'>
                                        <Text tag='p' mb={3}>
                                            The <Link href='https://en.wikipedia.org/wiki/Peregrine_falcon'>peregrine falcon</Link>{' '}
                                            is the fastest bird, and the fastest member of the animal kingdom, with a diving speed
                                            of over 300 km/h (190 mph).
                                        </Text>
                                        <Text tag='p'>
                                            The fastest land animal is the cheetah. Among the fastest animals in the sea is the
                                            black marlin, with uncertain and conflicting reports of recorded speeds.
                                        </Text>
                                    </DescriptionTooltip.Popper>
                                </DescriptionTooltip>
                            </>
                        );
                    }
                    if (props.columnName === 'cpc') {
                        return (
                            <>
                                <Button addonLeft={CheckM}> {props.value}</Button>
                                <Button addonLeft={CheckM}> {props.value}</Button>

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
