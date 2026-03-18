import SummaryAI from '@semcore/icon/SummaryAI/m';
import { Box, Flex } from '@semcore/ui/base-components';
import Checkbox from '@semcore/ui/checkbox';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableSort } from '@semcore/ui/data-table';
import { ButtonFH, PillsFH, SelectFH, InputFH, SwitchFH, TabLineFH, NoticeFH, BadgeFH, RadioFH, CheckboxFH } from '@semcore/ui/feature-highlight';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import { Text, List } from '@semcore/ui/typography';
import React from 'react';

export type ExampleButtonHihlightProps = { disabled: any; state: any; checked: any; active: boolean; loading: boolean; animatedSparkleCount: number; size: any };

const Demo = (props: ExampleButtonHihlightProps) => {
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

        <Flex flexWrap gap={4} data-testid='buttons'>
          <ButtonFH use='primary' addonLeft={SummaryAI} disabled={props.disabled} size={props.size} active={props.active} loading={props.loading}>
            Primary
          </ButtonFH>

          <ButtonFH size={props.size} disabled={props.disabled} active={props.active} loading={props.loading}>
            <ButtonFH.Addon animatedSparkleCount={props.animatedSparkleCount} />
            <ButtonFH.Text>Secondary</ButtonFH.Text>
            <ButtonFH.Addon> <BadgeFH>AI powered</BadgeFH> </ButtonFH.Addon>
          </ButtonFH>
        </Flex>

        <Flex flexWrap gap={4} data-testid='pills'>
          <PillsFH defaultValue={1} aria-label='Pills with AI accent' size={props.size}>
            <PillsFH.Item value={1} disabled={props.disabled}>One</PillsFH.Item>
            <PillsFH.HighlightedItem value={2} disabled={props.disabled}>
              <PillsFH.HighlightedItem.Addon animatedSparkleCount={props.animatedSparkleCount} />
              <PillsFH.HighlightedItem.Text>Two</PillsFH.HighlightedItem.Text>
            </PillsFH.HighlightedItem>
          </PillsFH>
        </Flex>

        <SelectFH onChange={setSelectValue} disabled={props.disabled} size={props.size} state={props.state}>
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
        <Flex flexWrap gap={4} data-testid='input'>

          <InputFH w={250} disabled={props.disabled} size={props.size} state={props.state}>
            <InputFH.Addon />
            <InputFH.Value placeholder='Your domain' aria-label='Input with AI theme' />
            <InputFH.Addon><BadgeFH>AI powered</BadgeFH></InputFH.Addon>
          </InputFH>
        </Flex>
        <SwitchFH size={props.size}>
          <SwitchFH.Value ml={0} disabled={props.disabled} checked={props.checked} />
          <SwitchFH.AnimatedSparkles count={props.animatedSparkleCount} />
          <SwitchFH.Addon>Receive updates</SwitchFH.Addon>
        </SwitchFH>

      </Flex>

      <Flex gap={12}>

        <RadioGroup
          size={props.size}
          disabled={props.disabled}
          name='radio'
          aria-labelledby='radioGroup'
        >
          <Text id='radioGroup' size={200} mb={2}>
            Radio button with AI accent
          </Text>
          <Flex gap={3} direction='column'>
            <RadioFH value='1' state={props.state}>
              <RadioFH.Value />
              <RadioFH.Text>
                First option
                <Box tag={SummaryAI} color='--intergalactic-icon-primary-feature-highlight' ml={2} style={{ verticalAlign: -3 }} />
              </RadioFH.Text>
              <RadioFH.AnimatedSparkles count={props.animatedSparkleCount} />
            </RadioFH>
            <Radio value='2' label='Second option' state={props.state} />
          </Flex>
        </RadioGroup>

        <RadioFH value='3' checked={props.checked} state={props.state}>
          <RadioFH.Value />
          <RadioFH.Text>
            First option
            <Box tag={SummaryAI} color='--intergalactic-icon-primary-feature-highlight' ml={2} style={{ verticalAlign: -3 }} />
          </RadioFH.Text>
          <RadioFH.AnimatedSparkles count={props.animatedSparkleCount} />
        </RadioFH>

        <fieldset style={{ border: 'none' }}>
          <Text tag='legend' size={200} mb={3}>
            Checkbox with AI accent
          </Text>
          <List marker='' m={0} p={0}>
            <List.Item p={0} mb={2}>
              <CheckboxFH size={props.size} state={props.state} checked={props.checked} disabled={props.disabled}>
                <CheckboxFH.Value />
                <CheckboxFH.Text>
                  First option
                  <Box
                    tag={SummaryAI}
                    color='--intergalactic-icon-primary-feature-highlight'
                    ml={2}
                    style={{ verticalAlign: -3 }}
                  />
                </CheckboxFH.Text>
                <CheckboxFH.AnimatedSparkles count={props.animatedSparkleCount} />
              </CheckboxFH>
            </List.Item>
            <List.Item p={0} size={props.size}>
              <Checkbox label='Second option' size={props.size} state={props.state} checked={props.checked} disabled={props.disabled} />
            </List.Item>
          </List>
        </fieldset>

      </Flex>

      <TabLineFH aria-label='Tab with AI accent' defaultValue={1} size={props.size}>
        <TabLineFH.Item value={1} disabled={props.disabled}>First option</TabLineFH.Item>
        <TabLineFH.HighlightedItem value={2} disabled={props.disabled}>
          <TabLineFH.HighlightedItem.Addon animatedSparkleCount={props.animatedSparkleCount} />
          <TabLineFH.HighlightedItem.Text>Second option</TabLineFH.HighlightedItem.Text>
        </TabLineFH.HighlightedItem>
        <TabLineFH.Item value={3} disabled={props.disabled}>Third option</TabLineFH.Item>
      </TabLineFH>

      <NoticeFH closable aria-label='Notice with AI theme' text='How would you rate this update?' />

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

export const defaultProps: ExampleButtonHihlightProps = {
  disabled: undefined,
  checked: undefined,
  loading: false,
  active: false,
  state: undefined,
  animatedSparkleCount: 5,
  size: 'm',
};

Demo.defaultProps = defaultProps;

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
