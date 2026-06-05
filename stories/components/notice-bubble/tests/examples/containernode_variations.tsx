import { Flex, Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { NoticeBubbleContainer, NoticeBubbleManager } from '@semcore/ui/notice-bubble';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ContainerNodeDemoProps = {
  containerMode: 'default' | 'custom-element' | 'custom-ref';
  initialAnimation: boolean;
  duration: number;
  type: 'info' | 'warning';
  focusLock: boolean;
};

const Demo = (props: ContainerNodeDemoProps) => {
  const [customElementContainer, setCustomElementContainer] = React.useState<HTMLDivElement | null>(null);
  const [manager] = React.useState(() => new NoticeBubbleManager());

  React.useEffect(() => {
    if (props.containerMode === 'custom-element') {
      const element = document.createElement('div');
      element.id = 'custom-notice-container';
      element.style.position = 'fixed';
      element.style.bottom = '20px';
      element.style.left = '20px';
      element.style.border = '2px dashed var(--intergalactic-border-info)';
      element.style.padding = 'var(--intergalactic-spacing-3x)';
      element.style.minWidth = '400px';
      element.style.backgroundColor = 'var(--intergalactic-bg-primary-neutral)';
      element.style.borderRadius = 'var(--intergalactic-popper-rounded)';
      document.body.appendChild(element);
      setCustomElementContainer(element);

      return () => {
        document.body.removeChild(element);
        setCustomElementContainer(null);
      };
    } else {
      setCustomElementContainer(null);
    }
  }, [props.containerMode]);

  const getContainerNode = () => {
    if (props.containerMode === 'custom-element') {
      return customElementContainer;
    }
    return null;
  };

  const handleClick = () => {
    manager.add({
      children: `Notice rendered with containerNode mode: "${props.containerMode}"`,
      initialAnimation: props.initialAnimation,
      duration: props.duration,
      type: props.type,
      focusLock: props.focusLock,
    });
  };

  const containerNodeValue = getContainerNode();

  return (
    <Flex direction='column' gap={4}>
      <Box>
        <Text size={300} tag='p' mb={2}>
          <strong>Current mode:</strong> {props.containerMode}
        </Text>
        <Text size={200} tag='p' color='text-secondary'>
          {props.containerMode === 'default' &&
            'Notices render in default portal (top-right corner of the page)'}
          {props.containerMode === 'custom-element' &&
            'Notices render in a custom DOM element (bottom-left corner, blue dashed border)'}
        </Text>
      </Box>

      <Button onClick={handleClick}>Show notice</Button>

      <NoticeBubbleContainer containerNode={containerNodeValue} manager={manager} />
    </Flex>
  );
};

export const defaultProps: ContainerNodeDemoProps = {
  containerMode: 'default',
  initialAnimation: true,
  duration: 5000,
  type: 'info',
  focusLock: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
