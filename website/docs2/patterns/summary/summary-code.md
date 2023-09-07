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
import '@semcore/ui/utils/style/var.css';
import { AnimatedNumber } from '@semcore/ui/counter/src';

const Demo = () => {
  React.useEffect(() => {
    const container = document.getElementsByClassName('container');
    if (!container) return;
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
    
    return () => {
      window.removeEventListener('DOMContentLoaded', (e) => {
        detectWrap(container);
      });
      window.removeEventListener('resize', (e) => {
        detectWrap(container);
      });
    };
  }, []);

  return (
    <Flex flexWrap className='container'>
      <Box w={160} mb={4} style={{ borderRight: '1px solid #c4c7cf' }} mr={5}>
        <Tooltip title='Keyword' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Keyword
          </Text>
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
      </Box>
      <Box w={160} mb={4} style={{ borderRight: '1px solid #c4c7cf' }} mr={5}>
        <Tooltip title='Traffic' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Traffic
          </Text>
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
      </Box>
      <Box w={160} mb={4} style={{ borderRight: '1px solid #c4c7cf' }} mr={5}>
        <Tooltip title='Traffic cost' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Traffic cost
          </Text>
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
            +12
          </Text>
        </Flex>
      </Box>
      <Box w={160} mb={4}>
        <Tooltip title='Non-branded traffic' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Non-branded traffic
          </Text>
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
            +13
          </Text>
          <Text size={100} color='red-500' tag='p'>
            -12
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};


</script>

:::

## Vertical layout with skeleton

In case your report layout demands it, you have the option to vertically arrange the metrics. To enhance user experience during the initial data retrieval, consider displaying [Skeleton](/components/skeleton/).

::: sandbox

<script lang="tsx">
import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Tooltip from '@semcore/ui/tooltip';
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
        <Tooltip title='Keyword' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Keyword
          </Text>
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
      </Box>
      <Box h={92} w={146} mb={6} style={{ borderBottom: '1px solid var(--gray-200)' }}>
        <Tooltip title='Traffic' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Traffic
          </Text>
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
      </Box>
      <Box h={92} w={146} mb={6} style={{ borderBottom: '1px solid var(--gray-200)' }}>
        <Tooltip title='Traffic cost' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Traffic cost
          </Text>
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
        <Tooltip title='Branded traffic' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Branded traffic
          </Text>
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
        <Tooltip title='Non-branded traffic' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Non-branded traffic
          </Text>
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
import React from 'react';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Tooltip from '@semcore/ui/tooltip';
import chart from './static/chart.svg';
import '@semcore/ui/utils/style/var.css';

const Demo = () => {
  React.useEffect(() => {
    const container = document.getElementsByClassName('container');
    if (!container) return;
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
    
    return () => {
      window.removeEventListener('DOMContentLoaded', (e) => {
        detectWrap(container);
      });
      window.removeEventListener('resize', (e) => {
        detectWrap(container);
      });
    };
  }, []);

  return (
    <Flex flexWrap className='container'>
      <Box w={160} mb={4} style={{ borderRight: '1px solid #c4c7cf' }} mr={5}>
        <Tooltip title='Potential Organic Traffic' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Potential Organic Traffic
          </Text>
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
            +12
          </Text>
        </Flex>
      </Box>
      <Box w={160} mb={4} style={{ borderRight: '1px solid #c4c7cf' }} mr={5}>
        <Tooltip title='CPC' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            CPC
          </Text>
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
            -12
          </Text>
        </Flex>
      </Box>
      <Box w={160} mb={4} style={{ borderRight: '1px solid #c4c7cf' }} mr={5}>
        <Tooltip title='Competition' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Competition
          </Text>
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
      </Box>
      <Box w={160} mb={4}>
        <Tooltip title='Non-branded traffic' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Non-branded traffic
          </Text>
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
            +13
          </Text>
          <Tooltip title='Jun 10 14.9%'>
            <Text tabIndex={0}>
              <img src={chart} alt='chart' />
            </Text>
          </Tooltip>
        </Flex>
      </Box>
    </Flex>
  );
};


</script>

:::

## Summary with error

::: sandbox

<script lang="tsx">
import React from 'react';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Tooltip from '@semcore/ui/tooltip';
import WarningM from '@semcore/ui/icon/Warning/m';
import { AnimatedNumber } from '@semcore/ui/counter/src';
import '@semcore/ui/utils/style/var.css';

const Demo = () => {
  React.useEffect(() => {
    const container = document.getElementsByClassName('container');
    if (!container) return;
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
    
    return () => {
      window.removeEventListener('DOMContentLoaded', (e) => {
        detectWrap(container);
      });
      window.removeEventListener('resize', (e) => {
        detectWrap(container);
      });
    };
  }, []);

  return (
    <Flex flexWrap className='container'>
      <Box w={160} mb={4} style={{ borderRight: '1px solid #c4c7cf' }} mr={5}>
        <Tooltip title='Keyword' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Keyword
          </Text>
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
            +12
          </Text>
        </Flex>
      </Box>
      <Box w={160} mb={4} style={{ borderRight: '1px solid #c4c7cf' }} mr={5}>
        <Tooltip title='Traffic' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Traffic
          </Text>
        </Tooltip>
        <Flex mt={2} alignItems='center'>
          <WarningM color='gray-300' />
          <Text
            size={100}
            color='blue-500'
            ml={2}
            tag='a'
            href='https://semrush.com'
            target='_blank'
          >
            Reload
          </Text>
        </Flex>
      </Box>
      <Box w={160} mb={4} style={{ borderRight: '1px solid #c4c7cf' }} mr={5}>
        <Tooltip title='Traffic cost' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Traffic cost
          </Text>
        </Tooltip>
        <Flex mt={2} alignItems='center'>
          <WarningM color='gray-300' />
          <Text
            size={100}
            color='blue-500'
            ml={2}
            tag='a'
            href='https://semrush.com'
            target='_blank'
          >
            Reload
          </Text>
        </Flex>
      </Box>
      <Box w={160} mb={4}>
        <Tooltip title='Branded traffic' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Branded traffic
          </Text>
        </Tooltip>
        <Flex mt={2} alignItems='center'>
          <WarningM color='gray-300' />
          <Text
            size={100}
            color='blue-500'
            ml={2}
            tag='a'
            href='https://semrush.com'
            target='_blank'
          >
            Reload
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};


</script>

:::
