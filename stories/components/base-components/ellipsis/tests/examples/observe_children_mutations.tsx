import { Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [text, setText] = React.useState('Short text');

  const changeText = () => {
    const newText =
      'This is a very long text that was changed directly in DOM and should be automatically truncated with ellipsis. Hover to see full text in hint!';

    if (divRef.current) {
      const textElement = divRef.current.querySelector('[data-ui-name="Text"]');
      if (textElement) {
        const findFirstTextNode = (node: Node): globalThis.Text | null => {
          if (node.nodeType === Node.TEXT_NODE) return node as globalThis.Text;
          for (const child of Array.from(node.childNodes)) {
            const found = findFirstTextNode(child);
            if (found) return found;
          }
          return null;
        };

        const textNode = findFirstTextNode(textElement);
        if (textNode) {
          textNode.textContent = newText;
          setText(newText);
        }
      }
    }
  };

  const resetText = () => {
    const shortText = 'Short text';

    if (divRef.current) {
      const textElement = divRef.current.querySelector('[data-ui-name="Text"]');
      if (textElement) {
        const findFirstTextNode = (node: Node): globalThis.Text | null => {
          if (node.nodeType === Node.TEXT_NODE) return node as globalThis.Text;
          for (const child of Array.from(node.childNodes)) {
            const found = findFirstTextNode(child);
            if (found) return found;
          }
          return null;
        };

        const textNode = findFirstTextNode(textElement);
        if (textNode) {
          textNode.textContent = shortText;
          setText(shortText);
        }
      }
    }
  };

  return (
    <Box ref={divRef}>
      <Text ellipsis={{ cropPosition: 'middle', observeChildrenMutations: true }} w={200} mb={3}>
        {text}
      </Text>

      <Box mb={2}>
        <Button onClick={changeText} mr={2}>
          Change text (via DOM)
        </Button>
        <Button onClick={resetText}>Reset</Button>
      </Box>
    </Box>
  );
};

export default Demo;
