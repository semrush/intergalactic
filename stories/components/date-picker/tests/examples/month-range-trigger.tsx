import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { MonthRangePicker } from '@semcore/ui/date-picker';
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
        <Text tag='label' size={200} htmlFor='month-range-trigger-default'>
          Default
        </Text>
        <MonthRangePicker locale={props.locale}>
          <MonthRangePicker.Trigger size={props.size} disabled={props.disabled}>
            <MonthRangePicker.Trigger.DateRange state={props.state}>
              <MonthRangePicker.Trigger.DateRange.Indicator />
              <MonthRangePicker.Trigger.DateRange.FromMaskedInput id='month-range-trigger-default' />
              <MonthRangePicker.Trigger.DateRange.RangeSep />
              <MonthRangePicker.Trigger.DateRange.ToMaskedInput />
            </MonthRangePicker.Trigger.DateRange>
          </MonthRangePicker.Trigger>
          <MonthRangePicker.Popper />
        </MonthRangePicker>
      </Flex>

      <Flex direction='column' gap={1} alignItems='start'>
        <Text tag='label' size={200} htmlFor='month-range-trigger-with-value'>
          With selected range
        </Text>
        <MonthRangePicker value={[new Date('2024-06-15'), new Date('2024-09-15')]} locale={props.locale}>
          <MonthRangePicker.Trigger size={props.size} disabled={props.disabled}>
            <MonthRangePicker.Trigger.DateRange state={props.state}>
              <MonthRangePicker.Trigger.DateRange.Indicator />
              <MonthRangePicker.Trigger.DateRange.FromMaskedInput id='month-range-trigger-with-value' />
              <MonthRangePicker.Trigger.DateRange.RangeSep />
              <MonthRangePicker.Trigger.DateRange.ToMaskedInput />
            </MonthRangePicker.Trigger.DateRange>
          </MonthRangePicker.Trigger>
          <MonthRangePicker.Popper />
        </MonthRangePicker>
      </Flex>

      <Flex direction='column' gap={1} alignItems='start'>
        <Text tag='label' size={200} htmlFor='month-range-trigger-neighbor'>
          With neighbor location
        </Text>
        <Flex>
          {(props.neighborLocation === 'left' || props.neighborLocation === 'both') && (
            <Button size={props.size} neighborLocation='right'>Left</Button>
          )}
          <MonthRangePicker locale={props.locale}>
            <MonthRangePicker.Trigger
              size={props.size}
              disabled={props.disabled}
              neighborLocation={props.neighborLocation}
            >
              <MonthRangePicker.Trigger.DateRange state={props.state}>
                <MonthRangePicker.Trigger.DateRange.Indicator />
                <MonthRangePicker.Trigger.DateRange.FromMaskedInput id='month-range-trigger-neighbor' />
                <MonthRangePicker.Trigger.DateRange.RangeSep />
                <MonthRangePicker.Trigger.DateRange.ToMaskedInput />
              </MonthRangePicker.Trigger.DateRange>
            </MonthRangePicker.Trigger>
            <MonthRangePicker.Popper />
          </MonthRangePicker>
          {(props.neighborLocation === 'right' || props.neighborLocation === 'both') && (
            <Button size={props.size} neighborLocation='left'>Right</Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export const defaultMonthRangeTriggerProps: ExampleProps = {
  size: 'm',
  disabled: false,
  state: 'normal',
  neighborLocation: 'both',
  locale: 'en',
};

Demo.defaultProps = defaultMonthRangeTriggerProps;
export default Demo;
