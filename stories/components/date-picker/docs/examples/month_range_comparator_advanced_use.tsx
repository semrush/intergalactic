import React from 'react';
import { MonthDateRangeComparator } from '@semcore/date-picker';
import { Flex } from '@semcore/flex-box';
import Notice from '@semcore/notice';
import WarningIcon from '@semcore/icon/Warning/m';
import { Text } from '@semcore/typography';

const Demo = () => {
  return (
    <Flex flexWrap>
      <MonthDateRangeComparator>
        <MonthDateRangeComparator.Trigger />
        <MonthDateRangeComparator.Popper>
          <MonthDateRangeComparator.Header>
            <MonthDateRangeComparator.ValueDateRange />
            <MonthDateRangeComparator.CompareToggle />
            <MonthDateRangeComparator.CompareDateRange />
          </MonthDateRangeComparator.Header>
          <MonthDateRangeComparator.Body>
            <MonthDateRangeComparator.RangeCalendar>
              <Flex direction='column'>
                <MonthDateRangeComparator.CalendarHeader tag={Flex}>
                  <MonthDateRangeComparator.Prev />
                  <MonthDateRangeComparator.Title />
                </MonthDateRangeComparator.CalendarHeader>
                <MonthDateRangeComparator.Calendar />
              </Flex>
              <Flex direction='column'>
                <MonthDateRangeComparator.CalendarHeader tag={Flex}>
                  <MonthDateRangeComparator.Title />
                  <MonthDateRangeComparator.Next />
                </MonthDateRangeComparator.CalendarHeader>
                <MonthDateRangeComparator.Calendar />
              </Flex>
            </MonthDateRangeComparator.RangeCalendar>
            <MonthDateRangeComparator.Periods>
              <MonthDateRangeComparator.Periods.Divider />
              <MonthDateRangeComparator.Periods.Column>
                <MonthDateRangeComparator.Periods.Options />
                <MonthDateRangeComparator.Periods.Controls>
                  <MonthDateRangeComparator.Apply />
                  <MonthDateRangeComparator.Reset />
                </MonthDateRangeComparator.Periods.Controls>
              </MonthDateRangeComparator.Periods.Column>
            </MonthDateRangeComparator.Periods>
          </MonthDateRangeComparator.Body>
          <MonthDateRangeComparator.Footer>
            Place for a hint, useful message or controls.
          </MonthDateRangeComparator.Footer>
          <Notice
            aria-labelledby='month-notice-title'
            theme='warning'
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
          >
            <Notice.Content>
              <Flex mb={1}>
                <Notice.Label>
                  <WarningIcon />
                </Notice.Label>
                <Text bold id='month-notice-title'>
                  Warning
                </Text>
              </Flex>
              If you change your location, all previously collected data for this article will be
              lost.
            </Notice.Content>
          </Notice>
        </MonthDateRangeComparator.Popper>
      </MonthDateRangeComparator>
    </Flex>
  );
};

export default Demo;
