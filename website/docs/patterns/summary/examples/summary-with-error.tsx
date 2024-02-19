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

export default Demo;
