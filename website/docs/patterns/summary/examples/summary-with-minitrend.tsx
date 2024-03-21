import React from 'react';
import { Box, Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';
import { Hint } from 'intergalactic/tooltip';
import chart from '../static/chart.svg';
import 'intergalactic/utils/style/var.css';

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
        <Hint title='Potential Organic Traffic' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Potential Organic Traffic
          </Text>
        </Hint>
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
        <Hint title='CPC' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            CPC
          </Text>
        </Hint>
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
        <Hint title='Competition' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Competition
          </Text>
        </Hint>
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
        <Hint title='Non-branded traffic' wMax='100%'>
          <Text size={200} tag='p' noWrap tabIndex={0}>
            Non-branded traffic
          </Text>
        </Hint>
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
          <Hint title='Jun 10 14.9%'>
            <Text tabIndex={0}>
              <img src={chart} alt='chart' />
            </Text>
          </Hint>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Demo;
