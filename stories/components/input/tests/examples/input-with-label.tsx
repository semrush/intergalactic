import { Flex } from '@semcore/ui/base-components';
import type { NSBox } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import Counter from '@semcore/ui/counter';
import Input from '@semcore/ui/input';
import type { InputProps, InputValueProps } from '@semcore/ui/input';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Option ${index}`,
    children: `Option ${index}`,
  }));

type WithLabelExampleProps = InputProps & InputValueProps & NSBox.Props;
const Demo = (props: WithLabelExampleProps) => {
  return (
    <Flex direction='row' gap={2} data-testid='wrap'>
      <Flex direction='column' gap={2} mb={3} data-testid='Default'>

        <Flex direction='column' w={350}>
          <Flex mb={2} justifyContent='space-between'>
            <Flex alignItems='center'>
              <Text size={200} tag='label' htmlFor='limited-text-field'>
                Project description 1
              </Text>
              <Counter ml={1} id='counter-for-textarea'>
                0/150
              </Counter>
            </Flex>
            <Text size={200} color='text-secondary' id='optional-for-textarea'>
              optional
            </Text>
          </Flex>
          <Input
            size={props.size}
            w={props.w}
            state={props.state}
            disabled={props.disabled}
          >
            <Input.Value
              autoFocus={props.autoFocus}
              placeholder={props.placeholder}
              aria-labelledby='base-example'
              readOnly={props.readOnly}
            />
          </Input>
        </Flex>
      </Flex>

      <Flex direction='column' gap={2} mb={3} data-testid='Default'>

        <Flex direction='column' w={350}>
          <Flex mb={2} justifyContent='space-between'>
            <Flex alignItems='center'>
              <Select tag={LinkTrigger} options={options} id='link-trigger-select' />

              <Counter ml={1} id='counter-for-textarea'>
                0/150
              </Counter>
            </Flex>
            <Text size={200} color='text-secondary' id='optional-for-textarea'>
              optional
            </Text>
          </Flex>
          <Input
            size={props.size}
            w={props.w}
            state={props.state}
            disabled={props.disabled}
          >
            <Input.Value
              autoFocus={props.autoFocus}
              placeholder={props.placeholder}
              aria-labelledby='select-example'
              readOnly={props.readOnly}
            />
          </Input>
        </Flex>

      </Flex>
    </Flex>
  );
};

export const withLabelExampleProps: WithLabelExampleProps = {

  size: 'm',
  state: 'normal',
  w: 350,
  autoFocus: false,
  placeholder: 'placeholder',
  readOnly: undefined,
  disabled: undefined,

};

Demo.defaultProps = withLabelExampleProps;
export default Demo;
