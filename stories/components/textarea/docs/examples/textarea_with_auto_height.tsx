import { Box } from '@semcore/ui/flex-box';
import type { TextareaProps } from '@semcore/ui/textarea';
import Textarea from '@semcore/ui/textarea';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleTextareaProps = TextareaProps & { placeholder: string; disabled: boolean; readOnly: boolean; autoFocus: boolean };

const Demo = (props: ExampleTextareaProps) => {
  return (
    <div>
      <Text tag='label' size={200} htmlFor='autoscalable-textarea'>
        Textarea with automatic height
      </Text>
      <Box mt={2}>
        <Textarea
          w={500}
          value={props.value}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          state={props.state}
          size={props.size}
          resize={props.resize}
          disabled={props.disabled}
          readOnly={props.readOnly}
          minRows={props.minRows}
          maxRows={props.maxRows}
          autoFocus={props.autoFocus}
          id='autoscalable-textarea'
          name='autoscalable-textarea'
        />
      </Box>
    </div>
  );
};

export const defaultProps: ExampleTextareaProps = {
  value: undefined,
  defaultValue: undefined,
  placeholder: 'Try entering a lot of lines',
  state: undefined,
  size: undefined,
  resize: undefined,
  disabled: false,
  readOnly: false,
  minRows: 2,
  maxRows: 10,
  autoFocus: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
