import FavoriteFilledM from '@semcore/icon/FavoriteFilled/m';
import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import Ellipsis from '@semcore/ui/ellipsis';
import { Text } from '@semcore/ui/typography';
import type { FC } from 'react';
import React from 'react';

const MockDiffComponent: FC<{ diff?: number; inverse?: boolean }> = ({
  diff,
  inverse = false,
}) => {
  if (diff === undefined) return <Text>-</Text>;
  const isPositive = inverse ? diff < 0 : diff > 0;
  const color = isPositive ? 'green-500' : 'red-500';
  const sign = isPositive ? '+' : '';
  return (
    <Text color={color}>
      {sign}
      {diff.toFixed(1)}
    </Text>
  );
};
const formatNumber = (num: number, decimals = 0): string => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const Demo = () => {
  return (
    <DataTable
      aria-label='Competitors table'
      data={data}
      headerProps={{ sticky: true, top: 0, withScrollBar: true }}
      columns={[
        {
          name: 'index',
          children: '',
          justifyContent: 'flex-end',
          gtcWidth: 'minmax(0, 72px)',
        },
        {
          name: 'name',
          children: 'Name',
        },
        {
          name: 'rating',
          children: 'Rating',
          justifyContent: 'flex-end',
          sortable: 'desc',
          gtcWidth: 'minmax(0, 92px)',
        },
        {
          name: 'reviewNumber',
          children: 'Review number',
          justifyContent: 'flex-end',
          sortable: 'desc',
          gtcWidth: 'minmax(0, 136px)',
        },
        {
          name: 'averagePosition',
          children: 'Avg. Rank',
          justifyContent: 'flex-end',
          sortable: 'asc',
          gtcWidth: 'minmax(0, 108px)',
        },
        {
          name: 'averagePositionDiff',
          children: 'Diff',
          justifyContent: 'flex-end',
          sortable: 'desc',
          gtcWidth: 'minmax(0, 82px)',
        },
        {
          name: 'shareOfVoice',
          children: 'Share of Voice',
          justifyContent: 'flex-end',
          sortable: 'desc',
          gtcWidth: 'minmax(0, 128px)',
        },
        {
          name: 'shareOfVoiceDiff',
          children: 'Diff',
          justifyContent: 'flex-end',
          sortable: 'desc',
          gtcWidth: 'minmax(0, 82px)',
        },
      ]}
      rowProps={(_, index) => {
        if (index === 0) {
          return { theme: 'muted' };
        }
        return undefined;
      }}
      renderCell={({ dataKey, rowIndex, defaultRender }) => {
        switch (dataKey) {
          case 'index':
            return <Text>{data[rowIndex]?.index}.</Text>;
          case 'name':
            return (
              <Flex
                w='100%'
                alignItems='center'
                justifyContent='space-between'
                columnGap={3}
              >
                <Box flex='0 1 auto' wMin={0}>
                  <Flex w='100%' columnGap={1}>
                    <Ellipsis>
                      <Text>{data[rowIndex]?.name}</Text>
                    </Ellipsis>
                  </Flex>
                </Box>
                <Button
                  use='primary'
                  theme='info'
                  className='hidden-until-hover'
                  flex='0 0 auto'
                >
                  I am a button
                </Button>
              </Flex>
            );
          case 'rating':
            return (
              <Box>
                <Flex alignItems='center' columnGap={1}>
                  {formatNumber(data[rowIndex]?.rating ?? 0, 1)}
                  <FavoriteFilledM color='icon-secondary-neutral' />
                </Flex>
              </Box>
            );
          case 'reviewNumber':
            return formatNumber(data[rowIndex]?.reviewsNumber ?? 0, 0);
          case 'averagePosition':
            return formatNumber(data[rowIndex]?.averagePosition ?? 0, 1);
          case 'averagePositionDiff':
            return (
              <MockDiffComponent
                diff={data[rowIndex]?.averagePositionDiff}
                inverse={true}
              />
            );
          case 'shareOfVoice':
            return `${formatNumber(
              data[rowIndex]?.shareOfVoice ?? 0,
              2,
            )}%`;
          case 'shareOfVoiceDiff':
            return (
              <MockDiffComponent
                diff={data[rowIndex]?.shareOfVoiceDiff}
              />
            );
        }
        return defaultRender();
      }}
    />
  );
};

const data = [
  {
    index: 1,
    name: 'Business A',
    rating: 4.5,
    reviewsNumber: 123,
    averagePosition: 2.1,
    averagePositionDiff: -0.5,
    shareOfVoice: 25.8,
    shareOfVoiceDiff: 2.3,
  },
  {
    index: 2,
    name: 'Business B',
    rating: 4.2,
    reviewsNumber: 89,
    averagePosition: 3.7,
    averagePositionDiff: 1.2,
    shareOfVoice: 18.4,
    shareOfVoiceDiff: -1.1,
  },
];

export default Demo;
