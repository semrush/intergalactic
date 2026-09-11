import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Pills from '@semcore/ui/pills';
import type { NSPills } from '@semcore/ui/pills';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type PillExampleProps = Pick<NSPills.Props, 'size' | 'behavior'> & {
  label: string;
  domLabel: string;
};

const Demo = (props: PillExampleProps) => {
  const [count, setCount] = React.useState(2);
  const [choice, setChoice] = React.useState<number>(1);

  const textRefs = React.useRef<Record<number, HTMLElement | null>>({});

  const applyDomLabel = () => {
    const node = textRefs.current[choice];

    if (node) {
      node.textContent = props.domLabel;
    }
  };

  const resetDomLabels = () => {
    for (const [value, node] of Object.entries(textRefs.current)) {
      if (node) {
        node.textContent = `${props.label} ${value}`;
      }
    }
  };

  return (
    <Flex direction='column' alignItems='flex-start' gap={4}>
      <Flex gap={2} flexWrap>
        <Button onClick={() => setCount(count + 1)}>Add pill</Button>
        <Button onClick={() => setCount(Math.max(1, count - 1))}>Remove pill</Button>
        <Button use='primary' onClick={applyDomLabel}>
          Widen selected pill (DOM only)
        </Button>
        <Button onClick={resetDomLabels}>Restore labels (DOM only)</Button>
      </Flex>

      <Pills value={choice} onChange={setChoice} size={props.size} behavior={props.behavior}>
        {Array.from({ length: count }, (_, index) => (
          <Pills.Item key={index} value={index + 1}>
            <Pills.Item.Text
              ref={(node: HTMLElement | null) => {
                textRefs.current[index + 1] = node;
              }}
            >
              {props.label} {index + 1}
            </Pills.Item.Text>
          </Pills.Item>
        ))}
      </Pills>

      <Text size={200}>
        Pills: {count}, selected: {choice}
      </Text>
    </Flex>
  );
};

export const defaultProps: PillExampleProps = {
  size: 'm',
  behavior: 'auto',
  label: 'Pill',
  domLabel: 'Pill with a much longer label',
};

Demo.defaultProps = defaultProps;

export default Demo;
