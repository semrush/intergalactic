import React from 'react';
import BulkTextarea, { BulkTextareaProps, ErrorItem } from '@semcore/bulk-textarea';
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

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [errors, setErrors] = React.useState<ErrorItem[]>([]);
  const [showErrors, setShowErrors] = React.useState(false);

  return (
    <div>
      <Flex direction='row' gap={4}>
        <Box mb={4}>
          <BulkTextarea
            w={200}
            maxLines={100}
            minRows={1}
            maxRows={1}
            value={value}
            onChange={setValue}
            readonly={true}
            lineValidation={validateRow}
            linesDelimiters={[',']}
            placeholder={'Placeholder'}
            errors={errors}
            showErrors={showErrors}
            onErrorsChange={setErrors}
            onShowErrorsChange={setShowErrors}
          >
            <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
              <Text tag={'label'} size={200} id={'keywords-label'}>
                Readonly state of bulk textarea
              </Text>
              <BulkTextarea.Counter />
            </Flex>
            <BulkTextarea.InputField
              aria-labelledby={'keywords-label'}
              commonErrorMessage={'some global error'}
            />
            <Flex alignItems='center' justifyContent='space-between' mt={2}>
              <BulkTextarea.ErrorsNavigation />
              <BulkTextarea.ClearAll />
            </Flex>
          </BulkTextarea>
        </Box>

        <Box mb={8}>
          <BulkTextarea
            w={300}
            maxLines={10}
            minRows={5}
            maxRows={5}
            value={value}
            onChange={setValue}
            lineValidation={validateRow}
            disabled={true}
            linesDelimiters={[',']}
            placeholder={'Long Long Placeholder'}
            errors={errors}
            showErrors={showErrors}
            onErrorsChange={setErrors}
            onShowErrorsChange={setShowErrors}
          >
            <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
              <Text tag={'label'} size={200} id={'keywords-label'}>
                Disabled state of bulk textarea
              </Text>
              <BulkTextarea.Counter />
            </Flex>
            <BulkTextarea.InputField
              aria-labelledby={'keywords-label'}
              commonErrorMessage={'some global error'}
            />
            <Flex alignItems='center' justifyContent='space-between' mt={2}>
              <BulkTextarea.ErrorsNavigation />
              <BulkTextarea.ClearAll />
            </Flex>
          </BulkTextarea>
        </Box>

        <Box mb={6}>
          <BulkTextarea
            value={value}
            onChange={setValue}
            lineValidation={validateRow}
            placeholder={'Placeholder'}
            errors={errors}
            showErrors={showErrors}
            onErrorsChange={setErrors}
            onShowErrorsChange={setShowErrors}
          >
            <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
              <Text tag={'label'} id={'keywords-label'}>
                Default props
              </Text>
              <BulkTextarea.Counter />
            </Flex>
            <BulkTextarea.InputField
              aria-labelledby={'keywords-label'}
              commonErrorMessage={'some global error'}
            />
            <Flex alignItems='center' justifyContent='space-between' mt={2}>
              <BulkTextarea.ErrorsNavigation />
              <BulkTextarea.ClearAll />
            </Flex>
          </BulkTextarea>
        </Box>
      </Flex>

      <Flex direction='row' gap={4}>
        <Box>
          <BulkTextarea
            w={200}
            maxLines={8}
            minRows={5}
            maxRows={5}
            value={value}
            onChange={setValue}
            lineValidation={validateRow}
            linesDelimiters={[',']}
            placeholder={'Placeholder'}
            errors={errors}
            showErrors={showErrors}
            onErrorsChange={setErrors}
            onShowErrorsChange={setShowErrors}
          >
            <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
              <Text tag={'label'} size={200} id={'keywords-label'}>
                Active state of bulk textarea
              </Text>
              <BulkTextarea.Counter />
            </Flex>
            <BulkTextarea.InputField
              aria-labelledby={'keywords-label'}
              commonErrorMessage={'some global error'}
            />
            <Flex alignItems='center' justifyContent='space-between' mt={2}>
              <BulkTextarea.ErrorsNavigation />
              <BulkTextarea.ClearAll />
            </Flex>
          </BulkTextarea>
        </Box>

        <Box>
          <BulkTextarea
            w={300}
            size='l'
            maxLines={10}
            minRows={5}
            maxRows={10}
            value={value}
            onChange={setValue}
            lineValidation={validateRow}
            linesDelimiters={[',']}
            placeholder={'Long Long Long Placeholder Enter text here'}
            errors={errors}
            showErrors={showErrors}
            onErrorsChange={setErrors}
            onShowErrorsChange={setShowErrors}
          >
            <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
              <Text tag={'label'} size={200} id={'keywords-label'}>
                Active state of bulk textarea
              </Text>
              <BulkTextarea.Counter />
            </Flex>
            <BulkTextarea.InputField
              aria-labelledby={'keywords-label'}
              commonErrorMessage={'some global error'}
            />
            <Flex alignItems='center' justifyContent='space-between' mt={2}>
              <BulkTextarea.ErrorsNavigation />
              <BulkTextarea.ClearAll />
            </Flex>
          </BulkTextarea>
        </Box>

        <Box>
          <BulkTextarea
            w={300}
            maxLines={15}
            minRows={5}
            maxRows={10}
            value={value}
            onChange={setValue}
            lineValidation={validateRow}
            linesDelimiters={[',']}
            errors={errors}
            showErrors={showErrors}
            onErrorsChange={setErrors}
            onShowErrorsChange={setShowErrors}
          >
            <Flex alignItems='center' justifyContent='flex-start' mb={2} gap={1}>
              <Text tag={'label'} size={200} id={'keywords-label'}>
                Active state of bulk textarea without Placeholder
              </Text>
              <BulkTextarea.Counter />
            </Flex>
            <BulkTextarea.InputField
              aria-labelledby={'keywords-label'}
              commonErrorMessage={'some global error'}
            />
            <Flex alignItems='center' justifyContent='space-between' mt={2}>
              <BulkTextarea.ErrorsNavigation />
              <BulkTextarea.ClearAll />
            </Flex>
          </BulkTextarea>
        </Box>
      </Flex>
    </div>
  );
};

export default Demo;
