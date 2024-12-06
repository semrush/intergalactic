import React from 'react';
import { findDOMNode } from 'react-dom';
import ScrollArea from 'intergalactic/scroll-area';
import { Box, Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';
import Button from 'intergalactic/button';
import { List } from 'react-virtualized';

const list = [...new Array(6)];
const renderRow = ({
  key,
  index,
  style,
}: { key: string; index: number; style: React.CSSProperties }) => {
  return (
    <Box key={key} inline m={2} w={120} h={120} style={{ border: '1px solid black', ...style }}>
      <Text bold size={200} m='auto'>
        {index + 1}
      </Text>
    </Box>
  );
};

const Demo = () => {
  const [data, setData] = React.useState(list);
  const innerRef: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null);
  const ref = (node: HTMLDivElement | null) => {
    node = findDOMNode(node);
    if (node && innerRef.current) {
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
              // @ts-ignore
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

export default Demo;
