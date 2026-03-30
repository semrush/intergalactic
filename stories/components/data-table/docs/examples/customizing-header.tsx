import { LinkTrigger } from '@semcore/ui/base-trigger';
import { DataTable } from '@semcore/ui/data-table';
import Select from '@semcore/ui/select';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [selectedColumn, setSelectedColumn] = React.useState('kd');
  return (
    <DataTable
      data={data}
      aria-label='Customizing header'
      columns={[
        {
          name: 'keyword',
          tag: Tooltip,
          title: 'Jesus Christ, Joe, fucking forget about it. I\'m Mr. Pink. Let\'s move on.',
          tabIndex: 0,
          children: (
            <Text noWrap>
              Keyword
              {' '}
              <Text color='text-secondary'>(1 - 100)</Text>
            </Text>
          ),
        },
        {
          name: selectedColumn,
          children: () => {
            const [isVisible, setIsVisible] = React.useState(false);
            const selectOptions = [
              { value: 'kd', label: 'KD %' },
              { value: 'traffic', label: 'Traffic' },
            ];

            return (
              <Select
                visible={isVisible}
                onVisibleChange={setIsVisible}
                value={selectedColumn}
                onChange={setSelectedColumn}
              >
                <Select.Trigger
                  tag={LinkTrigger}
                  aria-label='Column'
                  color='text-primary'
                  size={100}
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
                >
                  {selectOptions.filter((option) => option.value === selectedColumn)[0].label}
                </Select.Trigger>
                <Select.Menu>
                  {selectOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select.Menu>
              </Select>
            );
          },
        },
        {
          name: 'cpc',
          tag: Tooltip,
          title: 'Jesus Christ, Joe, fucking forget about it. I\'m Mr. Pink. Let\'s move on.',
          tabIndex: 0,
          children: 'CPC',
        },
        {
          name: 'vol',
          tag: Tooltip,
          title: 'Jesus Christ, Joe, fucking forget about it. I\'m Mr. Pink. Let\'s move on.',
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
    traffic: '10.5',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    traffic: '32.1',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    traffic: '51',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    traffic: '4.3',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    traffic: '9.7',
    cpc: '$0',
    vol: '21,644,290',
  },
];

export default Demo;
