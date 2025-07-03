import { Flex } from '@semcore/base-components';
import Checkbox from '@semcore/checkbox';
import { DataTable } from '@semcore/data-table';
import type { DataTableSort } from '@semcore/data-table';
import { ButtonFH, PillsFH, SelectFH, InputFH, SwitchFH, TabLineFH, NoticeFH, BadgeFH, RadioFH, CheckboxFH } from '@semcore/feature-highlight';
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

        <ButtonFH use='primary' addonLeft={SummaryAI}>
          Primary
        </ButtonFH>

        <ButtonFH>
          <ButtonFH.Addon animatedSparkleCount={5} />
          <ButtonFH.Text>Secondary</ButtonFH.Text>
        </ButtonFH>

        <PillsFH defaultValue={1} aria-label='Pills with AI accent'>
          <PillsFH.Item value={1}>One</PillsFH.Item>
          <PillsFH.HighlightedItem value={2}>
            <PillsFH.HighlightedItem.Addon animatedSparkleCount={5} />
            <PillsFH.HighlightedItem.Text>Two</PillsFH.HighlightedItem.Text>
          </PillsFH.HighlightedItem>
        </PillsFH>

        <SelectFH onChange={setSelectValue}>
          <SelectFH.Trigger aria-label='Select with AI theme' wMax={160} wMin={160}>
            <SelectFH.Trigger.Addon />
            <SelectFH.Trigger.Text>{selectValue}</SelectFH.Trigger.Text>
          </SelectFH.Trigger>
          <SelectFH.Menu>
            <SelectFH.Option value='One'>One</SelectFH.Option>
            <SelectFH.Option value='Two'>Two</SelectFH.Option>
            <SelectFH.Option value='Three'>Three</SelectFH.Option>
          </SelectFH.Menu>
        </SelectFH>

        <InputFH w={250}>
          <InputFH.Addon />
          <InputFH.Value placeholder='Your domain' aria-label='Input with AI theme' />
          <InputFH.Addon><BadgeFH>AI powered</BadgeFH></InputFH.Addon>
        </InputFH>

        <SwitchFH>
          <SwitchFH.Value ml={0} />
          <SwitchFH.AnimatedSparkles count={5} />
          <SwitchFH.Addon>Receive updates</SwitchFH.Addon>
        </SwitchFH>

      </Flex>

      <Flex gap={12}>

        <RadioGroup
          name='radio'
          aria-labelledby='radioGroup'
        >
          <Text id='radioGroup' size={200} mb={2}>
            Radio button with AI accent
          </Text>
          <Flex gap={3} direction='column'>
            <RadioFH value='1'>
              <RadioFH.Value />
              <RadioFH.Text>
                First option
                <SummaryAI color='--intergalactic-icon-primary-feature-highlight' ml={2} style={{ verticalAlign: -3 }} />
              </RadioFH.Text>
              <RadioFH.AnimatedSparkles count={5} />
            </RadioFH>
            <Radio value='2' label='Second option' />
          </Flex>
        </RadioGroup>

        <fieldset style={{ border: 'none' }}>
          <Text tag='legend' size={200} mb={3}>
            Checkbox with AI accent
          </Text>
          <List marker='' m={0} p={0}>
            <List.Item p={0} mb={2}>
              <CheckboxFH>
                <CheckboxFH.Value />
                <CheckboxFH.Text>
                  First option
                  <SummaryAI color='--intergalactic-icon-primary-feature-highlight' ml={2} style={{ verticalAlign: -3 }} />
                </CheckboxFH.Text>
                <CheckboxFH.AnimatedSparkles count={5} />
              </CheckboxFH>
            </List.Item>
            <List.Item p={0}>
              <Checkbox label='Second option' />
            </List.Item>
          </List>
        </fieldset>

      </Flex>

      <TabLineFH size='m' aria-label='Tab with AI accent' defaultValue={1}>
        <TabLineFH.Item value={1}>First option</TabLineFH.Item>
        <TabLineFH.HighlightedItem value={2}>
          <TabLineFH.HighlightedItem.Addon animatedSparkleCount={5} />
          <TabLineFH.HighlightedItem.Text>Second option</TabLineFH.HighlightedItem.Text>
        </TabLineFH.HighlightedItem>
        <TabLineFH.Item value={3}>Third option</TabLineFH.Item>
      </TabLineFH>

      <Flex flexWrap gap={4} mt={4}>

        <ButtonFH use='primary' addonLeft={SummaryAI} size='l'>
          Primary
        </ButtonFH>

        <ButtonFH size='l'>
          <ButtonFH.Addon animatedSparkleCount={5} />
          <ButtonFH.Text>Secondary</ButtonFH.Text>
        </ButtonFH>

        <PillsFH defaultValue={1} aria-label='Pills with AI accent' size='l'>
          <PillsFH.Item value={1}>One</PillsFH.Item>
          <PillsFH.HighlightedItem value={2}>
            <PillsFH.HighlightedItem.Addon animatedSparkleCount={5} />
            <PillsFH.HighlightedItem.Text>Two</PillsFH.HighlightedItem.Text>
          </PillsFH.HighlightedItem>
        </PillsFH>

        <SelectFH onChange={setSelectValue} size='l'>
          <SelectFH.Trigger aria-label='Select with AI theme' wMax={180} wMin={180}>
            <SelectFH.Trigger.Addon />
            <SelectFH.Trigger.Text>{selectValue}</SelectFH.Trigger.Text>
          </SelectFH.Trigger>
          <SelectFH.Menu>
            <SelectFH.Option value='One'>One</SelectFH.Option>
            <SelectFH.Option value='Two'>Two</SelectFH.Option>
            <SelectFH.Option value='Three'>Three</SelectFH.Option>
          </SelectFH.Menu>
        </SelectFH>

        <InputFH w={250} size='l'>
          <InputFH.Addon />
          <InputFH.Value placeholder='Your domain' aria-label='Input with AI theme' />
          <InputFH.Addon><BadgeFH>AI powered</BadgeFH></InputFH.Addon>
        </InputFH>

        <SwitchFH size='l'>
          <SwitchFH.Value ml={0} />
          <SwitchFH.AnimatedSparkles count={5} />
          <SwitchFH.Addon>Receive updates</SwitchFH.Addon>
        </SwitchFH>

      </Flex>

      <Flex gap={16}>

        <RadioGroup
          name='radio-l'
          aria-labelledby='radioGroup-l'
          size='l'
        >
          <Text id='radioGroup-l' size={300} mb={2}>
            Radio button with AI accent
          </Text>
          <Flex gap={3} direction='column'>
            <RadioFH value='1'>
              <RadioFH.Value />
              <RadioFH.Text>
                First option
                <SummaryAI color='--intergalactic-icon-primary-feature-highlight' ml={2} style={{ verticalAlign: -2 }} />
              </RadioFH.Text>
              <RadioFH.AnimatedSparkles count={5} />
            </RadioFH>
            <Radio value='2' label='Second option' />
          </Flex>
        </RadioGroup>

        <fieldset style={{ border: 'none' }}>
          <Text tag='legend' size={300} mb={3}>
            Checkbox with AI accent
          </Text>
          <List marker='' m={0} p={0}>
            <List.Item p={0} mb={2}>
              <CheckboxFH size='l'>
                <CheckboxFH.Value />
                <CheckboxFH.Text>
                  First option
                  <SummaryAI color='--intergalactic-icon-primary-feature-highlight' ml={2} style={{ verticalAlign: -2 }} />
                </CheckboxFH.Text>
                <CheckboxFH.AnimatedSparkles count={5} />
              </CheckboxFH>
            </List.Item>
            <List.Item p={0}>
              <Checkbox size='l' label='Second option' />
            </List.Item>
          </List>
        </fieldset>

      </Flex>

      <TabLineFH size='l' aria-label='Tab with AI accent' defaultValue={1}>
        <TabLineFH.Item value={1}>First option</TabLineFH.Item>
        <TabLineFH.HighlightedItem value={2}>
          <TabLineFH.HighlightedItem.Addon animatedSparkleCount={5} />
          <TabLineFH.HighlightedItem.Text>Second option</TabLineFH.HighlightedItem.Text>
        </TabLineFH.HighlightedItem>
        <TabLineFH.Item value={3}>Third option</TabLineFH.Item>
      </TabLineFH>

      <NoticeFH closable aria-label='Notice with AI theme'>
        How would you rate this update?
      </NoticeFH>

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
        <SummaryAI color='--intergalactic-icon-primary-feature-highlight' />
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
        <SummaryAI color='--intergalactic-icon-primary-feature-highlight' />
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
