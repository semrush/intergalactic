import React from 'react';
import { DataTable, ACCORDION, DataTableData } from '@semcore/data-table';
import { Flex } from '@semcore/flex-box';
import { NoData } from '@semcore/widget-empty';
import InlineInput from '@semcore/inline-input';
import InlineEdit from '@semcore/inline-edit';
import EditM from '@semcore/icon/Edit/m';
import { Text } from '@semcore/typography';

const stopPropagation = (event: React.SyntheticEvent) => {
    event.stopPropagation();
}

const Vol = (props: { value: string | React.ReactElement }) => {
    const [text, setText] = React.useState('Martin Eden');
    const [confirmedText, setConfirmedText] = React.useState(text);
    const [editable, setEditable] = React.useState(false);

    return (
        <Flex alignItems='center'>
            <Text w={80}> {props.value}</Text>
            <InlineEdit editable={editable} onEditableChange={setEditable} onClick={stopPropagation}>
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
                if (props.columnName === 'keyword') {
                    return (<Vol value={props.value} />);
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
