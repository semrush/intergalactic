import React from 'react';
import { DateRangeComparator, MonthDateRangeComparator } from 'intergalactic/date-picker';
import { Flex } from 'intergalactic/flex-box';
import Notice from 'intergalactic/notice';
import WarningIcon from 'intergalactic/icon/Warning/m';
import { Text } from 'intergalactic/typography';

const Demo = () => {
  return (
    <Flex flexWrap>
      <DateRangeComparator>
        <DateRangeComparator.Trigger />
        <DateRangeComparator.Popper>
          <DateRangeComparator.Header>
            <DateRangeComparator.ValueDateRange />
            <DateRangeComparator.CompareToggle />
            <DateRangeComparator.CompareDateRange />
          </DateRangeComparator.Header>
          <DateRangeComparator.Body>
            <DateRangeComparator.RangeCalendar>
              <Flex direction='column'>
                <DateRangeComparator.CalendarHeader tag={Flex}>
                  <DateRangeComparator.Prev />
                  <DateRangeComparator.Title />
                </DateRangeComparator.CalendarHeader>
                <DateRangeComparator.Calendar />
              </Flex>
              <Flex direction='column'>
                <DateRangeComparator.CalendarHeader tag={Flex}>
                  <DateRangeComparator.Title />
                  <DateRangeComparator.Next />
                </DateRangeComparator.CalendarHeader>
                <DateRangeComparator.Calendar />
              </Flex>
            </DateRangeComparator.RangeCalendar>
            <DateRangeComparator.Periods>
              <DateRangeComparator.Periods.Divider />
              <DateRangeComparator.Periods.Column>
                <DateRangeComparator.Periods.Options />
                <DateRangeComparator.Periods.Controls>
                  <DateRangeComparator.Apply />
                  <DateRangeComparator.Reset />
                </DateRangeComparator.Periods.Controls>
              </DateRangeComparator.Periods.Column>
            </DateRangeComparator.Periods>
          </DateRangeComparator.Body>
          <DateRangeComparator.Footer>
            Place for a hint, useful message or controls.
          </DateRangeComparator.Footer>
          <Notice theme='warning' style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
            <Notice.Content>
              <Flex mb={1}>
                <Notice.Label>
                  <WarningIcon />
                </Notice.Label>
                <Text bold>Notice heading</Text>
              </Flex>
              If you change your location, all previously collected data for this article will be
              lost.
            </Notice.Content>
          </Notice>
        </DateRangeComparator.Popper>
      </DateRangeComparator>
    </Flex>
  );
};

export default Demo;
