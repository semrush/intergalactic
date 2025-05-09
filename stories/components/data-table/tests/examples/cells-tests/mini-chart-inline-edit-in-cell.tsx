import React from 'react';
import { DataTable } from '@semcore/data-table';
import {Box, Flex} from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import MiniChart from '@semcore/mini-chart';
import InlineInput from '@semcore/inline-input';
import InlineEdit from '@semcore/inline-edit';
import EditM from '@semcore/icon/Edit/m';

const Vol = (props: {value: string | React.ReactElement}) => {
    const [text, setText] = React.useState('Martin Eden');
    const [confirmedText, setConfirmedText] = React.useState(text);
    const [editable, setEditable] = React.useState(false);

    return (
        <Flex alignItems='center'>
            <Text w={80}> {props.value}</Text>


            <InlineEdit editable={editable} onEditableChange={setEditable}>
                <InlineEdit.View style={{ display: 'flex', gap: 8, alignItems: 'center' }} pr={2}>
                    {text} <EditM color='icon-secondary-neutral' />
                </InlineEdit.View>
                <InlineEdit.Edit>
                    <InlineInput
                        onConfirm={() => {
                            setEditable(false);
                            setConfirmedText(text);
                        }}
                        onCancel={() => {
                            setText(confirmedText);
                            setEditable(false);
                        }}
                        onBlurBehavior={'confirm'}
                    >
                        <InlineInput.Value
                            autoFocus
                            value={text}
                            onChange={setText}
                            aria-labelledby='author-label'
                        />
                        <InlineInput.ConfirmControl />
                        <InlineInput.CancelControl />
                    </InlineInput>
                </InlineEdit.Edit>
            </InlineEdit>
        </Flex>
    );
}

const Demo = () => {
    const dataChart = [10, 20, 50, 80, 45, 66];
    return (
<>
        <DataTable data={data} aria-label={'Access to cells'} hMax={200}
        columns={[
            {name: 'keyword', children: 'Keyword', gtcWidth:'200px'},
            {name: 'kd', children: 'KD,%',gtcWidth:'200px'},
            {name: 'cpc', children: 'CPC', gtcWidth:'200px'},
            {name: 'vol', children: 'Vol.'},
        ]}
        renderCell={(props) => {
            if (props.columnName === 'keyword') {
                return (
                    <Flex alignItems='center'>
       <InlineInput
      w={150}
      onBlurBehavior='cancel'
      onCancel={console.log}
      onChange={console.log}
      onConfirm={console.log}
    >
      <InlineInput.Addon htmlFor='basic-example' tag='label'>
        User:
      </InlineInput.Addon>
      <InlineInput.Value id='basic-example' defaultValue='John Doe' />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
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
                     <Text w={80}> {props.value}</Text>
                     <MiniChart.TrendLine data={dataChart} aria-hidden />

                    </Flex>
                );
            }

            if (props.columnName === 'vol') {
                return (<Vol value={props.value} />);
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
