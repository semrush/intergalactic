import React from 'react';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Tooltip from '@semcore/tooltip';
import WarningM from '@semcore/icon/Warning/m';
import styled from 'styled-components';

const BoxBlock = styled(Box)`
  overflow: hidden;
  border-left: 1px solid #c4c7cf;
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
        child.style.borderRight = '1px solid #c4c7cf';
        child.style.marginRight = '24px';
        child.style.paddingLeft = 0;
      } else {
        child.style.borderLeft = '1px solid #c4c7cf';
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
      <BoxBlock w={160} mb={4}>
        <Tooltip title="Keyword" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Keyword
          </Title>
        </Tooltip>
        <Flex alignItems="baseline">
          <Text size={500} color="gray-800" fontWeight="bold" mr={2} tag="a">
            145
          </Text>
          <Text size={100} color="green-500" tag="p">
            ↑+12
          </Text>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title="Traffic" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Traffic
          </Title>
        </Tooltip>
        <Flex mt={2} alignItems="center">
          <WarningM color="gray-300" />
          <Title size={100} color="blue-500" ml={2} tag="a">
            Reload
          </Title>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title="Traffic cost" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Traffic cost
          </Title>
        </Tooltip>
        <Flex mt={2} alignItems="center">
          <WarningM color="gray-300" />
          <Title size={100} color="blue-500" ml={2} tag="a">
            Reload
          </Title>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title="Branded traffic" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Branded traffic
          </Title>
        </Tooltip>
        <Flex mt={2} alignItems="center">
          <WarningM color="gray-300" />
          <Title size={100} color="blue-500" ml={2} tag="a">
            Reload
          </Title>
        </Flex>
      </BoxBlock>
    </Flex>
  );
};

export default Demo;
