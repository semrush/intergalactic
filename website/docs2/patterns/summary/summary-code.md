---
title: Example
tabs: Summary('summary'), Example('summary-code')
---

## Default summary example

::: sandbox

<script lang="tsx">
import React from 'react';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Tooltip from '@semcore/ui/tooltip';
import styled from 'styled-components';
import '@semcore/ui/utils/style/var.css';
import { AnimatedNumber } from '@semcore/ui/counter/src';

const BoxBlock = styled(Box)`
  overflow: hidden;
  border-left: 1px solid var(--gray-200);
  padding-left: 24px;
  &:first-child {
    border-left: none !important;
    padding-left: 0 !important;
  }
  &:last-child {
    border-right: none !important;
  }
`;
const Title = styled(Text)`
  &:hover {
    cursor: pointer;
  }
`;

const container = document.getElementsByClassName('container');
function detectWrap(node) {
  for (const container of node) {
    for (const child of container.children) {
      if (child.offsetTop > container.offsetTop) {
        child.style.borderLeft = 'none';
        child.style.borderRight = '1px solid var(--gray-200)';
        child.style.marginRight = '24px';
        child.style.paddingLeft = 0;
      } else {
        child.style.borderLeft = '1px solid var(--gray-200)';
        child.style.borderRight = 'none';
        child.style.paddingLeft = '24px';
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', (e) => {
  detectWrap(container);
});

document.addEventListener('resize', (e) => {
  detectWrap(container);
});

const Demo = () => {
  return (
    <Flex flexWrap className='container'>
      <BoxBlock w={160} mb={4}>
        <Tooltip title='Keyword' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Keyword
          </Title>
        </Tooltip>
        <Text size={100} color='gray-500' tag='p'>
          last 30 days
        </Text>
        <Flex alignItems='baseline'>
          <Text
            size={500}
            color='blue-400'
            fontWeight='bold'
            mr={2}
            tag='a'
            href='https://semrush.com'
            target='_blank'
          >
            <AnimatedNumber value={42} formatValue={(x) => Math.round(x).toString()} delay={300} />
          </Text>
          <Text size={100} color='gray-500' tag='p'>
            no change
          </Text>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title='Traffic' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Traffic
          </Title>
        </Tooltip>
        <Text size={100} color='gray-500' tag='p'>
          last 30 days
        </Text>
        <Flex alignItems='baseline'>
          <Text
            size={500}
            color='blue-400'
            fontWeight='bold'
            mr={2}
            tag='a'
            href='https://semrush.com'
            target='_blank'
          >
            <AnimatedNumber
              value={24765}
              formatValue={(x) => Math.round(x).toString()}
              delay={300}
            />
          </Text>
          <Text size={100} color='gray-500' tag='p'>
            no change
          </Text>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title='Traffic cost' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Traffic cost
          </Title>
        </Tooltip>
        <Text size={100} color='gray-500' tag='p'>
          last 30 days
        </Text>
        <Flex alignItems='baseline'>
          <Text
            size={500}
            color='blue-400'
            fontWeight='bold'
            mr={2}
            tag='a'
            href='https://semrush.com'
            target='_blank'
          >
            <AnimatedNumber value={908} formatValue={(x) => Math.round(x).toString()} delay={300} />
          </Text>
          <Text size={100} color='green-500' tag='p'>
            ↑+12
          </Text>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title='Non-branded traffic' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Non-branded traffic
          </Title>
        </Tooltip>
        <Text size={100} color='gray-500' tag='p'>
          all time
        </Text>
        <Flex alignItems='baseline'>
          <Text
            size={500}
            fontWeight='bold'
            mr={2}
            tag='a'
            href='https://semrush.com'
            target='_blank'
          >
            <AnimatedNumber value={145} formatValue={(x) => Math.round(x).toString()} delay={300} />
          </Text>
          <Text size={100} color='green-500' mr={2} tag='p'>
            ↑+13
          </Text>
          <Text size={100} color='red-500' tag='p'>
            ↓-12
          </Text>
        </Flex>
      </BoxBlock>
    </Flex>
  );
};


</script>

:::

## Example of a vertical layout with skeleton

You can place main metrics vertically, if it's required by the report layout. Show [Skeleton](/components/skeleton/) on the first data download.

::: sandbox

<script lang="tsx">
import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Tooltip from '@semcore/ui/tooltip';
import Skeleton from '@semcore/ui/skeleton';
import styled from 'styled-components';
import '@semcore/ui/utils/style/var.css';
import { AnimatedNumber } from '@semcore/ui/counter/src';

const BoxBlock = styled(Box)`
  overflow: hidden;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--gray-200);
  &:last-child {
    border-bottom: none !important;
  }
`;
const FlexBlock = styled(Flex)`
  overflow: hidden;
`;
const Title = styled(Text)`
  &:hover {
    cursor: pointer;
  }
`;

const Demo = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      setLoading(!loading);
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [loading]);

  return (
    <FlexBlock direction='column'>
      <BoxBlock h={92} w={146}>
        <Tooltip title='Keyword' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Keyword
          </Title>
        </Tooltip>
        {!loading && (
          <>
            <Text size={100} color='gray-500' tag='p'>
              last 30 days
            </Text>
            <Flex alignItems='baseline'>
              <Text
                size={500}
                color='blue-400'
                fontWeight='bold'
                mr={2}
                tag='a'
                href='https://semrush.com'
                target='_blank'
              >
                <AnimatedNumber
                  value={42}
                  formatValue={(x) => Math.round(x).toString()}
                  delay={300}
                />
              </Text>
              <Text size={100} color='gray-500' tag='p'>
                no change
              </Text>
            </Flex>
          </>
        )}
        <Skeleton hidden={!loading} mt={2}>
          <Skeleton.Text amount={1} height={30} width={70} />
        </Skeleton>
      </BoxBlock>
      <BoxBlock h={92} w={146}>
        <Tooltip title='Traffic' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Traffic
          </Title>
        </Tooltip>
        {!loading && (
          <>
            <Text size={100} color='gray-500' tag='p'>
              last 30 days
            </Text>
            <Flex alignItems='baseline'>
              <Text
                size={500}
                color='blue-400'
                fontWeight='bold'
                mr={2}
                tag='a'
                href='https://semrush.com'
                target='_blank'
              >
                <AnimatedNumber value={24765} formatValue={(x) => Math.round(x).toString()} />
              </Text>
              <Text size={100} color='gray-500' tag='p'>
                no change
              </Text>
            </Flex>
          </>
        )}
        <Skeleton hidden={!loading} mt={2}>
          <Skeleton.Text amount={1} height={30} width={70} />
        </Skeleton>
      </BoxBlock>
      <BoxBlock h={92} w={146}>
        <Tooltip title='Traffic cost' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Traffic cost
          </Title>
        </Tooltip>
        {!loading && (
          <>
            <Text size={100} color='gray-500' tag='p'>
              last 30 days
            </Text>
            <Flex alignItems='baseline'>
              <Text
                size={500}
                color='blue-400'
                fontWeight='bold'
                mr={2}
                tag='a'
                href='https://semrush.com'
                target='_blank'
              >
                <AnimatedNumber value={908} formatValue={(x) => Math.round(x).toString()} />
              </Text>
              <Text size={100} color='green-500' tag='p'>
                ↑+12
              </Text>
            </Flex>
          </>
        )}
        <Skeleton hidden={!loading} mt={2}>
          <Skeleton.Text amount={1} height={30} width={70} />
        </Skeleton>
      </BoxBlock>
      <BoxBlock h={92} w={146}>
        <Tooltip title='Branded traffic' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Branded traffic
          </Title>
        </Tooltip>
        {!loading && (
          <>
            <Text size={100} color='gray-500' tag='p'>
              all time
            </Text>
            <Flex alignItems='baseline'>
              <Text
                size={500}
                fontWeight='bold'
                mr={2}
                tag='a'
                href='https://semrush.com'
                target='_blank'
              >
                <AnimatedNumber
                  value={145}
                  formatValue={(x) => Math.round(x).toString()}
                  delay={300}
                />
              </Text>
              <Text size={100} color='green-500' tag='p'>
                ↑+13
              </Text>
            </Flex>
          </>
        )}
        <Skeleton hidden={!loading} mt={2}>
          <Skeleton.Text amount={1} height={30} width={70} />
        </Skeleton>
      </BoxBlock>
      <BoxBlock h={92} w={146}>
        <Tooltip title='Non-branded traffic' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Non-branded traffic
          </Title>
        </Tooltip>
        {!loading && (
          <>
            <Text size={100} color='gray-500' tag='p'>
              all time
            </Text>
            <Flex alignItems='baseline'>
              <Text
                size={500}
                fontWeight='bold'
                mr={2}
                tag='a'
                href='https://semrush.com'
                target='_blank'
              >
                145
              </Text>
              <Text size={100} color='green-500' mr={2} tag='p'>
                ↑+13
              </Text>
              <Text size={100} color='red-500' tag='p'>
                ↓-12
              </Text>
            </Flex>
          </>
        )}
        <Skeleton hidden={!loading} mt={2}>
          <Skeleton.Text amount={1} height={30} width={70} />
        </Skeleton>
      </BoxBlock>
    </FlexBlock>
  );
};


</script>

:::

## Summary with a minitrend

If the metrics don't fit into the maximum page width, arrange the data in a column – move the minitrends under the metric.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Tooltip from '@semcore/ui/tooltip';
import styled from 'styled-components';
import chart from './static/chart.svg';
import '@semcore/ui/utils/style/var.css';

const BoxBlock = styled(Box)`
  overflow: hidden;
  border-left: 1px solid var(--gray-200);
  padding-left: 24px;
  &:first-child {
    border-left: none !important;
    padding-left: 0 !important;
  }
  &:last-child {
    border-right: none !important;
  }
`;

const Title = styled(Text)`
  &:hover {
    cursor: pointer;
`;

const container = document.getElementsByClassName('container');
function detectWrap(node) {
  for (const container of node) {
    for (const child of container.children) {
      if (child.offsetTop > container.offsetTop) {
        child.style.borderLeft = 'none';
        child.style.borderRight = '1px solid var(--gray-200)';
        child.style.marginRight = '24px';
        child.style.paddingLeft = 0;
      } else {
        child.style.borderLeft = '1px solid var(--gray-200)';
        child.style.borderRight = 'none';
        child.style.paddingLeft = '24px';
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', (e) => {
  detectWrap(container);
});

window.addEventListener('resize', (e) => {
  detectWrap(container);
});

const Demo = () => {
  return (
    <Flex flexWrap className='container'>
      <BoxBlock w={160} mb={4} mr={4}>
        <Tooltip title='Potential Organic Traffic' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Potential Organic Traffic
          </Title>
        </Tooltip>
        <Text size={100} color='gray-500' tag='p'>
          last 30 days
        </Text>
        <Flex alignItems='baseline'>
          <Text
            size={500}
            color='gray-800'
            fontWeight='bold'
            mr={2}
            tag='a'
            href='https://semrush.com'
            target='_blank'
          >
            42
          </Text>
          <Text size={100} color='green-500' tag='p'>
            ↑+12
          </Text>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title='CPC' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            CPC
          </Title>
        </Tooltip>
        <Text size={100} color='gray-500' tag='p'>
          last 30 days
        </Text>
        <Flex alignItems='baseline'>
          <Text
            size={500}
            color='blue-400'
            fontWeight='bold'
            mr={2}
            tag='a'
            href='https://semrush.com'
            target='_blank'
          >
            27K
          </Text>
          <Text size={100} color='red-500' tag='p'>
            ↓-12
          </Text>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title='Competition' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Competition
          </Title>
        </Tooltip>
        <Text size={100} color='gray-500' tag='p'>
          last 30 days
        </Text>
        <Flex alignItems='baseline'>
          <Text
            size={500}
            color='gray-300'
            fontWeight='bold'
            mr={2}
            tag='a'
            href='https://semrush.com'
            target='_blank'
          >
            n/a
          </Text>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4} flex='1 1 100px'>
        <Tooltip title='Non-branded traffic' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Non-branded traffic
          </Title>
        </Tooltip>
        <Text size={100} color='gray-500' tag='p'>
          all time
        </Text>
        <Flex alignItems='baseline' flexWrap>
          <Text
            size={500}
            color='blue-400'
            fontWeight='bold'
            mr={2}
            tag='a'
            href='https://semrush.com'
            target='_blank'
          >
            15%
          </Text>
          <Text size={100} color='green-500' mr={2} tag='p'>
            ↑+13
          </Text>
          <Tooltip title='Jun 10 14.9%'>
            <Title tabIndex={0}>
              <img src={chart} alt='chart' />
            </Title>
          </Tooltip>
        </Flex>
      </BoxBlock>
    </Flex>
  );
};


</script>

:::

## Summary with an error

::: sandbox

<script lang="tsx">
import React from 'react';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Tooltip from '@semcore/ui/tooltip';
import WarningM from '@semcore/ui/icon/Warning/m';
import styled from 'styled-components';
import { AnimatedNumber } from '@semcore/ui/counter/src';
import '@semcore/ui/utils/style/var.css';

const BoxBlock = styled(Box)`
  overflow: hidden;
  border-left: 1px solid var(--gray-200);
  padding-left: 24px;
  &:first-child {
    border-left: none !important;
    padding-left: 0 !important;
  }
  &:last-child {
    border-right: none !important;
  }
`;

const Title = styled(Text)`
  &:hover {
    cursor: pointer;
  }
`;

const container = document.getElementsByClassName('container');
function detectWrap(node) {
  for (const container of node) {
    for (const child of container.children) {
      if (child.offsetTop > container.offsetTop) {
        child.style.borderLeft = 'none';
        child.style.borderRight = '1px solid var(--gray-200)';
        child.style.marginRight = '24px';
        child.style.paddingLeft = 0;
      } else {
        child.style.borderLeft = '1px solid var(--gray-200)';
        child.style.borderRight = 'none';
        child.style.paddingLeft = '24px';
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', (e) => {
  detectWrap(container);
});

window.addEventListener('resize', (e) => {
  detectWrap(container);
});

const Demo = () => {
  return (
    <Flex flexWrap className='container'>
      <BoxBlock w={160} mb={4}>
        <Tooltip title='Keyword' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Keyword
          </Title>
        </Tooltip>
        <Flex alignItems='baseline'>
          <Text
            size={500}
            color='gray-800'
            fontWeight='bold'
            mr={2}
            tag='a'
            href='https://semrush.com'
            target='_blank'
          >
            <AnimatedNumber value={145} formatValue={(x) => Math.round(x).toString()} delay={300} />
          </Text>
          <Text size={100} color='green-500' tag='p'>
            ↑+12
          </Text>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title='Traffic' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Traffic
          </Title>
        </Tooltip>
        <Flex mt={2} alignItems='center'>
          <WarningM color='gray-300' />
          <Title
            size={100}
            color='blue-500'
            ml={2}
            tag='a'
            href='https://semrush.com'
            target='_blank'
          >
            Reload
          </Title>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title='Traffic cost' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Traffic cost
          </Title>
        </Tooltip>
        <Flex mt={2} alignItems='center'>
          <WarningM color='gray-300' />
          <Title
            size={100}
            color='blue-500'
            ml={2}
            tag='a'
            href='https://semrush.com'
            target='_blank'
          >
            Reload
          </Title>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title='Branded traffic' wMax='100%'>
          <Title size={200} tag='p' noWrap tabIndex={0}>
            Branded traffic
          </Title>
        </Tooltip>
        <Flex mt={2} alignItems='center'>
          <WarningM color='gray-300' />
          <Title
            size={100}
            color='blue-500'
            ml={2}
            tag='a'
            href='https://semrush.com'
            target='_blank'
          >
            Reload
          </Title>
        </Flex>
      </BoxBlock>
    </Flex>
  );
};


</script>

:::
