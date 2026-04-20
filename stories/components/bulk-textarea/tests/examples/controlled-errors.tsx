import { Box, Flex } from '@semcore/ui/base-components';
import BulkTextarea from '@semcore/ui/bulk-textarea';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [index, setIndex] = React.useState(0);
  const [value, setValue] = React.useState('');
  const [errors, setErrors] = React.useState<any[]>([]);

  const validate = React.useCallback(() => {
    const error = {
      lineIndex: index,
      errorMessage: 'some error in row',
    };
    setIndex((prev) => prev + 1);
    setErrors([error]);
  }, [index, setErrors, setIndex]);

  return (
    <Box>
      <BulkTextarea
        w={400}
        value={value}
        onChange={setValue}
        maxLines={10}
        size='l'
        linesDelimiters={[',']}
        readonly={false}
        disabled={false}
        placeholder='Enter or paste a list using comma or Enter'
        minRows={2}
        maxRows={10}
        errors={errors}
        onErrorsChange={setErrors}
        showErrors={true}
        pasteProps={{
          delimiter: '\n',
          skipEmptyLines: true,
        }}
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
          commonErrorMessage=''
          state='normal'
        />
        <Flex alignItems='center' justifyContent='space-between' mt={2}>
          <BulkTextarea.ErrorsNavigation />
          <BulkTextarea.ClearAll />
        </Flex>
      </BulkTextarea>
      <Button onClick={validate}>Validate</Button>
    </Box>
  );
};

export default Demo;
