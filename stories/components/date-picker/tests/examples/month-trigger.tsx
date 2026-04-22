import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { MonthPicker } from '@semcore/ui/date-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = {
  size?: 'm' | 'l';
  disabled?: boolean;
  state?: 'normal' | 'invalid' | 'valid';
  neighborLocation?: 'left' | 'right' | 'both' | false;
};

const Demo = (props: ExampleProps) => {
  return (
    <Flex direction='column' gap={4} mt={4} alignItems='flex-start'>
      <Flex direction='column' gap={1}>
        <Text tag='label' size={200} htmlFor='month-trigger-default'>
          Default
        </Text>
        <MonthPicker size={props.size}>
          <MonthPicker.Trigger disabled={props.disabled}>
            <MonthPicker.Trigger.SingleDateInput state={props.state}>
              <MonthPicker.Trigger.SingleDateInput.Indicator />
              <MonthPicker.Trigger.SingleDateInput.MaskedInput id='month-trigger-default' />
            </MonthPicker.Trigger.SingleDateInput>
          </MonthPicker.Trigger>
          <MonthPicker.Popper />
        </MonthPicker>
      </Flex>

      <Flex direction='column' gap={1}>
        <Text tag='label' size={200} htmlFor='month-trigger-with-value'>
          With selected month
        </Text>
        <MonthPicker size={props.size} value={new Date('2024-06-15')}>
          <MonthPicker.Trigger disabled={props.disabled}>
            <MonthPicker.Trigger.SingleDateInput state={props.state}>
              <MonthPicker.Trigger.SingleDateInput.Indicator />
              <MonthPicker.Trigger.SingleDateInput.MaskedInput id='month-trigger-with-value' />
            </MonthPicker.Trigger.SingleDateInput>
          </MonthPicker.Trigger>
          <MonthPicker.Popper />
        </MonthPicker>
      </Flex>

      <Flex direction='column' gap={1}>
        <Text tag='label' size={200} htmlFor='month-trigger-neighbor'>
          With neighbor location
        </Text>
        <Flex>
          {(props.neighborLocation === 'left' || props.neighborLocation === 'both') && (
            <Button size={props.size} neighborLocation='right'>Left</Button>
          )}
          <MonthPicker size={props.size}>
            <MonthPicker.Trigger
              disabled={props.disabled}
              neighborLocation={props.neighborLocation}
            >
              <MonthPicker.Trigger.SingleDateInput state={props.state}>
                <MonthPicker.Trigger.SingleDateInput.Indicator />
                <MonthPicker.Trigger.SingleDateInput.MaskedInput id='month-trigger-neighbor' />
              </MonthPicker.Trigger.SingleDateInput>
            </MonthPicker.Trigger>
            <MonthPicker.Popper />
          </MonthPicker>
          {(props.neighborLocation === 'right' || props.neighborLocation === 'both') && (
            <Button size={props.size} neighborLocation='left'>Right</Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export const defaultMonthTriggerProps: ExampleProps = {
  size: 'm',
  disabled: false,
  state: 'normal',
  neighborLocation: 'both',
};

Demo.defaultProps = defaultMonthTriggerProps;
export default Demo;
