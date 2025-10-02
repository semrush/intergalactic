import Checkbox from '@semcore/ui/checkbox';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  return (
    <Flex direction='row' gap={2}>
      <Flex direction='column' gap={2} mb={3} data-testid='default'>
        <Text size={100}>default</Text>
        <Checkbox>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox disabled>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox size='l'>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox>
          <Checkbox.Value />
          <Checkbox.Text color='text-critical'>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox size='l'>
          <Checkbox.Value />
          <Checkbox.Text color='text-critical'>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox size='l' disabled>
          <Checkbox.Value />
          <Checkbox.Text color='text-critical'>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox state='invalid'>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox state='invalid' disabled>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox state='invalid' size='l'>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox theme='pink'>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox size='l' theme='pink'>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox size='l' theme='pink' disabled>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='checked'>
        <Text size={100}>checked</Text>
        <Checkbox checked>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox disabled checked>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox size='l' checked>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox checked>
          <Checkbox.Value />
          <Checkbox.Text color='text-critical'>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox size='l' checked>
          <Checkbox.Value />
          <Checkbox.Text color='text-critical'>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox size='l' disabled checked>
          <Checkbox.Value />
          <Checkbox.Text color='text-critical'>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox state='invalid' checked>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox state='invalid' disabled checked>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox state='invalid' size='l' checked>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox theme='pink' checked>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox size='l' theme='pink' checked>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox size='l' theme='pink' disabled checked>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='indeterminate'>
        <Text size={100}>indeterminate</Text>
        <Checkbox indeterminate>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox disabled indeterminate>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox size='l' indeterminate>
          <Checkbox.Value />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox indeterminate>
          <Checkbox.Value />
          <Checkbox.Text color='text-critical'>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox size='l' indeterminate>
          <Checkbox.Value />
          <Checkbox.Text color='text-critical'>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox size='l' disabled indeterminate>
          <Checkbox.Value />
          <Checkbox.Text color='text-critical'>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox state='invalid' indeterminate>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox state='invalid' disabled indeterminate>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox state='invalid' size='l' indeterminate>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox theme='pink' indeterminate>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox size='l' theme='pink' indeterminate>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>

        <Checkbox size='l' theme='pink' disabled indeterminate>
          <Checkbox.Value id='focused' />
          <Checkbox.Text>Label</Checkbox.Text>
        </Checkbox>
      </Flex>

    </Flex>
  );
};

export default Demo;
