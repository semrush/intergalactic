import React, { useEffect } from 'react';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Tooltip from '@semcore/tooltip';
import styled from 'styled-components';

const BoxBlock = styled(Box)`
  overflow: hidden;
  border-left: 1px solid #ccc;
  padding-left: 16px;
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
        child.style.borderRight = '1px solid #ccc';
        child.style.marginRight = '16px';
        child.style.paddingLeft = 0;
      } else {
        child.style.borderLeft = '1px solid #ccc';
        child.style.borderRight = 'none';
        child.style.paddingLeft = '16px';
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
    <Flex flexWrap className="container">
      <BoxBlock w={160} mb={4}>
        <Tooltip title="Keyword" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Keyword
          </Title>
        </Tooltip>
        <Text size={100} color="#757575" tag="p">
          last 30 days
        </Text>
        <Flex alignItems="baseline">
          <Text size={500} color="#0071BC" fontWeight="bold" mr={2} tag="a">
            42
          </Text>
          <Text size={100} color="#757575" tag="p">
            no change
          </Text>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title="Traffic" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Traffic
          </Title>
        </Tooltip>
        <Text size={100} color="#757575" tag="p">
          last 30 days
        </Text>
        <Flex alignItems="baseline">
          <Text size={500} color="#0071BC" fontWeight="bold" mr={2} tag="a">
            66.6K
          </Text>
          <Text size={100} color="#757575" tag="p">
            no change
          </Text>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title="Traffic cost" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Traffic cost
          </Title>
        </Tooltip>
        <Text size={100} color="#757575" tag="p">
          last 30 days
        </Text>
        <Flex alignItems="baseline">
          <Text size={500} color="#0071BC" fontWeight="bold" mr={2} tag="a">
            27K
          </Text>
          <Text size={100} color="#4FAE33" tag="p">
            +12
          </Text>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title="Branded traffic" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Branded traffic
          </Title>
        </Tooltip>
        <Text size={100} color="#757575" tag="p">
          all time
        </Text>
        <Flex alignItems="baseline">
          <Text size={500} fontWeight="bold" mr={2} tag="a">
            145
          </Text>
          <Text size={100} color="#4FAE33" tag="p">
            +13
          </Text>
        </Flex>
      </BoxBlock>
      <BoxBlock w={160} mb={4}>
        <Tooltip title="Non-branded traffic" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Non-branded traffic
          </Title>
        </Tooltip>
        <Text size={100} color="#757575" tag="p">
          all time
        </Text>
        <Flex alignItems="baseline">
          <Text size={500} fontWeight="bold" mr={2} tag="a">
            145
          </Text>
          <Text size={100} color="#4FAE33" mr={2} tag="p">
            +13
          </Text>
          <Text size={100} color="#ED2D2D" tag="p">
            -12
          </Text>
        </Flex>
      </BoxBlock>
    </Flex>
  );
};

export default Demo;
