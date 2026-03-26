import InfoM from '@semcore/icon/Info/m';
import { Flex } from '@semcore/ui/base-components';
import type { BoxProps } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import { ButtonLink } from '@semcore/ui/button';
import Checkbox from '@semcore/ui/checkbox';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableProps } from '@semcore/ui/data-table';
import Link from '@semcore/ui/link';
import Select from '@semcore/ui/select';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import React from 'react';

export type MultiLevelInteractiveProps = {
  compact?: DataTableProps<typeof data, any, any>['compact'];
  use?: DataTableProps<typeof data, any, any>['use'];

  loading?: DataTableProps<typeof data, any, any>['loading'];
  defaultGridTemplateColumnWidth?: DataTableProps<typeof data, any, any>['defaultGridTemplateColumnWidth'];
  sticky: boolean;
  withScrollBar?: boolean;
  sideIndents?: DataTableProps<typeof data, any, any>['sideIndents'];
  top?: number;

} & BoxProps;

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Option ${index}`,
    children: `Option ${index}`,
  }));

const CustomSelect = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <Select
      visible={isVisible}
      onVisibleChange={setIsVisible}
      data-test-id='select-header'
      id='basic-select'
    >
      <Select.Trigger
        tag={LinkTrigger}
        aria-label='Select option'
        color='text-primary'
        size={100}
        placeholder='Select option'
        onKeyDown={(e: any) => {
          if (!isVisible && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            return false;
          }
          if (
            (e.key === 'ArrowLeft' ||
              e.key === 'ArrowRight' ||
              e.key === 'ArrowDown' ||
              e.key === 'ArrowUp') &&
              isVisible
          ) {
            e.stopPropagation();
          }
        }}
      />
      <Select.Menu>
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.children}
          </Select.Option>
        ))}
      </Select.Menu>
    </Select>
  );
};

const columns = [
  {
    children: 'Keyword',
    name: 'keyword',
    gtcWidth: '300px',
  },
  {
    name: 'group1',
    children: 'Group',
    columns: [
      {
        name: 'kd',
        gtcWidth: 'minmax(100px, max-content)',
        children: (
          <Flex alignItems='center'>
            Cpc 1
            <DescriptionTooltip placement='right'>
              <DescriptionTooltip.Trigger
                ml={1}
                tag={ButtonLink}
                addonLeft={InfoM}
                size={100}
                color='icon-secondary-neutral'
                aria-label='Additional info 1'
                data-test-id='tooltip-with-interactive-el'
              />
              <DescriptionTooltip.Popper aria-label='Additional info about item 1'>
                Jesus Christ, Joe,
                {' '}
                <Link>fucking forget</Link>
                {' '}
                about it. I'm Mr.
                Pink. Let's move on.
              </DescriptionTooltip.Popper>
            </DescriptionTooltip>
          </Flex>
        ),
      },
      {
        name: 'cpc',
        gtcWidth: 'minmax(300px, max-content)',
        children: (
          <Flex alignItems='center'>
            <Checkbox data-test-id='header-checkbox' />
            Hello
            <DescriptionTooltip placement='right'>
              <DescriptionTooltip.Trigger
                ml={1}
                tag={ButtonLink}
                addonLeft={InfoM}
                size={100}
                color='icon-secondary-neutral'
                aria-label='Additional info'
                data-test-id='tooltip-without-interactive-el'
              />
              <DescriptionTooltip.Popper aria-label='Additional info about checkbox item'>
                Jesus Christ, Joe,
                Pink. Let's move on.
              </DescriptionTooltip.Popper>
            </DescriptionTooltip>
          </Flex>
        ),
      },
      {
        name: 'vol',
        gtcWidth: '300px',
        children: (<CustomSelect />),
      },

    ],
  },
];

const Demo = (props: MultiLevelInteractiveProps) => {
  return (

    <DataTable
      data={data}
      aria-label='Multi level interactive'
      defaultGridTemplateColumnWidth={props.defaultGridTemplateColumnWidth}
      compact={props.compact}
      sideIndents={props.sideIndents}
      loading={props.loading}
      w={props.w}
      h={props.h}
      use={props.use}
      headerProps={{
        sticky: props.sticky,
        withScrollBar: props.withScrollBar,
      }}
      columns={columns}
    />
  );
};

export const multiLevelInteractiveProps: MultiLevelInteractiveProps = {
  sideIndents: undefined,
  compact: undefined,
  h: '100%',
  w: '100%',
  defaultGridTemplateColumnWidth: '1fr',
  loading: undefined,
  sticky: true,
  withScrollBar: undefined,
  use: 'primary',
};
Demo.defaultProps = multiLevelInteractiveProps;

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com',
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
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com',
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
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
];

export default Demo;
