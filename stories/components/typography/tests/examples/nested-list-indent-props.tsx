import { Box, Flex } from '@semcore/ui/base-components';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type SizeOption = 'none' | '100' | '200' | '300' | '350';

type ExampleProps = {
  size: SizeOption;
  formatTags: boolean;
};

const nestedList = (
  <ol>
    <li data-level='1'>
      Level 1 item
      <ol>
        <li data-level='2'>
          Level 2 item
          <ol>
            <li data-level='3'>Level 3 item</li>
            <li data-level='3'>Level 3 item</li>
          </ol>
        </li>
      </ol>
    </li>
  </ol>
);

const Demo = (props: ExampleProps) => {
  const { size, formatTags } = props;
  const sizeProp = size === 'none' ? undefined : (Number(size) as 100 | 200 | 300 | 350);

  const baselineRef = React.useRef<HTMLDivElement>(null);
  const controlledRef = React.useRef<HTMLDivElement>(null);
  const [measured, setMeasured] = React.useState({ baseline: '—', controlled: '—' });

  React.useEffect(() => {
    const readIndent = (root: HTMLDivElement | null) => {
      const item = root?.querySelector('li[data-level="3"]');

      return item ? window.getComputedStyle(item).paddingLeft : '—';
    };

    setMeasured({
      baseline: readIndent(baselineRef.current),
      controlled: readIndent(controlledRef.current),
    });
  }, [size, formatTags]);

  const matches = measured.baseline === measured.controlled;

  return (
    <Flex direction='column' gap={6}>
      <Flex gap={8} flexWrap>
        <Flex direction='column' gap={2}>
          <Text size={100} bold>
            {'<Text formatTags> — no size prop'}
          </Text>
          <Box ref={baselineRef} data-testid='baseline-no-size'>
            <Text formatTags={formatTags}>{nestedList}</Text>
          </Box>
        </Flex>

        <Flex direction='column' gap={2}>
          <Text size={100} bold>
            {`<Text formatTags size={${size === 'none' ? 'undefined' : sizeProp}}>`}
          </Text>
          <Box ref={controlledRef} data-testid='controlled-with-size'>
            <Text formatTags={formatTags} size={sizeProp}>
              {nestedList}
            </Text>
          </Box>
        </Flex>
      </Flex>

      <Flex direction='column' gap={1}>
        <Text size={200}>
          {`padding-left of the level 3 li — without size: ${measured.baseline}, with size: ${measured.controlled}`}
        </Text>
        <Text size={200} bold color={matches ? 'text-success' : 'text-critical'}>
          {matches ? 'Match' : 'Mismatch — indentation depends on the size prop'}
        </Text>
      </Flex>
    </Flex>
  );
};

export const defaultProps: ExampleProps = {
  size: '200',
  formatTags: true,
};

Demo.defaultProps = defaultProps;

export default Demo;
