import { Hint, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import FileExportM from '@semcore/ui/icon/FileExport/m';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [visible, setVisible] = React.useState(false);
  const controlledRef = React.useRef<HTMLButtonElement>(null);
  const uncontrolledRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Flex direction='column' gap={5}>
      {/* Controlled example */}
      <Flex direction='column' gap={2}>
        <Text size={300} tag='h3'>
          Controlled mode
        </Text>
        <Flex gap={2} alignItems='center'>
          <Button onClick={() => setVisible(!visible)}>
            {visible ? 'Hide' : 'Show'} hint
          </Button>
          <Button ref={controlledRef}>
            <Button.Addon tag={FileExportM} />
          </Button>
          <Text size={200}>Hint is {visible ? 'visible' : 'hidden'}</Text>
        </Flex>
        <Hint triggerRef={controlledRef} visible={visible} onVisibleChange={setVisible}>
          Export to PDF
        </Hint>
      </Flex>

      {/* Uncontrolled example */}
      <Flex direction='column' gap={2}>
        <Text size={300} tag='h3'>
          Uncontrolled mode
        </Text>
        <Flex gap={2} alignItems='center'>
          <Button ref={uncontrolledRef}>
            <Button.Addon tag={FileExportM} />
          </Button>
          <Text size={200}>Hover over the button to see hint</Text>
        </Flex>
        <Hint triggerRef={uncontrolledRef}>Export to PDF</Hint>
      </Flex>
    </Flex>
  );
};

export default Demo;
