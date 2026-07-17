import { Box, Flex } from '@semcore/ui/base-components';
import type { NSBulktextarea } from '@semcore/ui/bulk-textarea';
import BulkTextarea from '@semcore/ui/bulk-textarea';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const MAX_LINES = 4;
const validateRow = (line: string, lines: string[]) => {
  let isValid = true;
  let errorMessage = '';

  if (line.includes(']')) {
    isValid = false;
    errorMessage = 'Please remove one error value';
  } else if (line.includes('[')) {
    isValid = false;
    errorMessage = 'Please fix this value = another error';
  }

  return {
    isValid,
    errorMessage,
  };
};

const lineProcessing = (line: string) => {
  return line.replace(/http:\/\//, '');
};

async function setFocus(inputFieldInstance: NSBulktextarea.InputField.Instance) {
  const newLine = await inputFieldInstance.addLine('');
  inputFieldInstance.focus(newLine, 0);
}

const Demo = () => {
  const inputFieldRef = React.useRef<NSBulktextarea.InputField.Instance | null>(null);
  const [values, setValues] = React.useState(['first value']);
  const [isLimitExceeded, setIsLimitExceeded] = React.useState(false);

  React.useEffect(() => {
    if (inputFieldRef.current) {
      setFocus(inputFieldRef.current);
    }
  }, []);

  return (
    <Box>
      <BulkTextarea
        w={400}
        value={values}
        onChange={setValues}
        lineValidation={validateRow}
        maxLines={MAX_LINES}
        size='l'
        linesDelimiters={[',']}
        readonly={false}
        disabled={false}
        placeholder={['Keyword - broad match', '[Keyword] - exact match']}
        minRows={4}
        maxRows={4}
        validateOn={['blurLine']}
        pasteProps={{
          delimiter: '\n',
          skipEmptyLines: false,
          lineProcessing,
        }}
        lineProcessing={lineProcessing}
        onImmediatelyChange={(lines) => {
          setIsLimitExceeded(lines.length > MAX_LINES);
        }}
      >
        <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
          <Text tag='label' size={300} id='keywords-label'>
            Favourite movies
          </Text>
          <BulkTextarea.Counter />
        </Flex>
        <BulkTextarea.InputField
          instanceRef={inputFieldRef}
          state={isLimitExceeded ? 'invalid' : 'normal'}
          commonErrorMessage={isLimitExceeded ? 'Error' : ''}
          aria-labelledby='keywords-label'
        />
        <Flex alignItems='center' justifyContent='space-between' mt={2}>
          <BulkTextarea.ErrorsNavigation />
          <BulkTextarea.ClearAll />
        </Flex>
      </BulkTextarea>
    </Box>
  );
};

export default Demo;
