import React from 'react';
import BulkTextarea from '@semcore/bulk-textarea';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

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

const lineProcessing = (line: any, index: any, totalLines: any) => {
    return `#${index + 1}/${totalLines}: ${line}`;
  };

const Demo = () => {
  const [value, setValue] = React.useState('');

  return (
    <Box>
      <BulkTextarea
        w={400}
        value={value}
        onChange={setValue}
        lineValidation={validateRow}
        maxLines={10}
        size={'l'}
        linesDelimiters={[',']}
        readonly={false}
        disabled={false}
        placeholder={'Enter or paste a list using comma or Enter'}
        minRows={2}
        maxRows={10}
        validateOn={['blur']}
        pasteProps={{
          delimiter: '\n',
          skipEmptyLines: true,
          lineProcessing
        }}
      >
        <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
          <Text tag={'label'} size={300} id={'keywords-label'}>
            Favourite movies
          </Text>
          <BulkTextarea.Counter />
        </Flex>
        <BulkTextarea.InputField
          aria-labelledby={'keywords-label'}
          commonErrorMessage={'Please enter correct movie names.'}
        />
        <Flex alignItems='center' justifyContent='space-between' mt={2}>
          <BulkTextarea.ErrorsNavigation />
          <BulkTextarea.ClearAll />
        </Flex>
      </BulkTextarea>

      <BulkTextarea
        w={400}
        value={value}
        onChange={setValue}
        lineValidation={validateRow}
        maxLines={10}
        size={'l'}
        linesDelimiters={[',']}
        readonly={false}
        disabled={false}
        placeholder={'Enter or paste a list using comma or Enter'}
        minRows={2}
        maxRows={10}
        validateOn={['blur']}
        pasteProps={{
          delimiter: '\n',
          skipEmptyLines: true,
          lineProcessing
        }}
      >
        <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
          <Text tag={'label'} size={300} id={'keywords-label'}>
            Favourite movies
          </Text>
          <BulkTextarea.Counter />
        </Flex>
        <BulkTextarea.InputField
          aria-labelledby={'keywords-label'}
          commonErrorMessage={'Please enter correct movie names.'}
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
