import { Box, Flex } from '@semcore/ui/base-components';
import Link from '@semcore/ui/link';
import Notice from '@semcore/ui/notice';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [copiedText, setCopiedText] = React.useState<string>('');
  const [showNotice, setShowNotice] = React.useState(false);

  const longText =
    'Intergalactic is a constantly developing system of UI components, guidelines and UX patterns for building exceptional web experiences.';

  React.useEffect(() => {
    const handleCopy = async () => {
      try {
        const text = await navigator.clipboard.readText();
        setCopiedText(text);
        setShowNotice(true);
        setTimeout(() => setShowNotice(false), 3000);
      } catch (err) {
        console.log('Clipboard read failed');
      }
    };

    document.addEventListener('copy', handleCopy);
    return () => document.removeEventListener('copy', handleCopy);
  }, []);

  return (
    <Flex direction='column' gap={4}>
      <Flex direction='row' gap={4}>
        <Text size={300} bold mb={2}>
          Copy Full Text Feature
        </Text>
        <Text size={200} color='text-secondary'>
          Try to select and copy the truncated text below. The full text will be copied to your
          clipboard, not the truncated version!
        </Text>
      </Flex>

      {/* Example 1: End crop */}
      <Flex direction='row' gap={4}>
        <Text size={200} mb={1} mr={2} bold>
          Example 1: End crop
        </Text>
        <Text w={300} ellipsis={{ cropPosition: 'end' }}>
          {longText}
        </Text>
        <Text size={100} color='text-secondary' mt={1}>
          Select the text above and press Ctrl+C (or Cmd+C)
        </Text>
      </Flex>

      {/* Example 2: Middle crop */}
      <Flex direction='row' gap={4}>
        <Text size={200} mb={1} mr={2} bold>
          Example 2: Middle crop
        </Text>
        <Text w={300} ellipsis={{ cropPosition: 'middle' }}>
          {longText}
        </Text>
        <Text size={100} color='text-secondary' mt={1}>
          With middle crop, full text is also available via aria-label
        </Text>
      </Flex>

      {/* Example 3: Very long text link trim=middle */}
      <Flex direction='row' gap={4} alignItems='center'>
        <Text size={200} mb={1} mr={2} bold>
          Example 3: Very long URL
        </Text>
        <Link>
          <Link.Text w={250} ellipsis={{ cropPosition: 'middle' }}>https://example.com/very/long/path/to/resource/with/many/segments/file.pdf</Link.Text>

        </Link>
        <Text size={100} color='text-secondary' mt={1}>
          Perfect for copying long URLs or file paths
        </Text>
      </Flex>

      {/* Example 4: Very long text link trim=end */}
      <Flex direction='row' gap={4} alignItems='center'>
        <Text size={200} mb={1} mr={2} bold>
          Example 3: Very long URL
        </Text>
        <Link>
          <Link.Text w={250} ellipsis={{ cropPosition: 'end' }}>https://example.com/very/long/path/to/resource/with/many/segments/file.pdf</Link.Text>

        </Link>
        <Text size={100} color='text-secondary' mt={1}>
          Perfect for copying long URLs or file paths
        </Text>
      </Flex>

      {/* Copied text display */}
      {showNotice && copiedText && (
        <Notice theme='success'>
          <Notice.Label>Copied to clipboard!</Notice.Label>
          <Notice.Content>
            <Box
              p={2}
              mt={2}
              style={{
                background: 'var(--intergalactic-bg-primary-neutral)',
                borderRadius: '4px',
                wordBreak: 'break-word',
              }}
            >
              <Text size={100} tag='code' style={{ fontFamily: 'monospace' }}>
                {copiedText}
              </Text>
            </Box>
          </Notice.Content>
        </Notice>
      )}
    </Flex>
  );
};

export default Demo;
