import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Tooltip from '@semcore/ui/tooltip';
import Skeleton from '@semcore/ui/skeleton';
import styled from 'styled-components';
import '@semcore/ui/utils/style/var.css';

const BoxBlock = styled(Box)`
  overflow: hidden;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--gray-200);
  &:last-child {
    border-bottom: none !important;
  }
`;
const FlexBlock = styled(Flex)`
  overflow: hidden;
`;
const Title = styled(Text)`
  &:hover {
    cursor: pointer;
  }
`;

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
    <FlexBlock direction="column">
      <BoxBlock h={92} w={146}>
        <Tooltip title="Keyword" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Keyword
          </Title>
        </Tooltip>
        {!loading && (
          <>
            <Text size={100} color="gray-500" tag="p">
              last 30 days
            </Text>
            <Flex alignItems="baseline">
              <Text size={500} color="blue-400" fontWeight="bold" mr={2} tag="a">
                42
              </Text>
              <Text size={100} color="gray-500" tag="p">
                no change
              </Text>
            </Flex>
          </>
        )}
        <Skeleton hidden={!loading} mt={2}>
          <Skeleton.Text amount={1} height={30} width={70} />
        </Skeleton>
      </BoxBlock>
      <BoxBlock h={92} w={146}>
        <Tooltip title="Traffic" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Traffic
          </Title>
        </Tooltip>
        {!loading && (
          <>
            <Text size={100} color="gray-500" tag="p">
              last 30 days
            </Text>
            <Flex alignItems="baseline">
              <Text size={500} color="blue-400" fontWeight="bold" mr={2} tag="a">
                66.6K
              </Text>
              <Text size={100} color="gray-500" tag="p">
                no change
              </Text>
            </Flex>
          </>
        )}
        <Skeleton hidden={!loading} mt={2}>
          <Skeleton.Text amount={1} height={30} width={70} />
        </Skeleton>
      </BoxBlock>
      <BoxBlock h={92} w={146}>
        <Tooltip title="Traffic cost" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Traffic cost
          </Title>
        </Tooltip>
        {!loading && (
          <>
            <Text size={100} color="gray-500" tag="p">
              last 30 days
            </Text>
            <Flex alignItems="baseline">
              <Text size={500} color="blue-400" fontWeight="bold" mr={2} tag="a">
                27K
              </Text>
              <Text size={100} color="green-500" tag="p">
                ↑+12
              </Text>
            </Flex>
          </>
        )}
        <Skeleton hidden={!loading} mt={2}>
          <Skeleton.Text amount={1} height={30} width={70} />
        </Skeleton>
      </BoxBlock>
      <BoxBlock h={92} w={146}>
        <Tooltip title="Branded traffic" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Branded traffic
          </Title>
        </Tooltip>
        {!loading && (
          <>
            <Text size={100} color="gray-500" tag="p">
              all time
            </Text>
            <Flex alignItems="baseline">
              <Text size={500} fontWeight="bold" mr={2} tag="a">
                145
              </Text>
              <Text size={100} color="green-500" tag="p">
                ↑+13
              </Text>
            </Flex>
          </>
        )}
        <Skeleton hidden={!loading} mt={2}>
          <Skeleton.Text amount={1} height={30} width={70} />
        </Skeleton>
      </BoxBlock>
      <BoxBlock h={92} w={146}>
        <Tooltip title="Non-branded traffic" wMax="100%">
          <Title size={200} tag="p" noWrap>
            Non-branded traffic
          </Title>
        </Tooltip>
        {!loading && (
          <>
            <Text size={100} color="gray-500" tag="p">
              all time
            </Text>
            <Flex alignItems="baseline">
              <Text size={500} fontWeight="bold" mr={2} tag="a">
                145
              </Text>
              <Text size={100} color="green-500" mr={2} tag="p">
                ↑+13
              </Text>
              <Text size={100} color="red-500" tag="p">
                ↓-12
              </Text>
            </Flex>
          </>
        )}
        <Skeleton hidden={!loading} mt={2}>
          <Skeleton.Text amount={1} height={30} width={70} />
        </Skeleton>
      </BoxBlock>
    </FlexBlock>
  );
};

export default Demo;
