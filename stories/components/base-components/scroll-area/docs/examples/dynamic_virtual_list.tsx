import { Box, Flex, ScrollArea } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import React from 'react';
import { List } from 'react-virtualized';

const list = [...new Array(6)];

const renderRow = ({
  key,
  index,
  style,
}: { key: string; index: number; style: React.CSSProperties }) => {
  return (
    <Box
      key={key}
      p={4}
      mb={2}
      w={120}
      h={112}
      boxSizing='border-box'
      style={{
        backgroundColor: 'var(--intergalactic-bg-primary-advertising)',
        borderRadius: 'var(--intergalactic-surface-rounded)',
        ...style,
      }}
      role='row'
    >
      <Text bold size={200} m='auto' role='gridcell'>
        {index + 1}
      </Text>
    </Box>
  );
};

const Demo = () => {
  const [data, setData] = React.useState(list);
  const containerRef = React.useRef<HTMLElement | null>(null);

  const ref = (node: HTMLDivElement | null) => {
    if (node) {
      containerRef.current = node.parentElement?.querySelector('.ReactVirtualized__Grid') ?? null;
    }

    return node;
  };

  return (
    <Flex direction='column' inline>
      <Flex alignItems='center' mb={2} gap={2}>
        <Button
          onClick={() => {
            setData(data.concat(undefined));
          }}
        >
          Add item
        </Button>
        <Button onClick={() => setData(data.slice(0, -1))}>Remove item</Button>
        <Text role='status' aria-live='polite'>
          Count:
          {' '}
          {data.length}
        </Text>
      </Flex>
      <Box h={500}>
        {data.length
        // eslint-disable-next-line @stylistic/multiline-ternary
          ? (
              <ScrollArea container={containerRef}>
                {/* Need this element to get ref to virtual list */}
                <div ref={ref} style={{ display: 'contents' }} />
                <ScrollArea.Container
                  use:ref={undefined} // This is necessary to prevent the List component from being set as a reference to the container.
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
