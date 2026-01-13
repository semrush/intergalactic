import { Box, Flex } from '@semcore/ui/base-components';
import BulkTextarea from '@semcore/ui/bulk-textarea';
import type { BulkTextareaProps } from '@semcore/ui/bulk-textarea';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const validateRow = (line: string, lines: string[]) => {
  let isValid = true;
  let errorMessage = '';

  if (line.includes(']')) {
    isValid = false;
    errorMessage = 'Please remove ]';
  } else if (line.includes('[')) {
    isValid = false;
    errorMessage = 'Please fix this value [';
  }

  return {
    isValid,
    errorMessage,
  };
};

const lineProcessing = (line: string) => {
  return line.replace(/http:\/\//, '');
};

const Demo = (props: BulkTextareaProps<string>) => {
  const [value, setValue] = React.useState('');
  const [errors, setErrors] = React.useState<any[]>([]);

  const validate = React.useCallback(() => {
    const lines = value.split(/\n|,/);
    const newErrors: { lineIndex: number; errorMessage: string }[] = [];

    lines.forEach((line, index) => {
      if (line.includes('a')) {
        newErrors.push({ lineIndex: index, errorMessage: 'Manual validation: found "a"' });
      }
      if (line.includes('!')) {
        newErrors.push({ lineIndex: index, errorMessage: 'Manual validation: found "!"' });
      }
    });

    setErrors(newErrors);
  }, [value, setErrors]);

  return (
    <Box>
      <BulkTextarea
        w={400}
        value={value}
        onChange={setValue}
        lineValidation={validateRow}
        errors={errors}
        onErrorsChange={setErrors}
        showErrors={props.showErrors}
        maxLines={props.maxLines}
        size={props.size}
        linesDelimiters={[',']}
        readonly={props.readonly}
        disabled={props.disabled}
        placeholder='Enter or paste a list using comma or Enter'
        minRows={props.minRows}
        maxRows={props.maxRows}
        validateOn={['blur']}
        pasteProps={{
          delimiter: '\n',
          skipEmptyLines: true,
          lineProcessing,
        }}
        lineProcessing={lineProcessing}
        onImmediatelyChange={(lines) => console.log(lines)}

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
        />
        <Flex alignItems='center' justifyContent='space-between' mt={2}>
          <BulkTextarea.ErrorsNavigation />
          <BulkTextarea.ClearAll />
        </Flex>
      </BulkTextarea>
      <Button mt={2} onClick={validate}>
        Manual validate
      </Button>
    </Box>
  );
};

export const defaultProps: BulkTextareaProps<string> = {
  showErrors: true,
  readonly: false,
  disabled: false,
  size: 'm',
  maxLines: 10,
  minRows: 2,
  maxRows: 10,
};

Demo.defaultProps = defaultProps;

export default Demo;
