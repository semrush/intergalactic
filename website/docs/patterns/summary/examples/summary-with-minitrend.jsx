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
    <Flex flexWrap className="container">
      <BoxBlock w={160} mb={4} mr={4}>
        <Tooltip title="Potential Organic Traffic" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Potential Organic Traffic
          </Title>
        </Tooltip>
        <Text size={100} color="gray-500" tag="p">
          last 30 days
        </Text>
        <Flex alignItems="baseline">
          <Text size={500} color="gray-800" fontWeight="bold" mr={2} tag="a">
            42
          </Text>
          <Text size={100} color="green-500" tag="p">
            ↑+12
          </Text>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title="CPC" wMax="100%">
          <Title size={200} tag="p" noWrap>
            CPC
          </Title>
        </Tooltip>
        <Text size={100} color="gray-500" tag="p">
          last 30 days
        </Text>
        <Flex alignItems="baseline">
          <Text size={500} color="blue-400" fontWeight="bold" mr={2} tag="a">
            27K
          </Text>
          <Text size={100} color="red-500" tag="p">
            ↓-12
          </Text>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title="Competition" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Competition
          </Title>
        </Tooltip>
        <Text size={100} color="gray-500" tag="p">
          last 30 days
        </Text>
        <Flex alignItems="baseline">
          <Text size={500} color="gray-300" fontWeight="bold" mr={2} tag="a">
            n/a
          </Text>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4} flex="1 1 100px">
        <Tooltip title="Non-branded traffic" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Non-branded traffic
          </Title>
        </Tooltip>
        <Text size={100} color="gray-500" tag="p">
          all time
        </Text>
        <Flex alignItems="baseline" flexWrap>
          <Text size={500} color="blue-400" fontWeight="bold" mr={2} tag="a">
            15%
          </Text>
          <Text size={100} color="green-500" mr={2} tag="p">
            ↑+13
          </Text>
          <Tooltip title="Jun 10 14.9%">
            <Title>
              <img src={chart} alt="chart" />
            </Title>
          </Tooltip>
        </Flex>
      </BoxBlock>
    </Flex>
  );
};

export default Demo;
