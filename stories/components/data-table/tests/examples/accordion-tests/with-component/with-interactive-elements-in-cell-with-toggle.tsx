import ButtonLink from '@semcore/ui/button';
import Checkbox from '@semcore/ui/checkbox';
import type { DataTableData } from '@semcore/ui/data-table';
import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import { Flex } from '@semcore/ui/flex-box';
import InfoM from '@semcore/ui/icon/Info/m';
import Link from '@semcore/ui/link';
import Select from '@semcore/ui/select';
import { DescriptionTooltip, Hint } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import { NoData } from '@semcore/ui/widget-empty';
import React from 'react';

const options = [
  { value: 'one', children: 'Option 1' },
  { value: 'two', children: 'Option 2' },
];

const stopPropagation = (e: any) => e.stopPropagation();

const CustomSelect = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <Select
      visible={isVisible}
      onVisibleChange={setIsVisible}
      mt={2}
      mr='auto'
      options={options}
      placeholder='Select option'
      id='basic-select'
      onKeyDown={(e) => {
        if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !isVisible) {
          return false;
        }
        if (e.key.startsWith('Arrow') && isVisible) {
          e.stopPropagation();
        }
      }}
      onClick={stopPropagation}
    />
  );
};

const ChartExample = () => (
  <NoData type='nothing-found' my={7} mx='auto' />
);

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
    vol: '65,457,920',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'example.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'some query',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'sample keyword',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: (<ChartExample />),
  },
];

const Demo = () => {
  return (
    <DataTable
      data={data}
      aria-label='Accordion with mixed keyword cells'
      h='100%'
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: 'minmax(60%, 80%)' },
        {
          name: 'group1',
          children: 'Organic Sessions',
          borders: 'both',
          columns: [
            { name: 'kd', children: 'KD,%' },
            { name: 'cpc', children: 'CPC' },
            { name: 'vol', children: 'Vol.' },
          ],
        },
      ]}
      renderCell={(props) => {
        const { columnName, rowIndex, value } = props;

        if (columnName === 'keyword') {
          if (rowIndex === data.length - 1) {
            return (
              <Flex alignItems='center' gap={2}>
                <Checkbox label='Option 1' onClick={stopPropagation} />
                <Text noWrap>
                  Keyword
                  {' '}
                  <Text color='text-secondary'>(100)</Text>
                </Text>
                <Hint
                  ml={1}
                  tag={InfoM}
                  interactive
                  title='Go to our awesome article'
                  data-test-id='interactive-icon'
                  color='icon-secondary-neutral'
                  onClick={stopPropagation}
                />
                <DescriptionTooltip onClick={stopPropagation}>
                  <DescriptionTooltip.Trigger tag={ButtonLink} use='secondary'>
                    About fastest animals
                  </DescriptionTooltip.Trigger>
                  <DescriptionTooltip.Popper aria-label='About fastest animals'>
                    <Text tag='p' mb={3}>
                      The
                      {' '}
                      <Link href='#'>
                        peregrine falcon
                      </Link>
                      {' '}
                      is the fastest bird, and the fastest member of the animal kingdom, with a diving speed
                      of over 300 km/h (190 mph).
                    </Text>
                  </DescriptionTooltip.Popper>
                </DescriptionTooltip>
              </Flex>
            );
          }

          if (rowIndex % 2 === 0) {
            return (
              <Link
                href='#'
                onClick={() => alert(`Clicked row ${rowIndex}, keyword: ${value}`)}
              >
                {value}
              </Link>
            );
          } else {
            return <CustomSelect />;
          }
        }

        return props.defaultRender();
      }}
    />
  );
};

export default Demo;
