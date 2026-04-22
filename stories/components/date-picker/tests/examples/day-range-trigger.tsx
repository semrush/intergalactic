import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DateRangePicker } from '@semcore/ui/date-picker';
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
        <Text tag='label' size={200} htmlFor='date-range-trigger-default'>
          Default
        </Text>
        <DateRangePicker>
          <DateRangePicker.Trigger size={props.size} disabled={props.disabled}>
            <DateRangePicker.Trigger.DateRange state={props.state}>
              <DateRangePicker.Trigger.DateRange.Indicator />
              <DateRangePicker.Trigger.DateRange.FromMaskedInput id='date-range-trigger-default' />
              <DateRangePicker.Trigger.DateRange.RangeSep />
              <DateRangePicker.Trigger.DateRange.ToMaskedInput />
            </DateRangePicker.Trigger.DateRange>
          </DateRangePicker.Trigger>
          <DateRangePicker.Popper />
        </DateRangePicker>
      </Flex>

      <Flex direction='column' gap={1}>
        <Text tag='label' size={200} htmlFor='date-range-trigger-with-value'>
          With selected range
        </Text>
        <DateRangePicker value={[new Date('2024-06-15'), new Date('2024-06-25')]}>
          <DateRangePicker.Trigger size={props.size} disabled={props.disabled}>
            <DateRangePicker.Trigger.DateRange state={props.state}>
              <DateRangePicker.Trigger.DateRange.Indicator />
              <DateRangePicker.Trigger.DateRange.FromMaskedInput id='date-range-trigger-with-value' />
              <DateRangePicker.Trigger.DateRange.RangeSep />
              <DateRangePicker.Trigger.DateRange.ToMaskedInput />
            </DateRangePicker.Trigger.DateRange>
          </DateRangePicker.Trigger>
          <DateRangePicker.Popper />
        </DateRangePicker>
      </Flex>

      <Flex direction='column' gap={1}>
        <Text tag='label' size={200} htmlFor='date-range-trigger-neighbor'>
          With neighbor location
        </Text>
        <Flex>
          {(props.neighborLocation === 'left' || props.neighborLocation === 'both') && (
            <Button size={props.size} neighborLocation='right'>Left</Button>
          )}
          <DateRangePicker>
            <DateRangePicker.Trigger
              size={props.size}
              disabled={props.disabled}
              neighborLocation={props.neighborLocation}
            >
              <DateRangePicker.Trigger.DateRange state={props.state}>
                <DateRangePicker.Trigger.DateRange.Indicator />
                <DateRangePicker.Trigger.DateRange.FromMaskedInput id='date-range-trigger-neighbor' />
                <DateRangePicker.Trigger.DateRange.RangeSep />
                <DateRangePicker.Trigger.DateRange.ToMaskedInput />
              </DateRangePicker.Trigger.DateRange>
            </DateRangePicker.Trigger>
            <DateRangePicker.Popper />
          </DateRangePicker>
          {(props.neighborLocation === 'right' || props.neighborLocation === 'both') && (
            <Button size={props.size} neighborLocation='left'>Right</Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export const defaultDateRangeTriggerProps: ExampleProps = {
  size: 'm',
  disabled: false,
  state: 'normal',
  neighborLocation: 'both',
};

Demo.defaultProps = defaultDateRangeTriggerProps;
export default Demo;
