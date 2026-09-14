import WarningIcon from '@semcore/icon/Warning/m';
import { Flex } from '@semcore/ui/base-components';
import { DateRangeComparator } from '@semcore/ui/date-picker';
import Dropdown from '@semcore/ui/dropdown';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
            <Text size={200}>
              Place for a hint, useful message or controls.
            </Text>
          </DateRangeComparator.Footer>
          <Dropdown.Notice
            aria-labelledby='comparator-notice-title'
            theme='warning'
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            icon={<WarningIcon />}
          >
            <Dropdown.Notice.Content>
              <Flex mb={1}>
                <Dropdown.Notice.Title>
                  Warning
                </Dropdown.Notice.Title>
              </Flex>
              If you change your location, all previously collected data for this article will be
              lost.
            </Dropdown.Notice.Content>
          </Dropdown.Notice>
        </DateRangeComparator.Popper>
      </DateRangeComparator>
    </Flex>
  );
};

export default Demo;
