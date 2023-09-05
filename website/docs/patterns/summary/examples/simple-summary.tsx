import React from 'react';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Tooltip from '@semcore/ui/tooltip';
import '@semcore/ui/utils/style/var.css';
import { AnimatedNumber } from '@semcore/ui/counter/src';

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
            ↑+12
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
            ↑+13
          </Text>
          <Text size={100} color='red-500' tag='p'>
            ↓-12
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Demo;
