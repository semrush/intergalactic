import React from 'react';
import BulkTextarea, { BulkTextareaProps, ErrorItem } from '@semcore/bulk-textarea';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import Button from '@semcore/button';

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

const Demo = (props: BulkTextareaProps) => {
  const [value, setValue] = React.useState('');
  const [errors, setErrors] = React.useState<ErrorItem[]>([]);
  const [showErrors, setShowErrors] = React.useState(false);

  const handleSubmit = React.useCallback(() => {
    const errors: ErrorItem[] = [];
    const rows = value.split('\n');
    rows.forEach((line, index) => {
      const { isValid, errorMessage } = validateRow(line, rows);

      if (!isValid) {
        errors.push({
          rowIndex: index,
          errorMessage: errorMessage,
        });
      }
    });

    setErrors(errors);
    setShowErrors(true);
  }, [value]);

  return (
    <Box>
      <BulkTextarea
        w={400}
        ofRows={15}
        value={value}
        minRows={5}
        maxRows={5}
        onChange={setValue}
        rowValidation={validateRow}
        rowsDelimiters={[',']}
        placeholder={'Placeholder'}
        validateOn ='blurRow'
        {...props}
        errors={errors}
        showErrors={showErrors}
        onErrorsChange={setErrors}
        onShowErrorsChange={setShowErrors}
        rowProcessing = {(row) => {
          return row.replace(/http:\/\//, '')}}
          pasteProps={{
            delimiter: '\n',
            skipEmptyRows: false,
            rowProcessing: (row) => row.replace(/http:\/\//, 'PASTE'),
          }}
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

      <Button onClick={handleSubmit}>submit</Button>
    </Box>
  );
};

export default Demo;
