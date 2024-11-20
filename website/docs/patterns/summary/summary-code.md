---
title: Summary
tabs: Design('summary'), Example('summary-code')
---

## Default summary example

::: sandbox

<script lang="tsx">
  export Demo from './examples/default-summary-example.tsx';
</script>

:::

## Vertical layout with skeleton

In case your report layout demands it, you have the option to vertically arrange the metrics. To enhance user experience during the initial data retrieval, consider displaying [Skeleton](/components/skeleton/skeleton).

::: sandbox

<script lang="tsx">
import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import { Hint } from '@semcore/ui/tooltip';
import Skeleton from '@semcore/ui/skeleton';
import '@semcore/ui/utils/style/var.css';
import { AnimatedNumber } from '@semcore/ui/counter/src';

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
    <Flex direction='column' style={{ overflow: 'hidden' }}>
      <Box h={92} w={146} mb={6} style={{ borderBottom: '1px solid var(--gray-200)' }}>
        <Hint title='Keyword' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Keyword
          </Text>
        </Hint>
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
      </Box>
      <Box h={92} w={146} mb={6} style={{ borderBottom: '1px solid var(--gray-200)' }}>
        <Hint title='Traffic' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Traffic
          </Text>
        </Hint>
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
      </Box>
      <Box h={92} w={146} mb={6} style={{ borderBottom: '1px solid var(--gray-200)' }}>
        <Hint title='Traffic cost' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Traffic cost
          </Text>
        </Hint>
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
                +12
              </Text>
            </Flex>
          </>
        )}
        <Skeleton hidden={!loading} mt={2}>
          <Skeleton.Text amount={1} height={30} width={70} />
        </Skeleton>
      </Box>
      <Box h={92} w={146} mb={6} style={{ borderBottom: '1px solid var(--gray-200)' }}>
        <Hint title='Branded traffic' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Branded traffic
          </Text>
        </Hint>
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
                +13
              </Text>
            </Flex>
          </>
        )}
        <Skeleton hidden={!loading} mt={2}>
          <Skeleton.Text amount={1} height={30} width={70} />
        </Skeleton>
      </Box>
      <Box h={92} w={146}>
        <Hint title='Non-branded traffic' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Non-branded traffic
          </Text>
        </Hint>
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
                +13
              </Text>
              <Text size={100} color='red-500' tag='p'>
                -12
              </Text>
            </Flex>
          </>
        )}
        <Skeleton hidden={!loading} mt={2}>
          <Skeleton.Text amount={1} height={30} width={70} />
        </Skeleton>
      </Box>
    </Flex>
  );
};


</script>

:::

## Summary with minitrend

If the metrics are wider than the page's maximum width, a good approach is to organize them in columns. This means placing the minitrends below their corresponding metrics, ensuring a clear and visually appealing layout.

::: sandbox

<script lang="tsx">
  export Demo from './examples/summary-with-minitrend.tsx';
</script>

:::

## Summary with error

::: sandbox

<script lang="tsx">
  export Demo from './examples/summary-with-error.tsx';
</script>

:::
