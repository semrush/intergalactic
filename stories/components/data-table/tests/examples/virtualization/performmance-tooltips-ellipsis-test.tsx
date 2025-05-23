import React,  { useEffect } from 'react';
import { DataTable } from '@semcore/data-table';
import Ellipsis from '@semcore/ellipsis';
import Link from '@semcore/link';
import Button, {ButtonLink} from '@semcore/button';
import { Text } from '@semcore/typography';
import Tooltip, { Hint, DescriptionTooltip }  from '@semcore/tooltip';

import { Flex } from '@semcore/flex-box';
import InfoM from '@semcore/icon/Info/m';
import CheckM from '@semcore/icon/Check/m';


const Demo = () => {

    return (
        <>
            <DataTable
                data={data} aria-label={'Access to cells'} hMax={400} virtualScroll
                headerProps={{
                    sticky: true,
                }}
                columns={[
                    {
                        name: 'index',
                        children: '№',
                        gtcWidth: '50px',
                    },
                    {
                        name: 'keyword',
                        children: 'keyword',
                        gtcWidth: '140px',
                    },
                    {
                        name: 'kd',
                        children: 'KD,%',
                        gtcWidth: '70px'
                    },
                    {
                        name: 'cpc',
                        children: 'CPC',
                        gtcWidth: '150px'
                    },
                    {
                        name: 'vol',
                        children: 'Vol.',
                        gtcWidth: '150px'
                    }
                ]}
                renderCell={(props) => {
                    if (props.columnName === 'keyword') {
                        return (
                            <Flex>

                                <Text tag={Tooltip} noWrap={true}> NoWrapTrue {props.value}</Text>
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

                    if (props.columnName === 'cpc') {
                        return (
                            <Flex>

                                <Text noWrap={false}>No Wrap False {props.value}</Text>
                                <Link
                                    href='#'
                                    target='_blank'
                                    rel='noreferrer'
                                    addonLeft={InfoM}
                                    color='gray-300'
                                    ml={1}
                                    title='TEST'
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
                                    addonLeft={InfoM}
                                    color='gray-300'
                                    ml={1}
                                    aria-label='TEST'
                                />
                            </>
                        );
                    }
                    if (props.columnName === 'index') {
                        return props.rowIndex + 1;
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

];
export default Demo;
