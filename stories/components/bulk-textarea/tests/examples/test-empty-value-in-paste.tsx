import React from 'react';
import BulkTextarea from '@semcore/bulk-textarea';
import { Box, Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const validateRow = (line: string, lines: string[]) => {
    let isValid = true;
    let errorMessage = '';

    if (line.includes(']') || line.includes('[')) {
        isValid = false;
        errorMessage = 'Please remove invalid charsets from the movie name.';
    }

    return {
        isValid,
        errorMessage,
    };
};

const lineProcessing = (line: string) => {
    return '';
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
                    lineProcessing,
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
                    commonErrorMessage={''}
                    state={'normal'}
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
                    lineProcessing,
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
                    commonErrorMessage={''}
                    state={'normal'}
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
