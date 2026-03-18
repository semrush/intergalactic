import { Box, Flex } from '@semcore/ui/base-components';
import type { BoxProps } from '@semcore/ui/base-components';
import BulkTextarea from '@semcore/ui/bulk-textarea';
import type { BulkTextareaProps, ErrorItem } from '@semcore/ui/bulk-textarea';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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

type ExampleProps = BulkTextareaProps<string> & BoxProps & { autoFocus?: boolean };

export const defaultBulkTextareaProps: ExampleProps = {
  w: 400,
  maxLines: 10,
  size: 'l',
  readonly: false,
  disabled: false,
  placeholder: 'Enter or paste a list using comma or Enter',
  state: undefined,
  minRows: 2,
  maxRows: 10,
  showErrors: undefined,
  validateOn: ['blur'],
  autoFocus: false,
};

const Demo = (props: Partial<ExampleProps>) => {
  const { autoFocus, ...mergedProps } = { ...defaultBulkTextareaProps, ...props };

  const [value, setValue] = React.useState('');
  const [errors, setErrors] = React.useState<ErrorItem[]>([]);
  const [showErrors, setShowErrors] = React.useState(false);

  const handleSubmit = React.useCallback(() => {
    const newErrors: ErrorItem[] = [];
    const rows = value.split('\n');
    rows.forEach((line, index) => {
      const { isValid, errorMessage } = validateRow(line, rows);
      if (!isValid) {
        newErrors.push({ lineIndex: index, errorMessage });
      }
    });

    setErrors(newErrors);
    setShowErrors(true);
  }, [value]);

  return (
    <Box>
      <Button onClick={handleSubmit}>Validate</Button>

      <BulkTextarea
        {...mergedProps}
        value={value}
        onChange={setValue}
        lineValidation={validateRow}
        onErrorsChange={setErrors}
        onShowErrorsChange={setShowErrors}
        errors={errors}
        linesDelimiters={[',']}
        showErrors={showErrors}
        pasteProps={{
          delimiter: '\n',
          skipEmptyLines: true,
          lineProcessing,
        }}
        lineProcessing={lineProcessing}
      >
        <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
          <Text tag='label' size={300} id='keywords-label'>
            Favourite movies
          </Text>
          <BulkTextarea.Counter />
        </Flex>

        <BulkTextarea.InputField
          aria-labelledby='keywords-label'
          commonErrorMessage='Please enter correct movie names.'
          autoFocus={autoFocus}
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
