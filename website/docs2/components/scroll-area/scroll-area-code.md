---
title: Example
fileSource: scroll-area
tabs: ScrollArea('index'), A11y('scroll-area-a11y'), API('scroll-area-api'), Example('scroll-area-code'), Changelog('scroll-area-changelog')
---

## Basic usage

To use the ScrollArea component, wrap your content with `ScrollArea`. It will create a couple of `div` wraps and handle the necessary calculations. You can set the `height` or `width` directly on the `ScrollArea` or somewhere higher in the hierarchy. `max-height` and `max-width` are also supported.

::: sandbox

<script lang="tsx">
import React from 'react';
import styled from 'styled-components';
import Scroll from '@semcore/ui/scroll-area';

const Block = styled.div`
  display: inline-block;
  margin: 10px;
  width: 120px;
  height: 120px;
  background-color: ${() => getRandomColor()};
`;

let randomIndex = 1;
const stableRandom = () =>
  Math.abs(Math.sin(Math.exp(Math.PI * randomIndex * Math.cos(100 - randomIndex++))));
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(stableRandom() * 16)];
  }
  return color;
}

class Demo extends React.PureComponent {
  render() {
    return (
      <Scroll h={300}>
        {[...new Array(100)].map((_, index) => (
          <Block ind={index} key={index} />
        ))}
      </Scroll>
    );
  }
}
</script>

:::

## Synchronized scroll on two different screens

::: sandbox

<script lang="tsx">
import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@semcore/ui/flex-box';
import ScrollArea from '@semcore/ui/scroll-area';

let randomIndex = 1;
const stableRandom = () =>
  Math.abs(Math.sin(Math.exp(Math.PI * randomIndex * Math.cos(100 - randomIndex++))));
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(stableRandom() * 16)];
  }
  return color;
}

const Block = styled.div`
  display: inline-block;
  margin: 10px;
  width: 120px;
  height: 120px;
  background-color: ${() => getRandomColor()};
`;

class Demo extends React.PureComponent {
  controlled: any;
  handleMainScroll = (e) => {
    this.controlled.scrollTop = e.currentTarget.scrollTop;
  };

  componentDidMount() {
    this.controlled.scrollTop = 0;
  }

  render() {
    return (
      <Flex>
        <Box style={{ position: 'relative' }}>
          <h2>Main</h2>
          <ScrollArea w={300} h={300}>
            <ScrollArea.Container onScroll={this.handleMainScroll}>
              {[...new Array(100)].map((_, index) => (
                <Block ind={index} key={index} />
              ))}
            </ScrollArea.Container>
            <ScrollArea.Bar />
          </ScrollArea>
        </Box>

        <Box>
          <h2>Controlled</h2>
          <ScrollArea w={300} h={300}>
            <ScrollArea.Container
              ref={(node) => {
                this.controlled = node;
              }}
            >
              {[...new Array(100)].map((_, index) => (
                <Block ind={index} key={index} />
              ))}
            </ScrollArea.Container>
            <ScrollArea.Bar />
          </ScrollArea>
        </Box>
      </Flex>
    );
  }
}
</script>

:::

## Synchronized reverse scroll on two different screens

::: sandbox

<script lang="tsx">
import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@semcore/ui/flex-box';
import ScrollArea from '@semcore/ui/scroll-area';

let randomIndex = 1;
const stableRandom = () =>
  Math.abs(Math.sin(Math.exp(Math.PI * randomIndex * Math.cos(100 - randomIndex++))));
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(stableRandom() * 16)];
  }
  return color;
}

const Block = styled.div`
  display: inline-block;
  margin: 10px;
  width: 120px;
  height: 120px;
  background-color: ${() => getRandomColor()};
`;

class Demo extends React.PureComponent {
  mirror: any;
  handleScrollMain = (e) => {
    this.mirror.scrollTop =
      this.mirror.scrollHeight - this.mirror.clientHeight - e.currentTarget.scrollTop;
  };

  componentDidMount() {
    this.mirror.scrollTop = this.mirror.scrollHeight - this.mirror.clientHeight;
  }

  render() {
    return (
      <Flex>
        <Box style={{ position: 'relative' }}>
          <h2>Main</h2>
          <ScrollArea w={300} h={300}>
            <ScrollArea.Container onScroll={this.handleScrollMain}>
              {[...new Array(100)].map((_, index) => (
                <Block ind={index} key={index} />
              ))}
            </ScrollArea.Container>
            <ScrollArea.Bar />
          </ScrollArea>
        </Box>

        <Box>
          <h2>Reversed mirror</h2>
          <ScrollArea w={300} h={300}>
            <ScrollArea.Container
              ref={(node) => {
                this.mirror = node;
              }}
            >
              <Flex flexWrap reverse>
                {[...new Array(100)].map((_, index) => (
                  <Block ind={index} key={index} />
                ))}
              </Flex>
            </ScrollArea.Container>
            <ScrollArea.Bar />
          </ScrollArea>
        </Box>
      </Flex>
    );
  }
}
</script>

:::

## Scrollbar out of container

::: sandbox

<script lang="tsx">
import React, { useRef } from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@semcore/ui/flex-box';
import ScrollArea from '@semcore/ui/scroll-area';

let randomIndex = 1;
const stableRandom = () =>
  Math.abs(Math.sin(Math.exp(Math.PI * randomIndex * Math.cos(100 - randomIndex++))));
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(stableRandom() * 16)];
  }
  return color;
}

const Block = styled.div`
  display: inline-block;
  margin: 10px;
  width: 120px;
  height: 120px;
  background-color: ${() => getRandomColor()};
`;

const Demo = () => {
  const containerRef = useRef();
  return (
    <Flex>
      <Box style={{ position: 'relative' }}>
        <ScrollArea w={600} hMax={400} shadow>
          <ScrollArea.Container ref={containerRef}>
            <Box w={1200}>
              {[...new Array(100)].map((_, index) => (
                <Block ind={index} key={index} />
              ))}
            </Box>
          </ScrollArea.Container>
          <ScrollArea.Bar orientation='vertical' />
        </ScrollArea>
        <br />
        <br />
        <br />
        <br />
        <br />
        <ScrollArea.Bar
          container={containerRef}
          orientation='horizontal'
          w={200}
          h={40}
          style={{ background: 'rgba(0,0,0,0.1)' }}
        >
          <ScrollArea.Bar.Slider h={30} />
        </ScrollArea.Bar>
      </Box>
    </Flex>
  );
};
</script>

:::

## Dynamic virtual list

The dynamic virtual list is powered by [React-virtualized](https://github.com/bvaughn/react-virtualized).

::: sandbox

<script lang="tsx">
import React, { useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import styled from 'styled-components';
import ScrollArea from '@semcore/ui/scroll-area';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import Button from '@semcore/ui/button';
import { List } from 'react-virtualized';

const Block = styled.div`
  display: inline-flex;
  width: 120px;
  height: 120px;
  border: 1px solid black;
`;

const list = [...new Array(6)];
const renderRow = ({ key, index, style }) => {
  return (
    <Block key={key} style={style}>
      <Text bold size={200} m='auto'>
        {index + 1}
      </Text>
    </Block>
  );
};

const Demo = () => {
  const [data, setData] = useState(list);
  const innerRef = useRef();
  const ref = (node) => {
    node = findDOMNode(node);
    if (node) {
      innerRef.current = node.querySelector('.ReactVirtualized__Grid__innerScrollContainer');
    }
  };

  return (
    <Flex direction='column' inline>
      <Flex alignItems='center' mb={2}>
        <Button
          onClick={() => {
            setData(data.concat(undefined));
          }}
        >
          ADD
        </Button>
        <Button ml='10px' onClick={() => setData(data.slice(0, -1))}>
          REMOVE
        </Button>
        <Text bold ml='10px'>
          Count: {data.length}
        </Text>
      </Flex>
      <Box h={500}>
        {data.length ? (
          <ScrollArea inner={innerRef}>
            <ScrollArea.Container
              ref={ref}
              tag={List}
              height={500}
              rowCount={data.length}
              width={500}
              rowHeight={120}
              rowRenderer={renderRow}
            />
            <ScrollArea.Bar orientation='vertical' />
          </ScrollArea>
        ) : null}
      </Box>
    </Flex>
  );
};
</script>

:::
