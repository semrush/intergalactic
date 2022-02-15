import React from 'react';
import { css, styled } from '@semcore/core';
import { Box, Flex } from '@semcore/flex-box';
import Carousel from '@semcore/carousel';

const Indicator = (props) =>
  styled(css`
    Box {
      border-radius: 6px;
      opacity: 0.5;
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }
    }
    Box[active] {
      opacity: 1;
    }
  `)(<Box active={props.active} {...props} />);

const Demo = () => (
  <Flex justifyContent="center">
    <Box position="relative">
      <Carousel>
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
        <Carousel.Indicators>
          {({ items }) => (
            <Flex justifyContent="center" mt={6}>
              {items.map((item, ind) => (
                <Indicator
                  tag="img"
                  src={`https://picsum.photos/id/${1023 + ind}/100/100`}
                  {...item}
                  wMax="100%"
                  w={100}
                  h={100}
                  mx={3}
                />
              ))}
            </Flex>
          )}
        </Carousel.Indicators>
        <Carousel.Prev position="absolute" h={400} w={48} left="-48px" />
        <Carousel.Next position="absolute" h={400} w={48} right="-48px" />
      </Carousel>
    </Box>
  </Flex>
);

export default Demo;
