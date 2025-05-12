import React, { useEffect } from 'react';
import { DataTable } from '@semcore/data-table';
import Ellipsis from '@semcore/ellipsis';
import Link from '@semcore/link';
import Button, { ButtonLink } from '@semcore/button';
import { Text } from '@semcore/typography';
import Tooltip, { Hint, DescriptionTooltip } from '@semcore/tooltip';

import { Flex } from '@semcore/flex-box';
import InfoM from '@semcore/icon/Info/m';
import CheckM from '@semcore/icon/Check/m';

const keywords = ['ebay buy', 'www.ebay.com'];
const kdValues = ['77.8', '11.2', '10', '75.89', '-', '65.3'];
const cpcValues = ['$1.25', '$3.4', '$0.65', '$0', '$2.15'];
const volPatterns = [
    () => 'n/a',
    () => '21,644,290,000,500',
    () => '32,500,000,500,000'.repeat(Math.floor(Math.random() * 3) + 1),
    () => '65,457,920,000,500'.repeat(Math.floor(Math.random() * 3) + 1),
    () => '47,354,640,000,500'.repeat(Math.floor(Math.random() * 4) + 1),
];

function generateData(count:any) {
    return Array.from({ length: count }, () => ({
        keyword: keywords[Math.floor(Math.random() * keywords.length)],
        kd: kdValues[Math.floor(Math.random() * kdValues.length)],
        cpc: cpcValues[Math.floor(Math.random() * cpcValues.length)],
        vol: volPatterns[Math.floor(Math.random() * volPatterns.length)](),
    }));
}

const Demo = () => {
    const data = generateData(100);

    useEffect(() => {
        performance.mark('demo-render-start');

        requestAnimationFrame(() => {
            performance.mark('demo-render-end');
         
            performance.measure('demo-render', 'demo-render-start', 'demo-render-end');

           
            const measure = performance.getEntriesByName('demo-render')[0];
            console.log(`Render time: ${measure.duration.toFixed(2)}ms`);
        });
    }, []); 

    return (
        <>
            <DataTable
                data={data} aria-label={'Access to cells'} hMax={400} 
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


export default Demo;
