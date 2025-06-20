import Badge from '@semcore/badge';
import { Flex } from '@semcore/base-components';
import Button from '@semcore/button';
import Checkbox from '@semcore/checkbox';
import { DataTable } from '@semcore/data-table';
import type { DataTableSort } from '@semcore/data-table';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import Input from '@semcore/input';
import { NoticeSmart } from '@semcore/notice';
import Pills from '@semcore/pills';
import Radio, { RadioGroup } from '@semcore/radio';
import Select from '@semcore/select';
import Switch from '@semcore/switch';
import TabLine from '@semcore/tab-line';
import { Text, List } from '@semcore/typography';
import React from 'react';

const Demo = () => {
  const [selectValue, setSelectValue] = React.useState('');
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['cpc', 'desc']);
  const handleSortChange: (sort: DataTableSort<string>, e?: React.SyntheticEvent) => void = (
    newSort,
  ) => {
    setSort(newSort as DataTableSort<SortableColumn>);
  };
  return (
    <Flex gap={4} direction='column'>
      <style>
        {`
          #secondary-button {
            & [data-ui-name='Button.Addon'] {
              color: var(--intergalactic-icon-primary-ai)
            }
          }
        `}
      </style>
      <Flex flexWrap gap={4}>

        <Button use='primary' theme='ai' addonLeft={SummaryAI}>
          Primary
        </Button>

        <Button addonLeft={SummaryAI} id='secondary-button'>Secondary</Button>

        <Pills defaultValue={1} aria-label='Pills with AI accent'>
          <Pills.Item value={1}>One</Pills.Item>
          <Pills.Item value={2} addonLeft={SummaryAI}>Two</Pills.Item>
        </Pills>

        <Select onChange={setSelectValue}>
          <Select.Trigger aria-label='Select with AI theme' wMax={160} wMin={160}>
            <Select.Trigger.Addon tag={SummaryAI} />
            <Select.Trigger.Text>{selectValue}</Select.Trigger.Text>
          </Select.Trigger>
          <Select.Menu>
            <Select.Option value='One'>One</Select.Option>
            <Select.Option value='Two'>Two</Select.Option>
            <Select.Option value='Three'>Three</Select.Option>
          </Select.Menu>
        </Select>

        <Input w={220}>
          <Input.Addon tag={SummaryAI} />
          <Input.Value placeholder='Your domain' aria-label='Input with AI theme' />
          <Input.Addon><Badge>AI powered</Badge></Input.Addon>
        </Input>

        <Switch size='l' theme='ai'>
          <Switch.Value defaultChecked={true} ml={0} />
          <Switch.Addon>Receive updates</Switch.Addon>
        </Switch>

      </Flex>

      <NoticeSmart theme='ai' closable aria-label='Notice with AI theme'>
        How would you rate this update?
      </NoticeSmart>

      <Flex gap={12}>

        <RadioGroup
          name='radio'
          aria-labelledby='radioGroup'
        >
          <Text id='radioGroup' size={200} mb={2}>
            Radio button with AI accent
          </Text>
          <Flex gap={3} direction='column'>
            <Radio value='1'>
              <Radio.Value />
              <Radio.Text>
                First option
                <SummaryAI color='icon-primary-ai' ml={2} style={{ verticalAlign: -2 }} />
              </Radio.Text>
            </Radio>
            <Radio value='2' label='Second option' />
          </Flex>
        </RadioGroup>

        <fieldset style={{ border: 'none' }}>
          <Text tag='legend' size={200} mb={3}>
            Checkbox with AI accent
          </Text>
          <List marker='' m={0} p={0}>
            <List.Item p={0} mb={2}>
              <Checkbox>
                <Checkbox.Value />
                <Checkbox.Text>
                  First option
                  <SummaryAI color='icon-primary-ai' ml={2} style={{ verticalAlign: -2 }} />
                </Checkbox.Text>
              </Checkbox>
            </List.Item>
            <List.Item p={0}>
              <Checkbox label='Second option' />
            </List.Item>
          </List>
        </fieldset>

      </Flex>

      <TabLine size='l' aria-label='Tab with AI accent' defaultValue={1}>
        <TabLine.Item value={1}>First option</TabLine.Item>
        <TabLine.Item value={2}>
          <TabLine.Item.Addon tag={SummaryAI} />
          <TabLine.Item.Text>Second option</TabLine.Item.Text>
        </TabLine.Item>
      </TabLine>

      <DataTable
        data={data}
        sort={sort}
        onSortChange={handleSortChange}
        aria-label='Primary table with AI column'
        wMax='800px'
        columns={columnsPrimary}
      />

      <DataTable
        use='secondary'
        data={data}
        aria-label='Secondary table with AI column'
        wMax='300px'
        columns={columnsSecondary}
      />
    </Flex>
  );
};

type SortableColumn = Exclude<keyof typeof data[0], 'keyword'>;

const columnsPrimary = [
  {
    name: 'keyword',
    children: 'Keyword',
  },
  {
    name: 'kd',
    children: (
      <>
        <SummaryAI color='icon-primary-ai' />
        KD %
      </>
    ),
    sortable: true,
    style: { gap: '4px' },
    justifyContent: 'end',
  },
  {
    name: 'cpc',
    children: 'CPC',
    sortable: true,
    justifyContent: 'end',
  },
];

const columnsSecondary = [
  {
    name: 'keyword',
    children: 'Keyword',
  },
  {
    name: 'kd',
    children: (
      <>
        <SummaryAI color='icon-primary-ai' />
        KD %
      </>
    ),
    style: { gap: '4px' },
    justifyContent: 'end',
  },
  {
    name: 'cpc',
    children: 'CPC',
    justifyContent: 'end',
  },
];

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
  },
];

export default Demo;
