import React from 'react';
import { DataTable } from '@semcore/data-table';
import Tooltip from '@semcore/tooltip';
import { Text } from '@semcore/typography';
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
            const selectOptions = [
              { value: 'kd', children: 'KD %', label: 'KD %' },
              { value: 'Traffic', children: 'Traffic', label: 'Traffic' },
            ];

            return (
              <Select
                tag={LinkTrigger}
                aria-label='Column'
                color='text-primary'
                style={{ fontSize: '12px' }}
                visible={isVisible}
                onVisibleChange={setIsVisible}
                options={selectOptions}
                defaultValue={'kd'}
                onKeyDown={(e) => {
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
