import React from 'react';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Tooltip from '@semcore/tooltip';
import Divider from '@semcore/divider';
import styled from 'styled-components';
import warning from './static/warning.svg';

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
        <Flex alignItems="baseline">
          <Text size={500} color="#333333" fontWeight="bold" mr={2} tag="a">
            145
          </Text>
          <Text size={100} color="#4FAE33" tag="p">
            +12
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
        <Box mt={2}>
          <img src={warning} alt="warning" />
          <Title size={100} color="#0071BC" ml={2} tag="a">
            Reload
          </Title>
        </Box>
      </BoxBlock>
      <Divider mr={6} orientation="vertical" />
      <BoxBlock w={160} mb={4}>
        <Tooltip title="Traffic cost" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Traffic cost
          </Title>
        </Tooltip>
        <Box mt={2}>
          <img src={warning} alt="warning" />
          <Title size={100} color="#0071BC" ml={2} tag="a">
            Reload
          </Title>
        </Box>
      </BoxBlock>
      <Divider mr={6} orientation="vertical" />
      <BoxBlock w={160} mb={4}>
        <Tooltip title="Branded traffic" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Branded traffic
          </Title>
        </Tooltip>
        <Box mt={2}>
          <img src={warning} alt="warning" />
          <Title size={100} color="#0071BC" ml={2} tag="a">
            Reload
          </Title>
        </Box>
      </BoxBlock>
    </Flex>
  );
};

export default Demo;
