import React from 'react';
import BulkTextarea, { BulkTextareaProps } from '@semcore/bulk-textarea';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const validateRow = (row: string, rows: string[]) => {
  let isValid = true;
  let errorMessage = '';

  if (row.includes(']') || row.includes('[')) {
    isValid = false;
    errorMessage = 'row has invalid charsets';
  }

  return {
    isValid,
    errorMessage,
  };
};

const rowProcessing = (row: string) => {
  return row.replace(/http:\/\//, '');
};

const Demo = () => {
  const [value, setValue] = React.useState('');

  return (
    <Box>
      <BulkTextarea
        w={400}
        value={value}
        onChange={setValue}
        rowValidation={validateRow}
        ofRows={30}
        size={'m'}
        rowsDelimiters={[',']}
        readonly={false}
        disabled={false}
        placeholder={'Placeholder'}
        minRows={2}
        maxRows={10}
        validateOn={['blur']}
        pasteProps={{
          delimiter: '\n',
          skipEmptyRows: true,
          rowProcessing,
        }}
        rowProcessing={rowProcessing}
      >
        <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
          <Text tag={'label'} size={200} id={'keywords-label'}>
            list of keywords
          </Text>
          <BulkTextarea.Counter />
        </Flex>
        <BulkTextarea.InputField
          aria-labelledby={'keywords-label'}
          commonErrorMessage={'some global error'}
        />
        <Flex alignItems='center' justifyContent='space-between' mt={2}>
          <BulkTextarea.ErrorsNavigation />
          <BulkTextarea.ClearAllButton />
        </Flex>
      </BulkTextarea>
    </Box>
  );
};

export default Demo;
