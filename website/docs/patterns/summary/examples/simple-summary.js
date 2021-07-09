import React from 'react';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Tooltip from '@semcore/tooltip';
import Divider from '@semcore/divider';
import styled from 'styled-components';

const BoxBlock = styled(Box)`
  overflow: hidden;
`;
const Title = styled(Text)`
  &:hover {
    cursor: pointer;
  }
`;

const Demo = () => {
  return (
    <Flex flexWrap>
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
      <Divider mr={6} orientation="vertical" />
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
      <Divider mr={6} orientation="vertical" />
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
      <Divider mr={6} orientation="vertical" />
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
      <Divider mr={6} orientation="vertical" />
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
