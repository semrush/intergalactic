import { Flex } from '@semcore/ui/base-components';
import Checkbox from '@semcore/ui/checkbox';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableSort } from '@semcore/ui/data-table';
import { ButtonFH, PillsFH, SelectFH, InputFH, SwitchFH, TabLineFH, NoticeFH, BadgeFH, RadioFH, CheckboxFH } from '@semcore/ui/feature-highlight';
import SummaryAI from '@semcore/ui/icon/SummaryAI/m';
import MailSent from '@semcore/ui/illustration/MailSent';
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

      <NoticeFH
        closable
        aria-label='Highlighted notice'
        label={<MailSent />}
        title={<Text>Optimize your domain for AI search</Text>}

      >
        <NoticeFH.Label></NoticeFH.Label>
        Audit your domain and fix issues to get more traffic from AI search engines like ChatGPT.
      </NoticeFH>
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
