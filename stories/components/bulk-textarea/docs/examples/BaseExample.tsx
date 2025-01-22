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
    }, 0);
  }, []);

  return (
    <Box>
      <BulkTextarea
        w={400}
        ofRows={30}
        value={value}
        onChange={setValue}
        rowValidation={validateRow}
        rowsDelimiters={[',']}
        placeholder={'Placeholder'}
        {...props}
        errors={errors}
        showErrors={showErrors}
        onErrorsChange={setErrors}
        onShowErrorsChange={setShowErrors}
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
