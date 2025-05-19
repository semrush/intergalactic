import React from 'react';
import { DataTable } from '@semcore/data-table';
import Tooltip from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import DropdownMenu from '@semcore/dropdown-menu';
import Select from '@semcore/select';
import { LinkTrigger } from '@semcore/base-trigger';

const Demo = () => {
  return (
    <DataTable
      data={data}
      aria-label={'Customizing header'}
      columns={[
        {
          name: 'keyword',
          tag: Tooltip,
          title: "Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.",
          tabIndex: 0,
          children: (
            <Text noWrap>
              Keyword <Text color='text-secondary'>(1 - 100)</Text>
            </Text>
          ),
        },
        {
          name: 'kd',
          children: () => {
            const [isVisible, setIsVisible] = React.useState(false);

            return (
              <Select
                options={selectValues}
                defaultValue={'kd'}
                visible={isVisible}
                onVisibleChange={setIsVisible}
              >
                <Select.Trigger
                  tag={LinkTrigger}
                  color='text-primary'
                  style={{ fontSize: '12px' }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                      return false;
                    }
                    if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && isVisible) {
                      e.stopPropagation();
                    }
                  }}
                />
              </Select>
            );
          },
        },
        {
          name: 'cpc',
          tag: Tooltip,
          title: "Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.",
          tabIndex: 0,
          children: 'CPC',
        },
        {
          name: 'vol',
          tag: Tooltip,
          title: "Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.",
          tabIndex: 0,
          children: 'Vol.',
        },
      ]}
    />
  );
};

const selectValues = [
  { value: 'kd', children: 'KD %', label: 'KD %' },
  { value: '2', children: 'a', label: 'a' },
  { value: '3', children: 'b', label: 'b' },
];

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
