import React from 'react';
import BulkTextarea from '@semcore/bulk-textarea';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const validateRow = (row: string, index: number, rows: string[]) => {
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

const Demo = () => {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => {
      setValue(`const Demo = () => {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
      setTimeout(() => {
          setValue()
      }, 1000);
  }, []);
  
  return (
    <Box>
      <Text tag={'label'}>list of keywords</Text>
      <BulkTextarea w={400} value={value} onChange={() => null} />
    </Box>
  );
};`);
    }, 1000);
  }, []);

  return (
    <Box>
      <BulkTextarea
        w={400}
        value={value}
        onBlur={setValue}
        rowValidation={validateRow}
        rowsDelimiters={[',']}
        ofRows={10}
      >
        <Flex alignItems='center' justifyContent='space-between' mb={2}>
          <Text tag={'label'} size={200}>
            list of keywords
          </Text>
          <BulkTextarea.Counter />
        </Flex>
        <BulkTextarea.InputField />
        <Flex alignItems='center' justifyContent='space-between' mt={2}>
          <BulkTextarea.ErrorsNavigation />
          <BulkTextarea.ClearAllButton />
        </Flex>
      </BulkTextarea>
    </Box>
  );
};

export default Demo;
