import React from 'react';
import BulkTextarea from '@semcore/bulk-textarea';
import { Flex } from '@semcore/flex-box';
import SidePanel from '@semcore/side-panel';
import { Text } from '@semcore/typography';

const validateRow = (line: string, lines: string[]) => {
  let isValid = true;
  let errorMessage = '';

  if (line.includes(']') || line.includes('[')) {
    isValid = false;
    errorMessage = 'Please remove invalid charsets from the movie name.';
  }

  return { isValid, errorMessage };
};

const lineProcessing = (line: string) => {
  return line.replace(/http:\/\//, '');
};

const Demo = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (value: any) => {
    const newValue = value + '\nsome new text with [ error ]';
    setValue(newValue);
  };

  return (
    <SidePanel visible={true} wMax={800} w='100%'>
      <SidePanel.Overlay>
        <SidePanel.Panel wMin={1200} wMax='100%' style={{ backgroundColor: '#f4f5f9' }}>
          <SidePanel.Body pl={20} pr={0}>
            <Flex justifyContent='end' pr={4}>
              <BulkTextarea
                w={400}
                value={value}
                onChange={handleChange}
                lineValidation={validateRow}
                maxLines={10}
                size='l'
                linesDelimiters={[',']}
                readonly={false}
                disabled={false}
                placeholder='Enter or paste a list using comma or Enter'
                minRows={2}
                maxRows={10}
                validateOn={['blurLine']}
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
                  state='normal'
                  aria-labelledby='keywords-label'
                  commonErrorMessage=''
                />
                <Flex alignItems='center' justifyContent='space-between' mt={2}>
                  <BulkTextarea.ErrorsNavigation />
                  <BulkTextarea.ClearAll />
                </Flex>
              </BulkTextarea>
            </Flex>
          </SidePanel.Body>
        </SidePanel.Panel>
      </SidePanel.Overlay>
    </SidePanel>
  );
};

export default Demo;
