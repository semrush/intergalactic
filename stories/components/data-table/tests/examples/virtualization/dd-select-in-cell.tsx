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

const keyword = ['ebay buy', 'www.ebay.com', 'ebay buy']
const kd = ['77.8', '10', '11.2', '-', '75.89'];
const cpc = ['$3.4', '$0.65', '$1.25', '$0', '$0'];
const vol = ['32,500,000', '65,457,920', '47,354,640', 'n/a', '21,644,290'];

const options = Array(6)
    .fill('')
    .map((_, index) => ({
        value: index,
        label: `Option ${index}`,
        children: `Option ${index}`,
    }));

const data = Array(10000)
  .fill(0)
  .map((_, index) => ({
    id: `#${index + 1}`,
    keyword: keyword[Math.floor(keyword.length * Math.random())],
    // [ROW_GROUP]: [
    //   {
        kd: kd[Math.floor(kd.length * Math.random())],
        cpc: cpc[Math.floor(cpc.length * Math.random())],
        vol: vol[Math.floor(vol.length * Math.random())],
      // },
    // ],
  }));

const Demo = () => {
  return (
    <DataTable data={data} totalRows={10000} aria-label={'Virtual scroll'} h={400} virtualScroll={{rowHeight: 65}}>
      <DataTable.Head sticky>
        <DataTable.Head.Column name='id' children='ID' />
        <DataTable.Head.Column name='keyword' children='Keyword' gtcWidth={'300px'} />
        <DataTable.Head.Group title={'Organic Sessions'}>
          <DataTable.Head.Column name='kd' children='KD,%' />
          <DataTable.Head.Column name='cpc' children='CPC' />
          <DataTable.Head.Column name='vol' children='Vol.' />
        </DataTable.Head.Group>
      </DataTable.Head>
      <DataTable.Body
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
                                <Select mt={2} mr='auto' options={options} placeholder='Select option' id='basic-select' />

                            </Flex>
                        );
                    }


                    if (props.columnName === 'kd') {
                        return (
                            <>
                                <Select mt={2} mr='auto' options={options} placeholder='Select option' id='basic-select' />
                            </>
                        );
                    }




                    if (props.columnName === 'cpc') {
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
    </DataTable>
  );
};

export default Demo;

