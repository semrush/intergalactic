import { ButtonAF, PillsAF, SelectAF, InputAF, SwitchAF, TabLineAF, NoticeAF, BadgeAF, RadioAF, CheckboxAF } from '@semcore/accent-feature';
import { Flex } from '@semcore/base-components';
import Checkbox from '@semcore/checkbox';
import { DataTable } from '@semcore/data-table';
import type { DataTableSort } from '@semcore/data-table';
import SummaryAI from '@semcore/icon/SummaryAI/m';
import Radio, { RadioGroup } from '@semcore/radio';
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
      <Flex flexWrap gap={4}>

        <ButtonAF use='primary' addonLeft={SummaryAI}>
          Primary
        </ButtonAF>

        <ButtonAF>
          <ButtonAF.AccentAddon animatedSparkleCount={5} />
          <ButtonAF.Text>Secondary</ButtonAF.Text>
        </ButtonAF>

        <PillsAF defaultValue={1} aria-label='Pills with AI accent'>
          <PillsAF.Item value={1}>One</PillsAF.Item>
          <PillsAF.AccentItem value={2}>
            <PillsAF.AccentItem.Addon animatedSparkleCount={5} />
            <PillsAF.AccentItem.Text>Two</PillsAF.AccentItem.Text>
          </PillsAF.AccentItem>
        </PillsAF>

        <SelectAF onChange={setSelectValue}>
          <SelectAF.Trigger aria-label='Select with AI theme' wMax={160} wMin={160}>
            <SelectAF.Trigger.Addon />
            <SelectAF.Trigger.Text>{selectValue}</SelectAF.Trigger.Text>
          </SelectAF.Trigger>
          <SelectAF.Menu>
            <SelectAF.Option value='One'>One</SelectAF.Option>
            <SelectAF.Option value='Two'>Two</SelectAF.Option>
            <SelectAF.Option value='Three'>Three</SelectAF.Option>
          </SelectAF.Menu>
        </SelectAF>

        <InputAF w={250}>
          <InputAF.AccentAddon />
          <InputAF.Value placeholder='Your domain' aria-label='Input with AI theme' />
          <InputAF.Addon><BadgeAF>AI powered</BadgeAF></InputAF.Addon>
        </InputAF>

        <SwitchAF size='l' theme='ai'>
          <SwitchAF.Value ml={0} />
          <SwitchAF.AnimatedSparkles count={5} />
          <SwitchAF.Addon>Receive updates</SwitchAF.Addon>
        </SwitchAF>

      </Flex>

      <NoticeAF closable aria-label='Notice with AI theme'>
        How would you rate this update?
      </NoticeAF>

      <Flex gap={12}>

        <RadioGroup
          name='radio'
          aria-labelledby='radioGroup'
        >
          <Text id='radioGroup' size={200} mb={2}>
            Radio button with AI accent
          </Text>
          <Flex gap={3} direction='column'>
            <RadioAF value='1'>
              <RadioAF.Value />
              <RadioAF.Text>
                First option
              </RadioAF.Text>
              <RadioAF.Addon animatedSparkleCount={5} />
            </RadioAF>
            <Radio value='2' label='Second option' />
          </Flex>
        </RadioGroup>

        <fieldset style={{ border: 'none' }}>
          <Text tag='legend' size={200} mb={3}>
            Checkbox with AI accent
          </Text>
          <List marker='' m={0} p={0}>
            <List.Item p={0} mb={2}>
              <CheckboxAF>
                <CheckboxAF.Value />
                <CheckboxAF.Text>
                  First option
                </CheckboxAF.Text>
                <CheckboxAF.Addon animatedSparkleCount={5} />
              </CheckboxAF>
            </List.Item>
            <List.Item p={0}>
              <Checkbox label='Second option' />
            </List.Item>
          </List>
        </fieldset>

      </Flex>

      <TabLineAF size='l' aria-label='Tab with AI accent' defaultValue={1}>
        <TabLineAF.Item value={1}>First option</TabLineAF.Item>
        <TabLineAF.AccentItem value={2}>
          <TabLineAF.AccentItem.Addon animatedSparkleCount={5} />
          <TabLineAF.AccentItem.Text>Second option</TabLineAF.AccentItem.Text>
        </TabLineAF.AccentItem>
        <TabLineAF.Item value={3}>Third option</TabLineAF.Item>
      </TabLineAF>

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
