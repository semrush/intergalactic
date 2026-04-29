import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DatePicker } from '@semcore/ui/date-picker';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type ExampleProps = {
  size?: 'm' | 'l';
  disabled?: boolean;
  state?: 'normal' | 'invalid' | 'valid';
  neighborLocation?: 'left' | 'right' | 'both' | false;
  locale?: 'en' | 'pl' | 'pt';
};

const Demo = (props: ExampleProps) => {
  return (
    <Flex direction='column' gap={4} mt={4}>
      <Flex direction='column' gap={1} alignItems='start'>
        <Text tag='label' size={200} htmlFor='trigger-default'>
          Default
        </Text>
        <DatePicker size={props.size} locale={props.locale}>
          <DatePicker.Trigger disabled={props.disabled}>
            <DatePicker.Trigger.SingleDateInput state={props.state}>
              <DatePicker.Trigger.SingleDateInput.Indicator />
              <DatePicker.Trigger.SingleDateInput.MaskedInput id='trigger-default' />
            </DatePicker.Trigger.SingleDateInput>
          </DatePicker.Trigger>
          <DatePicker.Popper />
        </DatePicker>
      </Flex>

      <Flex direction='column' gap={1} alignItems='start'>
        <Text tag='label' size={200} htmlFor='trigger-with-value'>
          With selected date
        </Text>
        <DatePicker size={props.size} value={new Date('2024-06-15')} locale={props.locale}>
          <DatePicker.Trigger disabled={props.disabled}>
            <DatePicker.Trigger.SingleDateInput state={props.state}>
              <DatePicker.Trigger.SingleDateInput.Indicator />
              <DatePicker.Trigger.SingleDateInput.MaskedInput id='trigger-with-value' />
            </DatePicker.Trigger.SingleDateInput>
          </DatePicker.Trigger>
          <DatePicker.Popper />
        </DatePicker>
      </Flex>

      <Flex direction='column' gap={1} alignItems='start'>
        <Text tag='label' size={200} htmlFor='trigger-neighbor'>
          With neighbor location
        </Text>
        <Flex>
          {(props.neighborLocation === 'left' || props.neighborLocation === 'both') && (
            <Button size={props.size} neighborLocation='right'>Left</Button>
          )}
          <DatePicker size={props.size} locale={props.locale}>
            <DatePicker.Trigger
              disabled={props.disabled}
              neighborLocation={props.neighborLocation}
            >
              <DatePicker.Trigger.SingleDateInput state={props.state}>
                <DatePicker.Trigger.SingleDateInput.Indicator />
                <DatePicker.Trigger.SingleDateInput.MaskedInput id='trigger-neighbor' />
              </DatePicker.Trigger.SingleDateInput>
            </DatePicker.Trigger>
            <DatePicker.Popper />
          </DatePicker>
          {(props.neighborLocation === 'right' || props.neighborLocation === 'both') && (
            <Button size={props.size} neighborLocation='left'>Right</Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export const defaultTriggerProps: ExampleProps = {
  size: 'm',
  disabled: false,
  state: 'normal',
  neighborLocation: 'both',
  locale: 'en',
};

Demo.defaultProps = defaultTriggerProps;
export default Demo;
