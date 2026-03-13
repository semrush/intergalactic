import { Text } from '@semcore/typography';
import { Box, Flex } from '@semcore/ui/base-components';
import React from 'react';

const CHART_PALETTE_BASIC_PACK = [
  '--intergalactic-chart-palette-order-1',
  '--intergalactic-chart-palette-order-2',
  '--intergalactic-chart-palette-order-3',
  '--intergalactic-chart-palette-order-4',
  '--intergalactic-chart-palette-order-5',
  '--intergalactic-chart-palette-order-6',
  '--intergalactic-chart-palette-order-7',
  '--intergalactic-chart-palette-order-8',
];

const CHART_PALETTE_SECOND_PACK = [
  '--intergalactic-chart-palette-order-9',
  '--intergalactic-chart-palette-order-10',
  '--intergalactic-chart-palette-order-11',
  '--intergalactic-chart-palette-order-12',
  '--intergalactic-chart-palette-order-13',
  '--intergalactic-chart-palette-order-14',
  '--intergalactic-chart-palette-order-15',
  '--intergalactic-chart-palette-order-16',
];

const CHART_PALETTE_THIRD_PACK = [
  '--intergalactic-chart-palette-order-17',
  '--intergalactic-chart-palette-order-18',
  '--intergalactic-chart-palette-order-19',
  '--intergalactic-chart-palette-order-20',
  '--intergalactic-chart-palette-order-21',
  '--intergalactic-chart-palette-order-22',
  '--intergalactic-chart-palette-order-23',
  '--intergalactic-chart-palette-order-24',
];

const CHART_PALETTE_SPECIAL = [
  { token: '--intergalactic-chart-palette-order-total-amount', label: 'Total amount' },
  { token: '--intergalactic-chart-palette-order-other-data', label: 'Other data' },
  { token: '--intergalactic-chart-palette-order-null', label: 'Null / n/a' },
];

function ChartPaletteSwatch({ token }) {
  return (
    <Box
      style={{
        width: 48,
        height: 48,
        borderRadius: 6,
        background: `var(${token})`,
        margin: 4,
        flexShrink: 0,
      }}
      title={token}
    />
  );
}

export default function ChartCategoricalOrderPalette() {
  return (
    <Box mb={8}>
      <Flex direction='column' gap={4}>
        <Box>
          <Text tag='h4' size={200} semibold mb={4} color='text-secondary'>
            Basic pack
          </Text>
          <Flex flexWrap gap={1}>
            {CHART_PALETTE_BASIC_PACK.map((token) => (
              <ChartPaletteSwatch key={token} token={token} />
            ))}
          </Flex>
        </Box>
        <Box>
          <Text tag='h4' size={200} semibold mb={2} color='text-secondary'>
            Second pack
          </Text>
          <Flex flexWrap gap={1}>
            {CHART_PALETTE_SECOND_PACK.map((token) => (
              <ChartPaletteSwatch key={token} token={token} />
            ))}
          </Flex>
        </Box>
        <Box>
          <Text tag='h4' size={200} semibold mb={2} color='text-secondary'>
            Third pack
          </Text>
          <Flex flexWrap gap={1}>
            {CHART_PALETTE_THIRD_PACK.map((token) => (
              <ChartPaletteSwatch key={token} token={token} />
            ))}
          </Flex>
        </Box>
        <Box>
          <Text tag='h4' size={200} semibold mb={2} color='text-secondary'>
            Special
          </Text>
          <Flex flexWrap alignItems='center' gap={2}>
            {CHART_PALETTE_SPECIAL.map(({ token, label }) => (
              <Flex key={token} alignItems='center' gap={1}>
                <ChartPaletteSwatch token={token} />
                <Text size={100} color='text-secondary'>
                  {label}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
