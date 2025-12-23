import { Box, Flex } from '@semcore/ui/base-components';
import type { BulkTextareaProps, ErrorItem } from '@semcore/ui/bulk-textarea';
import BulkTextarea from '@semcore/ui/bulk-textarea';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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

type ExampleProps = BulkTextareaProps<string>;

export const defaultBulkTextareaProps: ExampleProps = {
  maxLines: 15,
  size: undefined,
  readonly: false,
  disabled: false,
  placeholder: 'Placeholder',
  state: undefined,
  minRows: 5,
  maxRows: 5,
  showErrors: undefined,
  validateOn: ['blurLine'],
};

const Demo = (props: Partial<ExampleProps>) => {
  const mergedProps = { ...defaultBulkTextareaProps, ...props };

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
          lineIndex: index,
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
        value={value}
        {...mergedProps}
        onChange={setValue}
        lineValidation={validateRow}
        linesDelimiters={[',']}
        errors={errors}
        showErrors={showErrors}
        onErrorsChange={setErrors}
        onShowErrorsChange={setShowErrors}
        lineProcessing={(line: string) => {
          return line.replace(/http:\/\//, '');
        }}
        pasteProps={{
          delimiter: /[\n.]/,
          skipEmptyLines: true,
          lineProcessing: (line: string) => line.replace(/http:\/\//, 'PASTE'),
        }}
      >
        <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
          <Text tag='label' size={200} id='keywords-label'>
            list of keywords
          </Text>
          <BulkTextarea.Counter />
        </Flex>
        <BulkTextarea.InputField
          aria-labelledby='keywords-label'
          commonErrorMessage='some global error'
        />
        <Flex alignItems='center' justifyContent='space-between' mt={2}>
          <BulkTextarea.ErrorsNavigation />
          <BulkTextarea.ClearAll />
        </Flex>
      </BulkTextarea>

      <Button onClick={handleSubmit}>submit</Button>
    </Box>
  );
};

export default Demo;
