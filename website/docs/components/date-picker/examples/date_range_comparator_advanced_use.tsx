import React from 'react';
import { DateRangeComparator, MonthDateRangeComparator } from '@semcore/ui/date-picker';
import { Flex } from '@semcore/ui/flex-box';
import Notice from '@semcore/ui/notice';
import WarningIcon from '@semcore/ui/icon/Warning/m';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  return (
    <Flex gap={4} flexWrap>
      <DateRangeComparator>
        <DateRangeComparator.Trigger />
        <DateRangeComparator.Popper>
          <DateRangeComparator.Header>
            <DateRangeComparator.ValueDateRange />
            <DateRangeComparator.CompareToggle />
            <DateRangeComparator.CompareDateRange />
          </DateRangeComparator.Header>
          <DateRangeComparator.Body>
            <DateRangeComparator.RangeCalendar />
            <DateRangeComparator.Periods />
          </DateRangeComparator.Body>
          <DateRangeComparator.Footer>
            <DateRangeComparator.Apply />
            <DateRangeComparator.Reset />
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
      <MonthDateRangeComparator>
        <MonthDateRangeComparator.Trigger />
        <MonthDateRangeComparator.Popper>
          <MonthDateRangeComparator.Header>
            <MonthDateRangeComparator.ValueDateRange />
            <MonthDateRangeComparator.CompareToggle />
            <MonthDateRangeComparator.CompareDateRange />
          </MonthDateRangeComparator.Header>
          <MonthDateRangeComparator.Body>
            <MonthDateRangeComparator.RangeCalendar />
            <MonthDateRangeComparator.Periods />
          </MonthDateRangeComparator.Body>
          <MonthDateRangeComparator.Footer>
            <MonthDateRangeComparator.Apply />
            <MonthDateRangeComparator.Reset />
          </MonthDateRangeComparator.Footer>
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
        </MonthDateRangeComparator.Popper>
      </MonthDateRangeComparator>
    </Flex>
  );
};
