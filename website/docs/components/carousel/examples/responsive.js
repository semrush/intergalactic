import React from 'react';
import { Box, Flex } from '@semcore/flex-box';
import Carousel from '@semcore/carousel';
import { css } from '@semcore/core';

const stylesControl = css`
  SNext,
  SPrev {
    position: absolute;
    height: 100%;
    width: 80px;

    @media (max-width: 374px) {
      position: static;
      width: 44px;
      height: 22px;
      transform: scale(0.5);
    }
  }
`;

const Demo = () => (
  <Box position="relative">
    <Carousel styles={stylesControl}>
      <Carousel.Container>
        {[...new Array(3)].map((_, ind) => (
          <Carousel.Item key={ind}>
            <Box
              tag="img"
              w="100%"
              src={`https://picsum.photos/id/${1023 + ind}/600/400`}
              style={{ borderRadius: '6px' }}
            />
          </Carousel.Item>
        ))}
      </Carousel.Container>
      <Flex justifyContent="center" mt={3}>
        <Carousel.Prev left="-80px" />
        <Carousel.Next right="-80px" />
      </Flex>
    </Carousel>
  </Box>
);
export default Demo;
