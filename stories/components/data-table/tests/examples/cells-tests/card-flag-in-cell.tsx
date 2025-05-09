import React from 'react';
import { DataTable } from '@semcore/data-table';
import { Box, Flex } from '@semcore/flex-box';
import Button from '@semcore/button';
import { Text } from '@semcore/typography';
import MiniChart from '@semcore/mini-chart';
import Card from '@semcore/card';
import SettingsM from '@semcore/icon/Settings/m';
import Flags, { iso2Name } from '@semcore/ui/flags';

const tooltipContent =
    'When drawing comparisons between different classes of animals, an alternative unit is sometimes used for organisms: body length per second.';

const options = Array(6)
    .fill('')
    .map((_, index) => ({
        value: index,
        label: `Option ${index}`,
        children: `Option ${index}`,
    }));



const Demo = () => {
    const dataChart = [10, 20, 50, 80, 45, 66];
    const [text, setText] = React.useState('Martin Eden');
    const [confirmedText, setConfirmedText] = React.useState(text);
    const [editable, setEditable] = React.useState(false);
    return (
        <>
            <Flags name='ES' mb={2} />

            <DataTable data={data} aria-label={'Access to cells'} h={'100%'}
                columns={[
                    { name: 'keyword', children: 'Keyword' },
                    { name: 'kd', children: 'KD,%' },
                    { name: 'cpc', children: 'CPC', gtcWidth: '200px' },
                    { name: 'vol', children: 'Vol.' },
                ]}
                renderCell={(props) => {
                    if (props.columnName === 'keyword') {
                        return (
                            <Flex alignItems='center'>

                                <Card tag='section' aria-labelledby='card-title'>
                                    <Card.Header>
                                        <Flex justifyContent='space-between' alignItems='center'>
                                            <Card.Title
                                                innerHint={tooltipContent}
                                                innerHintAriaLabel='About fastest animals'
                                                tag='h3'
                                                id='card-title'
                                            >
                                                Fastest animals
                                            </Card.Title>
                                            <Button addonLeft={SettingsM} use='tertiary' theme='muted' aria-label='Settings' />
                                        </Flex>
                                        <Card.Description>
                                            This is a list of the fastest animals in the world, by types of animal.
                                        </Card.Description>
                                    </Card.Header>
                                    <Card.Body>
                                        <Text size={200}>
                                            The peregrine falcon is the fastest bird, and the fastest member of the animal kingdom, with
                                            a diving speed of over 300 km/h (190 mph). The fastest land animal is the cheetah.
                                        </Text>
                                    </Card.Body>
                                </Card>
                            </Flex>
                        );
                    }


                    if (props.columnName === 'kd') {
                        return (
                            <Box>
                                <MiniChart.ScoreSemiDonut value={45} w={'50px'} aria-labelledby={'mylabel'} />
                            </Box>
                        );
                    }

               if (props.columnName === 'cpc') {
                        return (
                            <Flex alignItems='center'>
                                <Text w={40}> Flag:</Text>
                                <Flags name='ES' mb={2} />
                                <Text w={80}> {props.value}</Text>
                            </Flex>
                        );
                    }
                    return props.defaultRender();
                }}
            />
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
