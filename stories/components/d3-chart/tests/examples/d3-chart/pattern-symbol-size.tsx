import { Box, Flex } from '@semcore/ui/base-components';
import { PatternSymbol } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type PatternSymbolSizeStoryProps = {
  patterns?: string;
  width?: number;
  height?: number;
};

const CANVAS_SIZE = 60;

type SymbolPreviewProps = {
  caption: string;
  patterns: string;
  size?: { width: number; height: number };
};

const SymbolPreview = ({ caption, patterns, size }: SymbolPreviewProps) => {
  const ref = React.useRef<SVGSVGElement>(null);
  const [rendered, setRendered] = React.useState('');

  React.useEffect(() => {
    const symbol = ref.current?.querySelector('svg');
    setRendered(`${symbol?.getAttribute('width')} × ${symbol?.getAttribute('height')}`);
  });

  return (
    <Flex direction='column' gap={2}>
      <Text size={200}>{caption}</Text>
      <svg ref={ref} width={CANVAS_SIZE} height={CANVAS_SIZE} aria-label={caption} role='img'>
        <rect width={CANVAS_SIZE} height={CANVAS_SIZE} fill='none' stroke='gray' strokeDasharray='2 2' />
        <PatternSymbol color='red' patternKey='pattern-symbol-size' patterns={patterns as 'zigzag'} {...size} />
      </svg>
      <Text size={200}>Rendered: {rendered}</Text>
    </Flex>
  );
};

const Demo = (props: PatternSymbolSizeStoryProps) => {
  const { patterns = 'zigzag', width = 40, height = 40 } = props;

  return (
    <Flex gap={8}>
      <SymbolPreview caption='Default size' patterns={patterns} />
      <SymbolPreview caption={`width=${width} height=${height}`} patterns={patterns} size={{ width, height }} />
    </Flex>
  );
};

export const defaultProps: PatternSymbolSizeStoryProps = {
  patterns: 'zigzag',
  width: 40,
  height: 40,
};

export default Demo;
